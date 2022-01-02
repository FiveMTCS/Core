import { TcsPermissions } from '@config/groups/permissions.enum';
import TCS from '@/tcs';
import { getPlayer } from '../functions';
import TcsPlayer from './player';

export const initCallbacks = () => {
    TCS.callbacks.registerServerCallback(
        'player:getId',
        (source: string, { targetSource = source }) => {
            const player: TcsPlayer = getPlayer(targetSource);
            if (!player) {
                return null;
            }

            return player.getId();
        },
    );

    TCS.callbacks.registerServerCallback(
        'player:getGroup',
        (source: string, { targetSource = source }) => {
            if (targetSource !== source) {
                const sender = getPlayer(source);
                if (!sender || sender.hasPermission(TcsPermissions.GET_GROUP)) {
                    return null;
                }
            }
            const player: TcsPlayer = getPlayer(targetSource);
            if (!player) {
                return null;
            }

            return player.getGroup();
        },
    );

    TCS.callbacks.registerServerCallback(
        'player:getSessionTime',
        (source: string, { targetSource = source }) => {
            if (targetSource !== source) {
                const sender = getPlayer(source);
                if (
                    !sender ||
                    sender.hasPermission(TcsPermissions.GET_SESSION_TIME)
                ) {
                    return null;
                }
            }

            const player: TcsPlayer = getPlayer(targetSource);
            if (!player) {
                return null;
            }

            return player.getSessionTime();
        },
    );

    TCS.callbacks.registerServerCallback(
        'player:getAllSessionTime',
        (source: string, { targetSource = source }) => {
            if (targetSource !== source) {
                const sender = getPlayer(source);
                if (
                    !sender ||
                    sender.hasPermission(TcsPermissions.GET_ALL_SESSION_TIME)
                ) {
                    return null;
                }
            }

            const player: TcsPlayer = getPlayer(targetSource);
            if (!player) {
                return null;
            }

            return player.getAllSessionsTime();
        },
    );
};
