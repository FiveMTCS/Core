import TcsEventListener from '@mixed/libraries/events/eventListenerClass';
import TcsEventsList from '@mixed/types/events/eventsList.enum';
import TCS from '@/tcs';

export function initEvents() {
    const killListener: TcsEventListener = new TcsEventListener(
        TcsEventsList.MODERATION_KILL_PLAYER,
        () => {
            SetEntityHealth(GetPlayerPed(-1), 0);
        },
    );

    TCS.eventManager.addEventHandler(killListener);
}
