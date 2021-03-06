/**
 * @author Maxence Leguede
 * @version 1.1.0
 * @since 1.1.0
 */

(() => {
	onTcsLoaded(() => {
		const playerModule = new TcsModule(
			corePlayerModulesInfos,
			(module: TcsModule) => {
				TCS.database?.onDatabaseReady(async () => {
					await TCS.database
						?.database()
						.ensureColumns(PLAYER_MODULE_PLAYERS_TABLE, [
							{
								column: 'group',
								type: sqlTypes.VARCHAR,
							},
							{
								column: 'steam',
								type: sqlTypes.VARCHAR,
							},
							{
								column: 'discord',
								type: sqlTypes.VARCHAR,
							},
							{
								column: 'license',
								type: sqlTypes.VARCHAR,
							},
							{
								column: 'xbl',
								type: sqlTypes.VARCHAR,
							},
							{
								column: 'sessionTime',
								type: sqlTypes.BIGINT,
							},
						]);

					await TCS.database?.database().ensureColumns('punishments', [
						{
							column: 'type',
							type: sqlTypes.VARCHAR,
						},
						{
							column: 'playerId',
							type: sqlTypes.VARCHAR,
						},
						{
							column: 'timestamp',
							type: sqlTypes.BIGINT,
						},
						{
							column: 'sender',
							type: sqlTypes.VARCHAR,
						},
						{
							column: 'reason',
							type: sqlTypes.VARCHAR,
						},
						{
							column: 'note',
							type: sqlTypes.VARCHAR,
						},
					]);

					const eventHandler = new TcsEventListener(
						TcsEventsList.PLAYER_READY,
						(data: Object, source?: number) => {
							if (source) module.fnc('loadPlayer')(source);
						}
					);

					TCS.eventManager.addEventHandler(eventHandler);
				});
			}
		);
		TCS.modules.addModuleToGame(playerModule);
	});
})();
