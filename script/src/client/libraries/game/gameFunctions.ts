const getPlayerByEntityID = (id: number) => {
  return GetActivePlayers().find(
    (element: number) => NetworkIsPlayerActive(element) && GetPlayerPed(element) == id
  )
}
