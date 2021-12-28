import * as Config from 'config/index';
import { IExportedCharacter } from 'mixed/types/player/character.interface';
import { getCharacters } from '../main';
import { TcsCharacterClient } from '../components/classes/character';
import {
    placeCreation,
    placeIdle,
    removeCamera,
    rotateCharacter,
    setCameraPosition,
} from './functions';
import { applySkin, getPedMushot } from '../components/skinManager';
import { getCamera, setCurrentPage } from './manager';
import { TcsEvent, TcsEventTarget } from 'mixed/types/events/events.enum';
import TcsEventsList from 'mixed/types/events/eventsList.enum';
import TCS from '../../../tcs';

RegisterNuiCallbackType('characters:getList');
RegisterNuiCallbackType('characters:set');
RegisterNuiCallbackType('characters:changeCamera');
RegisterNuiCallbackType('characters:rotateCamera');
RegisterNuiCallbackType('characters:finishCreation');
RegisterNuiCallbackType('characters:selectedCharacter');
RegisterNuiCallbackType('core:onPageChange');
on(
    '__cfx_nui:characters:getList',
    (data: object, cb: (json: string) => void) => {
        cb(JSON.stringify(getCharacters()));
    },
);
on(
    '__cfx_nui:characters:selectedCharacter',
    (character: IExportedCharacter) => {
        const newCharacter = new TcsCharacterClient(character);
        applySkin(newCharacter);
        setCurrentPage(0);
        removeCamera(getCamera());
        FreezeEntityPosition(PlayerPedId(), false);
        NetworkSetEntityInvisibleToNetwork(PlayerPedId(), false);

        SetNuiFocus(false, false);
        SendNuiMessage(
            JSON.stringify({
                action: 'HIDE_INTERFACE',
            }),
        );
        SetEntityCoords(
            PlayerPedId(),
            character.coords[0],
            character.coords[1],
            character.coords[2],
            true,
            false,
            false,
            false,
        );
    },
);

on('__cfx_nui:core:onPageChange', ({ page }: { page: number }) => {
    setCurrentPage(page);
    if (page === 1) {
        // CHARACTERS_SELECTION
        placeIdle();
    }

    if (page === 2) {
        // CHARACTERS_CREATION
        placeCreation();
    }
});

on('__cfx_nui:characters:set', (character: IExportedCharacter) => {
    const newCharacter = new TcsCharacterClient(character);
    applySkin(newCharacter);
});

on('__cfx_nui:characters:changeCamera', (cameraId: string) => {
    setCameraPosition(
        getCamera(),
        Config.Player.CharacterCreation.creationCamera[
            cameraId as keyof typeof Config.Player.CharacterCreation.creationCamera
        ],
    );
});

on('__cfx_nui:characters:rotateCamera', (multiplier: number) => {
    rotateCharacter(multiplier);
});

on(
    '__cfx_nui:characters:finishCreation',
    async (character: IExportedCharacter) => {
        character.mugshot = await getPedMushot(PlayerPedId());
        character.coords = Config.Player.CharacterCreation.shouldTeleport
            ? Config.Player.CharacterCreation.teleportCoords
            : GetEntityCoords(PlayerPedId(), true);

        const event: TcsEvent = {
            target: TcsEventTarget.SERVER,
            eventType: TcsEventsList.CHARACTER_CREATE,
            data: {
                newCharacter: character,
            },
        };

        TCS.eventManager.sendEvent(event);

        setCurrentPage(0);
        removeCamera(getCamera());
        FreezeEntityPosition(PlayerPedId(), false);
        NetworkSetEntityInvisibleToNetwork(PlayerPedId(), false);

        SetNuiFocus(false, false);
        SendNuiMessage(
            JSON.stringify({
                action: 'HIDE_INTERFACE',
            }),
        );

        if (Config.Player.CharacterCreation.shouldTeleport) {
            SetEntityCoords(
                PlayerPedId(),
                Config.Player.CharacterCreation.teleportCoords[0],
                Config.Player.CharacterCreation.teleportCoords[1],
                Config.Player.CharacterCreation.teleportCoords[2],
                true,
                false,
                false,
                false,
            );
        }
    },
);
