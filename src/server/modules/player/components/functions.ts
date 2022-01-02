import { IExportedCharacter } from '@mixed/types/player/character.interface';
import TCS from '@/tcs';
import TcsCharacter from './classes/character';
import { PLAYER_MODULE_CHARACTERS_TABLE } from './constants';
import TcsPlayer from './player/player';
import IDeferrals from '@/types/deferrals';

interface IConnectedPlayer {
    player: TcsPlayer;
    character: TcsCharacter | null;
}

const connectedPlayers: Record<number, IConnectedPlayer> = {};
/**
 * Load the player's informations from the current source.
 *
 * @param source Player's source
 */
export const loadPlayer = (source: string, deferrals?: IDeferrals) => {
    if (source) {
        const player = new TcsPlayer(source, deferrals);
        connectedPlayers[source] = {
            player,
            character: null,
        };
    }
};

/**
 * Switch the player's source. Used when a player joins.
 *
 * @param source Current player's source
 * @param oldSource Old player's source
 * @returns
 */
export const switchPlayerSource = (source: string, oldSource: string) => {
    if (!source || !oldSource) return;

    const player = connectedPlayers[oldSource];
    delete connectedPlayers[oldSource];

    connectedPlayers[source] = player;
};

/**
 * Returns the player's informations from the current source.
 *
 * @param source Player's source
 * @returns Player's informations if the player is connected, null otherwise.
 */
export const getPlayer = (source: string): TcsPlayer | null => {
    if (!source) return null;

    const player = connectedPlayers[source];
    if (!player) return null;

    return player.player;
};

/**
 * Returns the player's informations from the current source.
 *
 * @param tcsId Player's TCS id
 * @returns Player's informations if the player is connected, null otherwise.
 */
export const getPlayerFromTcsId = (tcsId: string): TcsPlayer | null => {
    for (const source in connectedPlayers) {
        if (
            connectedPlayers[source] &&
            connectedPlayers[source].player &&
            connectedPlayers[source].player.getId() === tcsId
        ) {
            return connectedPlayers[source].player;
        }
    }
};

/**
 * Delete player's informations in memory.
 *
 * @param source Player's source
 */
export const deletePlayer = (source: string) => {
    if (source && connectedPlayers[source]) {
        delete connectedPlayers[source];
    }
};

/**
 * Create a new character for a connected player.
 *
 * @param source Player's source
 * @param character New character informations
 * @returns The created character if the player is connected. Null otherwise.
 */
export const createCharacter = async (
    source: string,
    character: IExportedCharacter,
): Promise<TcsCharacter | null> => {
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

/**
 * Get the current played character of a player.
 *
 * @param source Player's source
 * @returns The current played character. Null if the player is actually playing no character.
 */
export const getCharacter = (source: string): TcsCharacter | null => {
    if (!source) {
        return null;
    }

    return connectedPlayers[source].character;
};
