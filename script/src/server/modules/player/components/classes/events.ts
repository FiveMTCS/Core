;(function () {
  const createCharacterListener: TcsEventListener = new TcsEventListener(
    TcsEventsList.CHARACTER_CREATE,
    (
      {
        newCharacter
      }: {
        newCharacter: IExportedCharacter
      },
      source?: number
    ) => {
      if (!source || !newCharacter) {
        return
      }

      createCharacter(source, newCharacter)
    }
  )

  TCS.eventManager.addEventHandler(createCharacterListener)
})
