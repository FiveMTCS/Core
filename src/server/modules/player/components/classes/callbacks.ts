import TCS from '../../../../tcs';
import { getCharacter } from '../functions';
import TcsCharacter from './character';

export const initCallbacks = () => {
    TCS.callbacks.RegisterServerCallback('character:get', (source: string) => {
        const character: TcsCharacter = getCharacter(source);
        if (!character) {
            return null;
        }

        return character.export();
    });

    TCS.callbacks.RegisterServerCallback(
        'character:getSkin',
        (source: string) => {
            const character: TcsCharacter = getCharacter(source);
            if (!character) {
                return null;
            }

            return character.export().skin;
        },
    );

    TCS.callbacks.RegisterServerCallback(
        'character:getId',
        (source: string) => {
            const character: TcsCharacter = getCharacter(source);
            if (!character) {
                return null;
            }

            return character.export().characterId;
        },
    );

    TCS.callbacks.RegisterServerCallback(
        'character:getInformations',
        (source: string) => {
            const character: TcsCharacter = getCharacter(source);
            if (!character) {
                return null;
            }

            return character.export().informations;
        },
    );
};
