/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

class TcsCharacterClient {
	private characterId: string;
	private informations: ICharacterInformations;
	private skin: ICharacterSkin;
	private mugshotImage: string;

	constructor(characterInfos: IExportedCharacter) {
		this.characterId = characterInfos.characterId;
		this.informations = characterInfos.informations;
		this.skin = characterInfos.skin;
		this.mugshotImage = characterInfos.mugshot;
	}

	getId = (): string => {
		return this.characterId;
	};

	getInformations = (): ICharacterInformations => {
		return this.informations;
	};

	setInformations = async (informations: ICharacterInformations) => {
		this.informations = informations;
	};

	getSkin = (): ICharacterSkin => {
		return this.skin;
	};

	setSkin = (skin: ICharacterSkin) => {
		this.skin = skin;
	};

	setMugshot = (mugshot: string) => {
		this.mugshotImage = mugshot;
	};

	getMugshot = () => {
		return this.mugshotImage;
	};
}
