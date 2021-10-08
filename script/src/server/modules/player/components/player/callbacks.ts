;(function () {
  TCS.callbacks.RegisterServerCallback('player:getId', (source: number, _: any) => {
    const player: TcsPlayer = getPlayer(source)
    if (!player) {
      return null
    }

    return player.getId()
  })

  TCS.callbacks.RegisterServerCallback('player:getGroup', (source: number, _: any) => {
    const player: TcsPlayer = getPlayer(source)
    if (!player) {
      return null
    }

    return player.getGroup()
  })

  TCS.callbacks.RegisterServerCallback('player:getSessionTime', (source: number, _: any) => {
    const player: TcsPlayer = getPlayer(source)
    if (!player) {
      return null
    }

    return player.getSessionTime()
  })

  TCS.callbacks.RegisterServerCallback('player:getAllSessionTime', (source: number, _: any) => {
    const player: TcsPlayer = getPlayer(source)
    if (!player) {
      return null
    }

    return player.getAllSessionsTime()
  })

  TCS.callbacks.RegisterServerCallback('player:setGroup', (source: number, args: any) => {
    const player: TcsPlayer = getPlayer(source)

    if (!player || !player.hasPermission(TcsPermissions.SET_GROUP)) {
      return false
    }

    const group: TcsGroups = args.group
    if (!group) {
      return false
    }

    const otherPlayerSource = args.target
    if (!otherPlayerSource) {
      return false
    }

    const otherPlayer = getPlayer(otherPlayerSource)
    if (!otherPlayer) {
      return false
    }

    player.setGroup(group)

    return true
  })
})()
