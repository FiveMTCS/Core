/**
 * @author Anthony Robert
 * @version 0.1.0
 * @since 0.1.0
 */

import { TcsEvent, TcsEventTarget } from '@mixed/types/events/events.enum';
import TcsEventsList from '@mixed/types/events/eventsList.enum';
import WeaponList from '@mixed/types/game/weaponsList.enum';
import TCS from '@/tcs';

const weaponThreadChecker = () => {
    const pWeapons = Array<string>();

    TCS.threads.createThread(GetCurrentResourceName(), 100, () => {
        const ped = PlayerPedId();
        for (const item in WeaponList) {
            if (Object.prototype.hasOwnProperty.call(WeaponList, item)) {
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
        }
    });
};

export default weaponThreadChecker;
