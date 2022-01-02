import TcsEventListener from '@mixed/libraries/events/eventListenerClass';
import TcsEventsList from '@mixed/types/events/eventsList.enum';
import { IExportedCharacter } from '@mixed/types/player/character.interface';
import TCS from '@/tcs';
import { createCharacter } from '../functions';

(function () {
    const createCharacterListener: TcsEventListener = new TcsEventListener(
        TcsEventsList.CHARACTER_CREATE,
        (
            {
                newCharacter,
            }: {
                newCharacter: IExportedCharacter;
            },
            source?: string,
        ) => {
            if (!source || !newCharacter) {
                return;
            }

            createCharacter(source, newCharacter);
        },
    );

    TCS.eventManager.addEventHandler(createCharacterListener);
});
