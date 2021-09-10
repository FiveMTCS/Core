/**
 * @author Anthony Robert
 * @version 1.1.0
 * @since 1.1.0
 */

(() => {
	onTcsLoaded(() => {
		const inventoryModule = new TcsModule(
			coreInventoryModulesInfos,
			(module: TcsModule) => {
				TCS.database?.onDatabaseReady(async () => {
					await TCS.database?.database().ensureColumns('inventories', [
						{
							column: 'playerId',
							type: sqlTypes.VARCHAR,
						},
						{
							column: 'itemName',
							type: sqlTypes.VARCHAR,
						},
                        {
							column: 'count',
							type: sqlTypes.INT,
						},
						{
							column: 'args',
							type: sqlTypes.TEXT,
						},
					]);
				});
			}
		);
		TCS.modules.addModuleToGame(inventoryModule);
	});
})();
