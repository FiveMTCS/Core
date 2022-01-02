import TCS from '@/tcs';
import {
    TcsClientEvent,
    TcsEventTarget,
} from '@mixed/types/events/events.enum';
import TcsEventsList from '@mixed/types/events/eventsList.enum';
import { getPlayer } from '../functions';

/**
 * Set a new group for a player.
 *
 * @param target Target player's source
 * @param group New group to set
 * @returns True if the group was set, false otherwise
 */
export function setPlayerGroup(target: string, group: string): boolean {
    const player = getPlayer(target);
    if (!player) {
        return false;
    }

    player.setGroup(group);

    return true;
}

/**
 * Teleport a player to another player.
 *
 * @param from Player to teleport
 * @param to Player to teleport to
 * @returns True if the teleport was successful, false otherwise
 */
export function teleportPlayerToPlayer(from: string, to: string): boolean {
    const playerFrom = getPlayer(from);
    const playerTo = getPlayer(to);
    if (!playerFrom || !playerTo) {
        return false;
    }

    const fromPed = GetPlayerPed(from);
    const toPed = GetPlayerPed(to);

    const [x, y, z] = GetEntityCoords(toPed);
    SetEntityCoords(fromPed, x, y, z, true, false, false, true);

    return true;
}

/**
 * Teleport a player to coordinates.
 *
 * @param source Player to teleport
 * @param x X coordinates
 * @param y Y coordinates
 * @param z Z coordinates
 * @returns True if the teleport was successful, false otherwise
 */
export function teleportPlayerToCoords(
    source: string,
    x: number,
    y: number,
    z: number,
): boolean {
    const player = getPlayer(source);
    if (!player) {
        return false;
    }

    const ped = GetPlayerPed(source);

    SetEntityCoords(ped, x, y, z, true, false, false, true);

    return true;
}

/**
 * Kick a player from the server.
 *
 * @param sender Player who sent the command
 * @param source Player to kick
 * @param reason Reason for the kick
 * @returns True if the kick was successful, false otherwise
 */
export function kickPlayer(
    sender: string,
    source: string,
    reason: string,
): boolean {
    const player = getPlayer(source);
    if (!player) {
        return false;
    }

    player.kick(sender, reason);

    return true;
}

/**
 * Ban a player from the server.
 *
 * @param sender Player who sent the command
 * @param source Player to ban
 * @param reason Reason for the ban
 * @param duration
 * @returns True if the ban was successful, false otherwise
 */
export function banPlayer(
    sender: string,
    source: string,
    reason: string,
    duration?: string,
): boolean {
    const player = getPlayer(source);
    if (!player) {
        return false;
    }

    if (!duration) {
        player.ban(sender, reason);
        return true;
    }

    const regex = /([0-9]{1,2}([ymwdhs]|min){1})+/g;
    const match = regex.exec(duration);
    let time = 0;

    if (!match) return false;

    match.forEach((t) => {
        if (t.includes('min')) {
            time += parseInt(t.split('min')[0]) * TCS.TimeUnits.MINUTES;
            return;
        }

        const lastChar = t.substr(-1);
        const value = parseInt(t.substr(0, t.length - 1));

        if (!value) return;

        switch (lastChar) {
            case 'y':
                time += value * TCS.TimeUnits.YEARS;
                break;

            case 'm':
                time += value * TCS.TimeUnits.MONTHS;
                break;
            case 'w':
                time += value * TCS.TimeUnits.WEEKS;
                break;
            case 'd':
                time += value * TCS.TimeUnits.DAYS;
                break;
            case 'h':
                time += value * TCS.TimeUnits.HOURS;
                break;
            case 's':
                time += value * TCS.TimeUnits.SECONDS;
                break;
            default:
                break;
        }
    });

    player.ban(sender, reason, time);

    return true;
}

/**
 * Warn a player.
 *
 * @param sender Player who sent the command
 * @param source Player to warn
 * @param reason Reason for the warn
 * @returns True if the warn was successful, false otherwise
 */
export function warnPlayer(
    sender: string,
    source: string,
    reason: string,
): boolean {
    const player = getPlayer(source);
    if (!player) {
        return false;
    }

    player.warn(sender, reason);

    return true;
}

export function killPlayer(source: string): boolean {
    const player = getPlayer(source);
    if (!player) {
        return false;
    }

    const killEvent: TcsClientEvent = {
        eventType: TcsEventsList.MODERATION_KILL_PLAYER,
        target: TcsEventTarget.CLIENT,
        targetId: source,
        data: {},
    };

    TCS.eventManager.sendEvent(killEvent);
    return true;
}
