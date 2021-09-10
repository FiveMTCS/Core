onLoadModule('core/player', (module: TcsModule) => {
	const createCharacterListener: TcsEventListener = new TcsEventListener(
		TcsEventsList.CHARACTER_CREATE,
		(
			{
				newCharacter,
			}: {
				newCharacter: IExportedCharacter;
			},
			source?: number
		) => {
			if (!source || !newCharacter) {
				return;
			}

			module.fnc('createCharacter')(source, newCharacter);
		}
	);

	TCS.eventManager.addEventHandler(createCharacterListener);
});
