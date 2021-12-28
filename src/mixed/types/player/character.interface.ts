export interface ICharacterInformations {
    lastname: string;
    firstname: string;
    age: number;
    sex: 1 | 0;
}

export interface ICharacterSkin {
    primaryFace: number;
    secondaryFace: number;
    shapeMixFace: number;

    skin: number;

    hairs: number;
    hairsPrimaryColor: number;
    hairsSecondaryColor: number;

    eyebrows: number;
    eyebrowsColor: number;
    eyebrowsOpacity: number;
    eyebrowsForward: number;
    eyebrowsHigh: number;

    eyesColor: number;
    eyesOpening: number;

    beard: number;
    beardColor: number;
    beardOpacity: number;

    cheeksWidth: number;
    cheeksBoneHigh: number;
    cheeksBoneTwist: number;

    lipsWidth: number;
    neckThikness: number;

    noseWidth: number;
    nosePeakHight: number;
    nosePeakLength: number;
    nosePeakLowering: number;
    noseBoneHigh: number;
    noseBoneTwist: number;

    blemishes: number;
    ageing: number;
    complexion: number;
    sunDamage: number;
    freckles: number;
}

export interface IExportedCharacter {
    characterId: string;
    informations: ICharacterInformations;
    skin: ICharacterSkin;
    coords: number[];
    mugshot: string;
}
