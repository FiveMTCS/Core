/**
 * @author Anthony Robert
 * @version 1.1.0
 * @since 1.1.0
 */

(function () {
	onLoadModule('core/events', (module: TcsModule) => {
		module.createFunction('deathThreadChecker', () => {
			let wasDead = false;
			TCS.threads.createThread(module, 50, () => {
				const player = PlayerId();

				if (NetworkIsPlayerActive(player)) {
					const ped = PlayerPedId();
					const isDead = IsPedFatallyInjured(ped);

					if (isDead) {
						if (!wasDead) {
							wasDead = true;
							const [killer, killerWeapon]: [
								number | undefined,
								number
							] = NetworkGetEntityKillerOfPlayer(player);
							let killerId: number | null = module.fnc('GetPlayerByEntityID')(
								killer
							);

							if (
								killer != ped &&
								killerId != null &&
								NetworkIsPlayerActive(killerId)
							) {
								killerId = GetPlayerServerId(killerId);
							} else {
								killerId = -1;
							}

							const deathEvent: TcsEvent = {
								eventType: TcsEventsList.PLAYER_DEAD,
								target: TcsEventTarget.LOCAL,
								data: {
									killer: killer,
									killerWeapon: killerWeapon,
									killerId: killerId,
								},
							};
							TCS.eventManager.sendEvent(deathEvent);
						}
					} else {
						if (wasDead) {
							const resurrectedEvent: TcsEvent = {
								eventType: TcsEventsList.PLAYER_RESURRECTED,
								target: TcsEventTarget.LOCAL,
								data: {},
							};
							TCS.eventManager.sendEvent(resurrectedEvent);
							wasDead = false;
						}
					}
				}
			});
		});

		module.createFunction('GetPlayerByEntityID', (id: number) => {
			return GetActivePlayers().find(
				(element: number) =>
					NetworkIsPlayerActive(element) && GetPlayerPed(element) == id
			);
		});
	});
})();
