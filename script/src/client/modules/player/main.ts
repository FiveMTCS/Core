/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

let charactersList: {
	characterId: string;
	informations: ICharacterInformations;
	skin: ICharacterSkin;
}[] = [];

const getCharacters = () => {
	return charactersList;
};

(function () {
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

	const loadedEvent: TcsEvent = {
		target: TcsEventTarget.SERVER,
		eventType: TcsEventsList.PLAYER_READY,
		data: {},
	};

	TCS.eventManager.sendEvent(loadedEvent);
})();
