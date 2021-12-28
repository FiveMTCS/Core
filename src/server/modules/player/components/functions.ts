import { IExportedCharacter } from 'mixed/types/player/character.interface';
import TCS from '../../../tcs';
import TcsCharacter from './classes/character';
import { PLAYER_MODULE_CHARACTERS_TABLE } from './constants';
import TcsPlayer from './player/player';

interface IConnectedPlayer {
    player: TcsPlayer;
    character: TcsCharacter | null;
}

const connectedPlayers: Record<number, IConnectedPlayer> = {};
export const loadPlayer = (source: string) => {
    if (source) {
        const player = new TcsPlayer(source);
        connectedPlayers[source] = {
            player,
            character: null,
        };
    }
};

export const getPlayer = (source: string) => {
    if (source) {
        return connectedPlayers[source].player;
    }
};

export const getPlayerFromTcsId = (tcsId: string) => {
    for (const source in connectedPlayers) {
        if (
            connectedPlayers[source] &&
            connectedPlayers[source].player.getId() === tcsId
        ) {
            return connectedPlayers[source].player.getId();
        }
    }
};

export const deletePlayer = (source: string) => {
    if (source && connectedPlayers[source]) {
        delete connectedPlayers[source];
    }
};

export const createCharacter = async (
    source: string,
    character: IExportedCharacter,
) => {
    if (source && connectedPlayers[source]) {
        const informations = character.informations;
        const skin = character.skin;
        const coords = character.coords;
        const mugshot = character.mugshot;

        const currentConnectedPlayer = connectedPlayers[source];
        const insertedCharacter = await TCS.databaseManager
            .database()
            .insert(PLAYER_MODULE_CHARACTERS_TABLE, {
                playerId: currentConnectedPlayer.player.getId(),
                informations,
                skin,
                coords,
                mugshot,
            });

        if (insertedCharacter) {
            connectedPlayers[source].character = new TcsCharacter(
                currentConnectedPlayer.player,
                insertedCharacter.id,
                informations,
                skin,
                character.coords,
                mugshot,
            );
        }

        return connectedPlayers[source].character;
    }
};

export const getCharacter = (source: string) => {
    if (!source) {
        return null;
    }

    return connectedPlayers[source].character;
};
