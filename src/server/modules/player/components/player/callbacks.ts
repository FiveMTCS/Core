import { TcsGroups } from 'config/groups';
import { TcsPermissions } from 'config/groups/permissions.enum';
import TCS from '../../../../tcs';
import { getPlayer } from '../functions';
import TcsPlayer from './player';

export const initCallbacks = () => {
    TCS.callbacks.RegisterServerCallback('player:getId', (source: string) => {
        const player: TcsPlayer = getPlayer(source);
        if (!player) {
            return null;
        }

        return player.getId();
    });

    TCS.callbacks.RegisterServerCallback(
        'player:getGroup',
        (source: string) => {
            const player: TcsPlayer = getPlayer(source);
            if (!player) {
                return null;
            }

            return player.getGroup();
        },
    );

    TCS.callbacks.RegisterServerCallback(
        'player:getSessionTime',
        (source: string) => {
            const player: TcsPlayer = getPlayer(source);
            if (!player) {
                return null;
            }

            return player.getSessionTime();
        },
    );

    TCS.callbacks.RegisterServerCallback(
        'player:getAllSessionTime',
        (source: string) => {
            const player: TcsPlayer = getPlayer(source);
            if (!player) {
                return null;
            }

            return player.getAllSessionsTime();
        },
    );

    TCS.callbacks.RegisterServerCallback(
        'player:setGroup',
        (source: string, args: any) => {
            const player: TcsPlayer = getPlayer(source);

            if (!player || !player.hasPermission(TcsPermissions.SET_GROUP)) {
                return false;
            }

            const group: TcsGroups = args.group;
            if (!group) {
                return false;
            }

            const otherPlayerSource = args.target;
            if (!otherPlayerSource) {
                return false;
            }

            const otherPlayer = getPlayer(otherPlayerSource);
            if (!otherPlayer) {
                return false;
            }

            player.setGroup(group);

            return true;
        },
    );
};
