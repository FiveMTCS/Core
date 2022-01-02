/**
 * @author Anthony Robert
 * @version 0.1.0
 * @since 0.1.0
 */

import { getPlayerByEntityID } from '@libraries/game/functions';
import { TcsEvent, TcsEventTarget } from '@mixed/types/events/events.enum';
import TcsEventsList from '@mixed/types/events/eventsList.enum';
import TCS from '@/tcs';

const deathThreadChecker = () => {
    let wasDead = false;
    TCS.threads.createThread(GetCurrentResourceName(), 50, () => {
        const player = PlayerId();

        if (NetworkIsPlayerActive(player)) {
            const ped = PlayerPedId();
            const isDead = IsPedFatallyInjured(ped);

            if (isDead) {
                if (!wasDead) {
                    wasDead = true;
                    const [killer, killerWeapon]: [number | undefined, number] =
                        NetworkGetEntityKillerOfPlayer(player);
                    let killerId: number | null = getPlayerByEntityID(killer);

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
};

export default deathThreadChecker;
