/**
 * @author Maxence Leguede
 * @version 1.1.0
 * @since 1.1.0
 */

(function () {
	let charactersList: {
		characterId: string;
		informations: ICharacterInformations;
		skin: ICharacterSkin;
	}[] = [];

	onTcsLoaded(() => {
		const loadedListener: TcsEventListener = new TcsEventListener(
			TcsEventsList.PLAYER_LOADED,
			({
				characters,
			}: {
				characters: {
					characterId: string;
					informations: ICharacterInformations;
					skin: ICharacterSkin;
				}[];
			}) => {
				TCS.debug('Showing character selection...');
				charactersList = characters;
				SetNuiFocus(true, true);
				SendNuiMessage(
					JSON.stringify({
						action: 'SHOW_CHARACTERS_SELECTION',
					})
				);
			}
		);

		TCS.eventManager.addEventHandler(loadedListener);

		const playerModule = new TcsModule(
			corePlayerModulesInfos,
			(module: TcsModule) => {
				module.createFunction('getCharacters', () => {
					return charactersList;
				});

				const loadedEvent: TcsEvent = {
					target: TcsEventTarget.SERVER,
					eventType: TcsEventsList.PLAYER_READY,
					data: {},
				};

				TCS.eventManager.sendEvent(loadedEvent);
			}
		);

		TCS.modules.addModuleToGame(playerModule);
	});
})();
