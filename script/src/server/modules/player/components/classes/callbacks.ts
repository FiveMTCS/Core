;(function () {
  TCS.callbacks.RegisterServerCallback('character:get', (source: number, _: any) => {
    const character: TcsCharacter = getCharacter(source)
    if (!character) {
      return null
    }

    return character.export()
  })

  TCS.callbacks.RegisterServerCallback('character:getSkin', (source: number, _: any) => {
    const character: TcsCharacter = getCharacter(source)
    if (!character) {
      return null
    }

    return character.export().skin
  })

  TCS.callbacks.RegisterServerCallback('character:getId', (source: number, _: any) => {
    const character: TcsCharacter = getCharacter(source)
    if (!character) {
      return null
    }

    return character.export().characterId
  })

  TCS.callbacks.RegisterServerCallback('character:getInformations', (source: number, _: any) => {
    const character: TcsCharacter = getCharacter(source)
    if (!character) {
      return null
    }

    return character.export().informations
  })
})()
