/* eslint-disable indent */
/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

import { TcsGroups } from '@config/groups';
import { GroupsPermissionsConfig } from '@config/groups/groupsPermissions';
import { TcsPermissions } from '@config/groups/permissions.enum';
import {
    TcsClientEvent,
    TcsEventTarget,
} from '@mixed/types/events/events.enum';
import TcsEventsList from '@mixed/types/events/eventsList.enum';
import Licenses from '@mixed/types/game/licenses.interface';
import IPunishmentsList from '@mixed/types/player/punishementsList.interface';
import IPunishment from '@mixed/types/player/punishment.interace';
import ISessionTime from '@mixed/types/player/sessionTime.interface';
import TCS from '@/tcs';
import TcsCharacter from '../classes/character';
import {
    PLAYER_MODULE_CHARACTERS_TABLE,
    PLAYER_MODULE_PLAYERS_TABLE,
} from '../constants';
import IDeferrals from '@/types/deferrals';

export default class TcsPlayer {
    private source: string;
    private playerId: string;
    private licenses: Licenses;
    private punishments: IPunishmentsList;
    private wholeSession: number;
    private sessionStart: number;

    private characters: TcsCharacter[];

    private group: string;

    private ready: boolean;

    constructor(source: string, deferrals?: IDeferrals) {
        this.updateDeferrals(
            deferrals,
            TCS.lang.get('player.connecting.loading'),
        );
        this.source = source;

        this.playerId = '-1';
        this.punishments = {
            warns: [],
            kicks: [],
            bans: [],
        };
        this.wholeSession = 0;
        this.sessionStart = +new Date();
        this.group = TcsGroups.PLAYER;

        this.characters = [];

        this.ready = false;

        const playerLicenses = getPlayerIdentifiers(source);

        this.licenses = {
            steam: playerLicenses.find((l) => l.indexOf('steam:') > -1),
            discord: playerLicenses.find((l) => l.indexOf('discord:') > -1),
            license: playerLicenses.find((l) => l.indexOf('license:') > -1),
            xbl: playerLicenses.find((l) => l.indexOf('xbl:') > -1),
        };

        TCS.debug(
            TCS.lang.getAndReplace('player.debug.fetchingPlayer', {
                playerName: GetPlayerName(this.source),
            }),
        );
        this.retrievingInformations(deferrals);
    }

    private updateDeferrals(deferrals: IDeferrals, message: string) {
        if (deferrals) {
            deferrals.update(message);
        }
    }

    private async fetchPunishments() {
        TCS.debug(
            TCS.lang.getAndReplace('player.debug.fetchingPlayerPunishments', {
                id: this.playerId,
            }),
        );
        const punishments = await TCS.databaseManager
            .database()
            .get(['punishments'], {
                playerId: this.playerId,
            })
            .execute();

        if (punishments) {
            this.punishments = {
                bans: punishments
                    .filter((pn) => pn.data?.type === 'ban')
                    .map((pn) => pn.data as IPunishment),
                kicks: punishments
                    .filter((pn) => pn.data?.type === 'kick')
                    .map((pn) => pn.data as IPunishment),
                warns: punishments
                    .filter((pn) => pn.data?.type === 'warn')
                    .map((pn) => pn.data as IPunishment),
            };
        }
    }

    private async fetchCharacters() {
        const characters = await TCS.databaseManager
            .database()
            .get([PLAYER_MODULE_CHARACTERS_TABLE], {
                playerId: this.playerId,
            })
            .execute();

        if (!characters) {
            this.characters = [];
            return;
        }

        this.characters = characters.map(
            (character) =>
                new TcsCharacter(
                    this,
                    character.id,
                    character.data?.informations,
                    character.data?.skin,
                    character.data?.coords,
                    character.data?.mugshot,
                ),
        );
    }

