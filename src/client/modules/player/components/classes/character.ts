/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

import {
    ICharacterInformations,
    ICharacterSkin,
    IExportedCharacter,
} from 'mixed/types/player/character.interface';

export class TcsCharacterClient {
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

    /**
     * Get the id of the current character.
     *
     * @returns {string} Returns the id of the character.
     */
    getId = (): string => {
        return this.characterId;
    };

    /**
     * Get the informations of the character.
     *
     * @returns {ICharacterInformations} Returns the informations of the character.
     */
    getInformations = (): ICharacterInformations => {
        return this.informations;
    };

    /**
     * Set the new informations of the character. It does not save in the database.
     *
     * @param {ICharacterInformations} informations New informations to apply to the current character.
     */
    setInformations = async (informations: ICharacterInformations) => {
        this.informations = informations;
    };

    /**
     * Get the skin of the character.
     *
     * @returns {ICharacterSkin} Returns the skin of the character.
     */
    getSkin = (): ICharacterSkin => {
        return this.skin;
    };

    /**
     * Set the new skin of the character. It does not save in the database.
     *
     * @param {ICharacterSkin} skin New skin to apply to the current character.
     */
    setSkin = (skin: ICharacterSkin) => {
        this.skin = skin;
    };

    /**
     * Set the mugshot of the current character. It does not save in the database.
     *
     * @param {string} mugshot Mugshot of the character in base64.
     */
    setMugshot = (mugshot: string) => {
        this.mugshotImage = mugshot;
    };

    /**
     * Get the mugshot of the current character.
     *
     * @returns {string} Returns the mugshot of the character in base64.
     */
    getMugshot = (): string => {
        return this.mugshotImage;
    };
}
