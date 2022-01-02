import { TcsGroups } from './groups.enum';
import { TcsPermissions } from './permissions.enum';

export const GroupsPermissionsConfig: Record<TcsGroups, string[]> = {
    admin: [TcsPermissions.ALL],
    moderator: [
        TcsPermissions.TEMP_BAN,
        TcsPermissions.BAN,
        TcsPermissions.KICK,
        TcsPermissions.CHANGE_SKIN,
        TcsPermissions.NO_CLIP,
        TcsPermissions.TELEPORT_TO_PLAYER,
        TcsPermissions.TELEPORT_TO_COORDS,
        TcsPermissions.WARN,
        TcsPermissions.GET_GROUP,
        TcsPermissions.GET_SESSION_TIME,
        TcsPermissions.GET_ALL_SESSION_TIME,
    ],
    helper: [
        TcsPermissions.KICK,
        TcsPermissions.WARN,
        TcsPermissions.GET_GROUP,
        TcsPermissions.GET_SESSION_TIME,
    ],
    vip: [],
    player: [],
};