    /**
     * Retrieve player informations or create a new document if the player's informations don't exist
     */
    async retrievingInformations(deferrals?: IDeferrals) {
        const player = await TCS.databaseManager
            .database()
            .get([PLAYER_MODULE_PLAYERS_TABLE], {
                discord: this.licenses.discord,
            })
            .executeOne();

        if (!player) {
            const newPlayer = await TCS.databaseManager
                .database()
                .insert(PLAYER_MODULE_PLAYERS_TABLE, {
                    ...this.licenses,
                    group: this.group,
                    sessionTime: 0,
                });

            if (newPlayer) {
                this.playerId = newPlayer.id;
            }

            this.ready = true;
            deferrals?.done();
            return;
        }

        this.playerId = player.id;
        this.group = player.data?.group;
        this.wholeSession = player.data?.sessionTime;

        await this.fetchCharacters();

        this.updateDeferrals(
            deferrals,
            TCS.lang.get('player.connecting.punishments'),
        );
        await this.fetchPunishments();

        const isBanned = this.checkBan(deferrals);

        if (isBanned) {
            return;
        }

        TCS.debug(
            TCS.lang.getAndReplace('player.debug.playerReady', {
                id: this.playerId,
            }),
        );

        this.ready = true;
        deferrals?.done();
    }

    /**
     * Get the FiveM player's source
     *
     * @returns {string} FiveM player's source
     */
    getSource() {
        return this.source;
    }

    /**
     * Get the TCS player's ID
     *
     * @returns {string} TCS player's ID
     */
    getId() {
        return this.playerId;
    }

    /**
     * Check if the player has loaded and retrieved his informations
     *
     * @returns {boolean} True if the player has loaded
     */
    isReady() {
        return this.ready;
    }

    /**
     * Get the player's punishments history
     *
     * @returns {IPunishmentsList} Player's punishments
     */
    getPunishments() {
        return this.punishments;
    }

    /**
     * Add the specified punishment to the player's history
     *
     * @param {IPunishment} punishment New punishment to add to the player's history
     */
    async addPunishment(punishment: IPunishment) {
        switch (punishment.type) {
            case 'ban':
                this.punishments.bans.push(punishment);
                // Sort by timestamp older to most recent
                this.punishments.bans.sort((a, b) => a.timestamp - b.timestamp);
                break;
            case 'kick':
                this.punishments.kicks.push(punishment);
                this.punishments.kicks.sort(
                    (a, b) => a.timestamp - b.timestamp,
                );
                break;

            case 'warn':
                this.punishments.warns.push(punishment);
                this.punishments.warns.sort(
                    (a, b) => a.timestamp - b.timestamp,
                );
                break;

            default:
                TCS.error(`Invalid punishment type "${punishment.type}"`);
                return;
        }

        await TCS.databaseManager.database().insert('punishments', punishment);
    }

    /**
     * Get the current player's group
     *
     * @returns {string} Player's group
     */
    getGroup(): string {
        return this.group;
    }

    /**
     * Set the new player's group
     *
     * @param {string} newGroup New group of the player
     */
    setGroup(newGroup: string) {
        this.group = newGroup;

        TCS.databaseManager.database().update(
            PLAYER_MODULE_PLAYERS_TABLE,
            {
                id: this.playerId,
            },
            {
                group: this.group,
            },
        );
    }

    /**
     * Check if the player has the specified permission
     *
     * @param {string} permission Permission to check
     * @returns {boolean} True if the current player has the specified permission
     */
    hasPermission(permission: string) {
        return (
            GroupsPermissionsConfig[this.group].includes(TcsPermissions.ALL) ||
            GroupsPermissionsConfig[this.group].includes(permission)
        );
    }

    /**
     * Get the current player's characters
     *
     * @returns {TcsCharacter[]} List of the player's characters
     */
    getCharacters(): TcsCharacter[] {
        return this.characters;
    }

    /**
     * Get the current session time
     *
     * @returns {ISessionTime} Session time
     */
    getSessionTime(): ISessionTime {
        const currentTime = +new Date();
        const diff = Math.abs(currentTime - this.sessionStart);

        return this.msToTime(diff);
    }

    /**
     * Get the all sessions time
     *
     * @returns {ISessionTime} Session time
     */
    getAllSessionsTime(): ISessionTime {
        const currentTime = +new Date();
        const diff = Math.abs(currentTime - this.sessionStart);

        const allSessions = this.wholeSession + diff;

        return this.msToTime(allSessions);
    }

