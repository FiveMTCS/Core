interface IConnectedPlayer {
  player: TcsPlayer
  character: TcsCharacter | null
}

const connectedPlayers: Record<number, IConnectedPlayer> = {}
const loadPlayer = (source: number) => {
  if (source) {
    const player = new TcsPlayer(source)
    connectedPlayers[source] = {
      player,
      character: null
    }
  }
}

const getPlayer = (source: number) => {
  if (source) {
    return connectedPlayers[source].player
  }
}

const getPlayerFromTcsId = (tcsId: string) => {
  for (const source in connectedPlayers) {
    if (connectedPlayers[source] && connectedPlayers[source].player.getId() === tcsId) {
      return connectedPlayers[source].player.getId()
    }
  }
}

const deletePlayer = (source: number) => {
  if (source && connectedPlayers[source]) {
    delete connectedPlayers[source]
  }
}

const createCharacter = async (source: number, character: IExportedCharacter) => {
  if (source && connectedPlayers[source]) {
    const informations = character.informations
    const skin = character.skin
    const coords = character.coords
    const mugshot = character.mugshot

    const currentConnectedPlayer = connectedPlayers[source]
    const insertedCharacter = await TCS.databaseManager
      .database()
      .insert(PLAYER_MODULE_CHARACTERS_TABLE, {
        playerId: currentConnectedPlayer.player.getId(),
        informations,
        skin,
        coords,
        mugshot
      })

    if (insertedCharacter) {
      connectedPlayers[source].character = new TcsCharacter(
        currentConnectedPlayer.player,
        insertedCharacter.id,
        informations,
        skin,
        character.coords,
        mugshot
      )
    }

    return connectedPlayers[source].character
  }
}

const getCharacter = (source: number) => {
  if (!source) {
    return null
  }

  return connectedPlayers[source].character
}
