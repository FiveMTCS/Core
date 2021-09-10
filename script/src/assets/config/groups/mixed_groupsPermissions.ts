enum TcsPermissions {
	ALL,

	BAN,
	TEMP_BAN,
	KICK,
	NO_CLIP,
	CHANGE_SKIN,
	GO_TO,
	TELEPORT,
	WARN,

	SET_GROUP,

	START_MODULE,
	STOP_MODULE,
	RESTART_MODULE,
}

var GroupsPermissionsConfig: Record<TcsGroups, TcsPermissions[]>;

(function () {
	GroupsPermissionsConfig = {
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
})();
