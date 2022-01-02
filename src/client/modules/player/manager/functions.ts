import * as Config from '@config/index';
import TCS from '@/tcs';
import {
    ANIMATION,
    DICTIONARY,
    getCamera,
    getCurrentPage,
    setCamera,
} from './manager';

export const placeIdle = async () => {
    SetEntityCoords(
        PlayerPedId(),
        -312.0,
        -2395.0,
        75.0,
        true,
        false,
        false,
        false,
    );

    setCamera(createCamera());

    const camera = getCamera();
    SetCamCoord(camera, -312.0, -2395.0, 75.0);
    PointCamAtCoord(camera, -357.0, -2364.0, 40.0);

    FreezeEntityPosition(PlayerPedId(), true);
    while (getCurrentPage() === 2) {
        hideAllPlayers(true);
        SetEntityVisible(PlayerPedId(), false, false);
    }
    hideAllPlayers(false);
};

export const placeCreation = async () => {
    const coords = Config.Player.CharacterCreation.coordinates.creation;
    SetEntityCoords(
        PlayerPedId(),
        coords[0],
        coords[1],
        coords[2],
        true,
        false,
        false,
        false,
    );

    SetEntityHeading(
        PlayerPedId(),
        Config.Player.CharacterCreation.defaultHeading,
    );
    setCameraPosition(
        getCamera(),
        Config.Player.CharacterCreation.creationCamera.body,
    );
    FreezeEntityPosition(PlayerPedId(), true);

    RequestAnimDict(DICTIONARY);
    while (!HasAnimDictLoaded(DICTIONARY)) {
        await TCS.delay(1);
    }

    while (getCurrentPage() === 2) {
        await TCS.delay(0);
        const ped = PlayerPedId();
        NetworkSetEntityInvisibleToNetwork(ped, true);
        SetEntityLocallyVisible(ped);
        TaskPlayAnim(
            ped,
            DICTIONARY,
            ANIMATION,
            9.0,
            -9.0,
            -1,
            50,
            0,
            false,
            false,
            false,
        );
    }
    SetEntityVisible(PlayerPedId(), true, false);
};

export const createCamera = () => {
    const cam = CreateCam('DEFAULT_SCRIPTED_CAMERA', true);

    const [x, y, z] = GetFinalRenderedCamCoord();
    SetCamCoord(cam, x, y, z);
    SetCamActive(cam, true);
    RenderScriptCams(true, false, 0, true, true);

    return cam;
};

export const removeCamera = (cam: number) => {
    RenderScriptCams(false, false, 0, true, false);
    DestroyCam(cam, false);
};

export const setCameraPosition = (
    camera,
    configuration: {
        offset: number[];
        point: number[];
    },
) => {
    const [offsetX, offsetY, offsetZ] = GetOffsetFromEntityInWorldCoords(
        PlayerPedId(),
        configuration.offset[0],
        configuration.offset[1],
        configuration.offset[2],
    );
    SetCamCoord(camera, offsetX, offsetY, offsetZ);

    const [pointOffsetX, pointOffsetY, pointOffsetZ] =
        GetOffsetFromEntityInWorldCoords(
            PlayerPedId(),
            configuration.point[0],
            configuration.point[1],
            configuration.point[2],
        );
    PointCamAtCoord(camera, pointOffsetX, pointOffsetY, pointOffsetZ);
};

export const rotateCharacter = (side: number) => {
    const newHeading =
        GetEntityHeading(PlayerPedId()) - Math.pow(-1, side) * 5.0;
    SetEntityHeading(PlayerPedId(), newHeading);
};

export const hideAllPlayers = (hide: boolean) => {
    const players = GetActivePlayers() as number[];

    players.forEach((player) => {
        SetPlayerInvisibleLocally(player, hide);

        if (hide) SetEntityLocallyInvisible(GetPlayerPed(player));
    });
};
