import { TcsPermissions } from '@config/groups/permissions.enum';
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

/**
 * Creates a FiveM command to set a group to the specified player.
 */
RegisterCommand(
    'setGroup',
    function (source, args, rawCommand) {
        let targetSource = args[0];
        let group = args[1];
        let sender = getPlayer(source);
        if (source > 0) {
            if (!sender || !sender.hasPermission(TcsPermissions.SET_GROUP)) {
                return null;
            }
        }
        return setPlayerGroup(targetSource, group);
    },
    false,
);

/**
 * Creates a FiveM command to teleport a player to another player.
 */
RegisterCommand(
    'teleportToPlayer',
    function (source, args, rawCommand) {
        let fromSource = args[0];
        let toSource = args[1];
        if (source > 0) {
            let sender = getPlayer(source);
            if (
                !sender ||
                !sender.hasPermission(TcsPermissions.TELEPORT_TO_PLAYER)
            ) {
                return null;
            }
        }
        return teleportPlayerToPlayer(fromSource, toSource);
    },
    false,
);

/**
 * Creates a FiveM command to teleport a player to coordinates.
 */
RegisterCommand(
    'teleport',
    function (source, args, rawCommand) {
        let targetSource = args[0];
        let x = args[1];
        let y = args[2];
        let z = args[3];
        if (source > 0) {
            let sender = getPlayer(source);
            if (
                !sender ||
                !sender.hasPermission(TcsPermissions.TELEPORT_TO_COORDS)
            ) {
                return null;
            }
        }
        return teleportPlayerToCoords(targetSource, x, y, z);
    },
    false,
);

/**
 * Creates a FiveM command to kick a player.
 */
RegisterCommand(
    'kick',
    function (source, args, rawCommand) {
        let targetSource = args[0];
        let reason = args.length > 1 ? args.slice(1).join(' ') : null;
        if (source > 0) {
            let sender = getPlayer(source);
            if (!sender || !sender.hasPermission(TcsPermissions.KICK)) {
                return null;
            }
            return kickPlayer(sender.getId(), targetSource, reason);
        }
        return kickPlayer('console', targetSource, reason);
    },
    false,
);

/**
 * Creates a FiveM command to kill a player.
 */
RegisterCommand(
    'kill',
    function (source, args, rawCommand) {
        let targetSource = args[0];

        if (source > 0) {
            let sender = getPlayer(source);
            if (!sender || !sender.hasPermission(TcsPermissions.KILL)) {
                return null;
            }
        }
        return killPlayer(targetSource);
    },
    false,
);

/**
 * Creates a FiveM command to ban a player.
 */
RegisterCommand(
    'tempBan',
    function (source, args, rawCommand) {
        let targetSource = args[0];
        let splitIndex = args.indexOf('/');

        if (splitIndex === -1 || args.length < 3) return;
        const duration = args.slice(1, splitIndex).join(' ');
        const reason = args.slice(splitIndex + 1, args.length).join(' ');

        if (source > 0) {
            let sender = getPlayer(source);
            if (!sender || !sender.hasPermission(TcsPermissions.TEMP_BAN)) {
                return null;
            }
            return banPlayer(sender.getId(), targetSource, reason, duration);
        }
        return banPlayer('console', targetSource, reason, duration);
    },
    false,
);

/**
 * Creates a FiveM command to ban a player.
 */
RegisterCommand(
    'ban',
    function (source, args, rawCommand) {
        let targetSource = args[0];
        const reason = args.slice(1, args.length).join(' ');

        if (source > 0) {
            let sender = getPlayer(source);
            if (!sender || !sender.hasPermission(TcsPermissions.BAN)) {
                return null;
            }
            return banPlayer(sender.getId(), targetSource, reason);
        }

        return banPlayer('console', targetSource, reason);
    },
    false,
);

/**
 * Creates a FiveM command to warn a player.
 */
RegisterCommand(
    'warn',
    function (source, args, rawCommand) {
        let targetSource = args[0];
        let reason = args.length > 1 ? args.slice(1).join(' ') : null;
        if (source > 0) {
            let sender = getPlayer(source);
            if (!sender || !sender.hasPermission(TcsPermissions.WARN)) {
                return null;
            }
            return warnPlayer(sender.getId(), targetSource, reason);
        }
        return warnPlayer('console', targetSource, reason);
    },
    false,
);
