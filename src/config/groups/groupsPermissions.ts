import { TcsGroups } from './groups.enum';
import { TcsPermissions } from './permissions.enum';

export const GroupsPermissionsConfig: Record<TcsGroups, TcsPermissions[]> = {
    admin: [TcsPermissions.ALL],
    moderator: [
        TcsPermissions.BAN,
        TcsPermissions.TEMP_BAN,
        TcsPermissions.KICK,
        TcsPermissions.CHANGE_SKIN,
        TcsPermissions.NO_CLIP,
        TcsPermissions.TELEPORT,
        TcsPermissions.WARN,
    ],
    helper: [TcsPermissions.KICK, TcsPermissions.NO_CLIP, TcsPermissions.WARN],
    vip: [],
    player: [],
};
