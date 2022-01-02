import { TcsPermissions } from '@config/groups/permissions.enum';
import TCS from '@/tcs';
import { getPlayer } from '../functions';
import {
    banPlayer,
    kickPlayer,
    killPlayer,
    setPlayerGroup,
    teleportPlayerToCoords,
    teleportPlayerToPlayer,
    warnPlayer,
} from './functions';

export function initCallbacks() {
    TCS.callbacks.registerServerCallback(
        'moderation:setGroup',
        (
            source: string,
            {
                targetSource = source,
                group,
            }: { targetSource: string; group: string },
        ) => {
            const sender = getPlayer(source);
            if (!sender || !sender.hasPermission(TcsPermissions.SET_GROUP)) {
                return null;
            }

            return setPlayerGroup(targetSource, group);
        },
    );

    TCS.callbacks.registerServerCallback(
        'moderation:teleportToPlayer',
        (
            source: string,
            {
                fromSource = source,
                toSource,
            }: { fromSource: string; toSource: string },
        ) => {
            const sender = getPlayer(source);
            if (
                !sender ||
                !sender.hasPermission(TcsPermissions.TELEPORT_TO_PLAYER)
            ) {
                return null;
            }

            return teleportPlayerToPlayer(fromSource, toSource);
        },
    );

    TCS.callbacks.registerServerCallback(
        'moderation:teleport',
        (
            source: string,
            {
                targetSource = source,
                x,
                y,
                z,
            }: { targetSource: string; x: number; y: number; z: number },
        ) => {
            const sender = getPlayer(source);
            if (
                !sender ||
                !sender.hasPermission(TcsPermissions.TELEPORT_TO_COORDS)
            ) {
                return null;
            }

            return teleportPlayerToCoords(targetSource, x, y, z);
        },
    );

    TCS.callbacks.registerServerCallback(
        'moderation:kill',
        (
            source: string,
            { targetSource = source }: { targetSource: string },
        ) => {
            const sender = getPlayer(source);
            if (!sender || !sender.hasPermission(TcsPermissions.KILL)) {
                return null;
            }

            return killPlayer(targetSource);
        },
    );

    TCS.callbacks.registerServerCallback(
        'moderation:warn',
        (
            source: string,
            {
                targetSource = source,
                reason,
            }: { targetSource: string; reason: string },
        ) => {
            const sender = getPlayer(source);
            if (!sender || !sender.hasPermission(TcsPermissions.WARN)) {
                return null;
            }

            return warnPlayer(source, targetSource, reason);
        },
    );

    TCS.callbacks.registerServerCallback(
        'moderation:kick',
        (
            source: string,
            {
                targetSource = source,
                reason,
            }: { targetSource: string; reason: string },
        ) => {
            const sender = getPlayer(source);
            if (!sender || !sender.hasPermission(TcsPermissions.KICK)) {
                return null;
            }

            return kickPlayer(source, targetSource, reason);
        },
    );

    TCS.callbacks.registerServerCallback(
        'moderation:ban',
        (
            source: string,
            {
                targetSource = source,
                reason,
                duration,
            }: { targetSource: string; reason: string; duration?: string },
        ) => {
            const sender = getPlayer(source);
            if (!sender || !sender.hasPermission(TcsPermissions.BAN)) {
                return null;
            }

            return banPlayer(source, targetSource, reason, duration);
        },
    );
}
