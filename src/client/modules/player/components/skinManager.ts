import TCS from '../../../tcs';
import { TcsCharacterClient } from './classes/character';

let lastHash = 0;

const mugshotWaitList: Record<number, string> = {};
const mugshotCache: Record<number, number> = {};

export const getPedMushot = async (ped: number) => {
    if (!DoesEntityExist(ped)) return;

    const id = +new Date();
    const handle = RegisterPedheadshotTransparent(ped);
    let timer = 2000;
    while (
        (!IsPedheadshotReady(handle) || !IsPedheadshotValid(handle)) &&
        timer > 0
    ) {
        await TCS.delay(100);
        timer--;
    }

    if (!IsPedheadshotReady(handle) || !IsPedheadshotValid(handle)) return;
    mugshotCache[id] = handle;
    const mugshotTxd = GetPedheadshotTxdString(handle);

    SendNuiMessage(
        JSON.stringify({
            action: 'MUGSHOT_B64',
            data: {
                mugshot: mugshotTxd,
                id,
            },
        }),
    );

    while (!mugshotWaitList[id]) {
        await TCS.delay(100);
    }

    if (mugshotCache[id]) {
        UnregisterPedheadshot(mugshotCache[id]);
        delete mugshotCache[id];
    }

    const base64 = mugshotWaitList[id];
    delete mugshotWaitList[id];

    return base64;
};

export const applySkin = async (character: TcsCharacterClient) => {
    const model =
        character.getInformations().sex === 1
            ? 'mp_m_freemode_01'
            : 'mp_f_freemode_01';

    const hash = GetHashKey(model);

    if (hash !== lastHash) {
        RequestModel(hash);
        while (!HasModelLoaded(hash)) {
            await TCS.delay(500);
        }

        SetPlayerModel(PlayerId(), hash);
        lastHash = hash;
    }

    const skin = character.getSkin();
    const ped = PlayerPedId();
    SetPedDefaultComponentVariation(ped);

    SetPedHeadBlendData(
        ped,
        skin.secondaryFace,
        skin.secondaryFace,
        skin.primaryFace,
        skin.skin,
        skin.skin,
        skin.skin,
        1.0,
        1.0,
        1.0,
        true,
    );

    SetPedComponentVariation(ped, 2, skin.hairs, 0, 2);
    SetPedHairColor(ped, skin.hairsPrimaryColor, skin.hairsSecondaryColor);

    SetPedHeadOverlay(ped, 2, skin.eyebrows, skin.eyebrowsOpacity / 100);
    SetPedHeadOverlayColor(ped, 2, 1, skin.eyebrowsColor, 0);

    SetPedHeadOverlay(ped, 1, skin.beard, skin.beardOpacity / 100);
    SetPedHeadOverlayColor(ped, 1, 1, skin.beardColor, skin.beardColor);

    SetPedHeadOverlay(ped, 0, skin.blemishes, 1.0);
    SetPedHeadOverlay(ped, 3, skin.ageing, 1.0);
    SetPedHeadOverlay(ped, 6, skin.complexion, 1.0);
    SetPedHeadOverlay(ped, 7, skin.sunDamage, 1.0);
    SetPedHeadOverlay(ped, 9, skin.freckles, 1.0);

    SetPedFaceFeature(ped, 0, skin.noseWidth / 100);
    SetPedFaceFeature(ped, 1, skin.nosePeakHight / 100);
    SetPedFaceFeature(ped, 2, (skin.nosePeakLength * -1) / 100);
    SetPedFaceFeature(ped, 3, (skin.noseBoneHigh * -1) / 100);
    SetPedFaceFeature(ped, 4, (skin.nosePeakLowering * -1) / 100);
    SetPedFaceFeature(ped, 5, (skin.noseBoneTwist * -1) / 100);

    SetPedFaceFeature(ped, 6, (skin.eyebrowsHigh * -1) / 100);
    SetPedFaceFeature(ped, 7, skin.eyebrowsForward / 100);

    SetPedFaceFeature(ped, 8, (skin.cheeksBoneHigh * -1) / 100);
    SetPedFaceFeature(ped, 9, skin.cheeksBoneTwist / 100);
    SetPedFaceFeature(ped, 10, (skin.cheeksWidth * -1) / 100);

    SetPedFaceFeature(ped, 11, (skin.eyesOpening * -1) / 100);
    SetPedEyeColor(ped, skin.eyesColor);

    SetPedFaceFeature(ped, 12, (skin.lipsWidth * -1) / 100);

    SetPedFaceFeature(ped, 19, skin.neckThikness / 100);
};
RegisterNuiCallbackType('characters:getMugshot');
on(
    '__cfx_nui:characters:getMugshot',
    ({ mugshot, id }: { mugshot: string; id: number }) => {
        mugshotWaitList[id] = mugshot;
    },
);
