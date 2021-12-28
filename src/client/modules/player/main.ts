/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

import TcsEventListener from 'mixed/libraries/events/eventListenerClass';
import { TcsEvent, TcsEventTarget } from 'mixed/types/events/events.enum';
import TcsEventsList from 'mixed/types/events/eventsList.enum';
import {
    ICharacterInformations,
    ICharacterSkin,
} from 'mixed/types/player/character.interface';
import TCS from '../../tcs';
import './manager';

let charactersList: {
    characterId: string;
    informations: ICharacterInformations;
    skin: ICharacterSkin;
}[] = [];

export const getCharacters = () => {
    return charactersList;
};

export const init = async () => {
    console.log('init');
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
            console.log('launch ui');
            charactersList = characters;
            SetNuiFocus(true, true);
            SendNuiMessage(
                JSON.stringify({
                    action: 'SHOW_CHARACTERS_SELECTION',
                }),
            );
        },
    );

    TCS.eventManager.addEventHandler(loadedListener);

    const loadedEvent: TcsEvent = {
        target: TcsEventTarget.SERVER,
        eventType: TcsEventsList.PLAYER_READY,
        data: {},
    };

    await TCS.delay(5 * 1000);
    TCS.eventManager.sendEvent(loadedEvent);
    console.log('sent');
};
