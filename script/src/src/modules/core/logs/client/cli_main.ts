/**
 * @author Anthony Robert
 * @version 1.1.0
 * @since 1.1.0
 */

(function () {
	onTcsLoaded(() => {
		const logsModule = new TcsModule(
			coreLogsModulesInfos,
			(module: TcsModule) => {
				onNet('chat:addMessage', (message: string) => {
					TCS.logs.send(
						TCS.lang.getAndReplace('chatMessage', {
							playerName: GetPlayerName(PlayerPedId()),
							message: message,
						})
					);
				});
			}
		);
		TCS.modules.addModuleToGame(logsModule);
	});
})();
