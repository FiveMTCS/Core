/**
 * @author Anthony Robert
 * @version 1.1.0
 * @since 1.1.0
 */

(function () {
	onLoadModule('core/events', (module: TcsModule) => {
		module.createFunction('weaponThreadChecker', () => {
			let pWeapons = Array<string>();

			TCS.threads.createThread(module, 100, () => {
				const ped = PlayerPedId();
				for (const item in WeaponList) {
					const weapon = WeaponList[item];

					const hasWeapon = HasPedGotWeapon(ped, weapon, false);
					const weaponIndex = pWeapons.indexOf(weapon);

					if (hasWeapon) {
						if (weaponIndex == -1) {
							pWeapons.push(weapon);
							const getWeaponEvent: TcsEvent = {
								eventType: TcsEventsList.PLAYER_GET_WEAPON,
								target: TcsEventTarget.LOCAL,
								data: {
									name: item,
									hash: weapon,
								},
							};
							TCS.eventManager.sendEvent(getWeaponEvent);
						}
					} else {
						if (weaponIndex > -1) {
							pWeapons.splice(weaponIndex);
							const looseWeaponEvent: TcsEvent = {
								eventType: TcsEventsList.PLAYER_LOOSE_WEAPON,
								target: TcsEventTarget.LOCAL,
								data: {
									name: item,
									hash: weapon,
								},
							};
							TCS.eventManager.sendEvent(looseWeaponEvent);
						}
					}
				}
			});
		});
	});
})();
