import TCS from '@/tcs';
import { getCharacter } from '../functions';
import TcsCharacter from './character';

export const initCallbacks = () => {
    TCS.callbacks.registerServerCallback('character:get', (source: string) => {
        const character: TcsCharacter = getCharacter(source);
        if (!character) {
            return null;
        }

        return character.export();
    });

    TCS.callbacks.registerServerCallback(
        'character:getSkin',
        (source: string) => {
            const character: TcsCharacter = getCharacter(source);
            if (!character) {
                return null;
            }

            return character.export().skin;
        },
    );

    TCS.callbacks.registerServerCallback(
        'character:getId',
        (source: string) => {
            const character: TcsCharacter = getCharacter(source);
            if (!character) {
                return null;
            }

            return character.export().characterId;
        },
    );

    TCS.callbacks.registerServerCallback(
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
