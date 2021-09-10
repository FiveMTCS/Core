(function () {
	onTcsLoaded(() => {
		const logsModule = new TcsModule(coreLogsModulesInfos, (module: TcsModule) => {
			TCS.database?.onDatabaseReady(async () => {
				await TCS.database?.database().ensureColumns('logs', [
					{
						column: 'timestamp',
						type: sqlTypes.BIGINT,
					},
					{
						column: 'message',
						type: sqlTypes.TEXT,
					},
				]);
			});

			on('playerDropped', (reason: string) => {
				const _source = source;
				TCS.logs.send(
					TCS.lang.getAndReplace('playerDropped', {
						//@ts-ignore
						playerName: GetPlayerName(_source),
						reason: reason,
					})
				);
			});

			on('playerConnecting', (name: string) => {
				TCS.logs.send(
					TCS.lang.getAndReplace('playerConnecting', {
						//@ts-ignore
						playerName: name,
					})
				);
			});
		});
		TCS.modules.addModuleToGame(logsModule);
	});
})();
