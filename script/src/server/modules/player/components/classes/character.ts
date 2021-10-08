/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

class TcsCharacter {
	private owner: TcsPlayer;

	private characterId: string;
	private informations: ICharacterInformations;
	private skin: ICharacterSkin;
	private mugshotImage: string;
	private coords: number[];

	constructor(
		owner: TcsPlayer,
		characterId: string,
		informations: ICharacterInformations,
		skin: ICharacterSkin,
		coords: number[],
		mugshotImage: string
	) {
		this.owner = owner;
		this.characterId = characterId.toString();
		this.informations = informations;
		this.skin = skin;
		this.coords = coords;
		this.mugshotImage = mugshotImage;
	}

	getInformations(): ICharacterInformations {
		return this.informations;
	}

	async setInformations(informations: ICharacterInformations) {
		TCS.debug(`Registering new informations for character ${this.characterId}`);
		await TCS.databaseManager.database().update(
			PLAYER_MODULE_CHARACTERS_TABLE,
			{
				id: this.characterId,
			},
			{ informations }
		);
		this.informations = informations;
	}

	getSkin(): ICharacterSkin {
		return this.skin;
	}

	async setSkin(skin: ICharacterSkin) {
		TCS.debug(`Registering new skin for character ${this.characterId}`);
		await TCS.databaseManager.database().update(
			PLAYER_MODULE_CHARACTERS_TABLE,
			{
				id: this.characterId,
			},
			{ skin }
		);
		this.skin = skin;
	}

	getOwner(): TcsPlayer {
		return this.owner;
	}

	export(): IExportedCharacter {
		return {
			characterId: this.characterId,
			informations: this.informations,
			mugshot: this.mugshotImage,
			coords: this.coords,
			skin: this.skin,
		};
	}
}