    /**
     * Convert ms to session time
     *
     * @param {number} diff ms to convert
     * @returns {ISessionTime} Converted ms to session time
     */
    msToTime(diff: number): ISessionTime {
        const weeks = Math.floor(diff / (7 * 24 * 60 * 60 * 1000));
        const weeksms = diff % (7 * 24 * 60 * 60 * 1000);
        const days = Math.floor(weeksms / (24 * 60 * 60 * 1000));
        const daysms = diff % (24 * 60 * 60 * 1000);
        const hours = Math.floor(daysms / (60 * 60 * 1000));
        const hoursms = diff % (60 * 60 * 1000);
        const minutes = Math.floor(hoursms / (60 * 1000));
        const minutesms = diff % (60 * 1000);
        const sec = Math.floor(minutesms / 1000);

        return {
            weeks: weeks,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: sec,
        };
    }

    /**
     * Save current player session
     */
    disconnect() {
        const currentTime = +new Date();
        const diff = Math.abs(currentTime - this.sessionStart);

        this.wholeSession += diff;
        TCS.databaseManager.database().update(
            PLAYER_MODULE_PLAYERS_TABLE,
            {
                id: this.playerId,
            },
            {
                sessionTime: this.wholeSession,
            },
        );
    }

    /**
     * Kick the player from the server
     *
     * @param sender
     * @param reason Reason of the kick
     */
    kick(sender: string, reason: string) {
        DropPlayer(
            this.source,
            TCS.lang.getAndReplace('moderation.kick.gotKicked', {
                reason,
            }),
        );

        const data: IPunishment = {
            sender: sender,
            playerId: this.playerId,
            type: 'kick',
            reason: reason,
            timestamp: +new Date(),
        };

        this.addPunishment(data);
    }

    /**
     * Convert a time into a readable string
     *
     * @param time Time to convert
     * @returns Time converted into a readable string
     */
    private timeToDurations(time: ISessionTime): string {
        return TCS.lang.getAndReplace('core.duration', {
            weeks: time.weeks,
            days: time.days,
            hours: time.hours,
            minutes: time.minutes,
            seconds: time.seconds,
        });
    }

    /**
     * Ban the player from the server
     *
     * @param sender
     * @param reason
     * @param duration
     */
    ban(sender: string, reason: string, duration?: number) {
        DropPlayer(
            this.source,
            TCS.lang.getAndReplace('moderation.ban.gotBanned', {
                reason,
                duration: duration
                    ? this.timeToDurations(this.msToTime(duration))
                    : TCS.lang.get('moderation.ban.permanent'),
            }),
        );

        const data: IPunishment = {
            sender: sender,
            playerId: this.playerId,
            type: 'ban',
            reason: reason,
            timestamp: +new Date(),
            duration: duration,
        };

        this.addPunishment(data);
    }

    /**
     * Warn the player
     *
     * @param sender
     * @param reason
     */
    warn(sender: string, reason: string) {
        const data: IPunishment = {
            sender: sender,
            playerId: this.playerId,
            type: 'warn',
            reason: reason,
            timestamp: +new Date(),
        };

        this.addPunishment(data);
    }

    /**
     * Check if the player is banned and kick him if he is
     *
     * @returns {boolean} Return true if the player is banned
     */
    checkBan(deferrals?: IDeferrals): boolean {
        const ban = this.punishments.bans.find(
            (ban) =>
                this.playerId.toString() === ban.playerId.toString() &&
                (ban.duration === null ||
                    +new Date() <= ban.timestamp + ban.duration),
        );

        if (ban) {
            if (deferrals)
                deferrals.done(
                    TCS.lang.getAndReplace('moderation.ban.gotBanned', {
                        reason: ban.reason,
                        duration: ban.duration
                            ? this.timeToDurations(
                                  this.msToTime(
                                      ban.timestamp +
                                          ban.duration -
                                          +new Date(),
                                  ),
                              )
                            : TCS.lang.get('moderation.ban.permanent'),
                    }),
                );
            else this.kick(ban.sender, ban.reason);
            return true;
        }

        return false;
    }
}
