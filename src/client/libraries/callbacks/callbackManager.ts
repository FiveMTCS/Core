/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @author Anthony Robert
 * @version 0.1.0
 * @since 0.1.0
 */

import {
    TcsEvent,
    TcsEventTarget,
} from '../../../mixed/types/events/events.enum';
import TcsEventsList from '../../../mixed/types/events/eventsList.enum';
import TcsEventListener from '../../../mixed/libraries/events/eventListenerClass';
import TcsEventManager from '../../../mixed/libraries/events/eventManager';

class TcsCallbackManager {
    private ClientCallBack: any[];
    private requestId = 0;
    private eventManager: TcsEventManager;
    private eventListenerClient: TcsEventListener;

    /**
     * Initialize the callbacks manager
     *
     * @param {TcsEventManager} eventManager Current event manager.
     */
    constructor(eventManager: TcsEventManager) {
        this.ClientCallBack = [];
        this.eventManager = eventManager;

        /**
         * Client side event
         */
        this.eventListenerClient = new TcsEventListener(
            TcsEventsList.LISTENER_CALLBACK_CLIENT,
            ({ requestId, args }: { requestId: number; args: unknown }) => {
                this.ClientCallBack[requestId](args);
                this.ClientCallBack[requestId] = null;
            },
        );
        this.eventManager.addEventHandler(this.eventListenerClient);
    }

    /**
     * Client side function
     *
     * @param {string} eventName The name of the event to call on the server side
     * @param {any} cb return function
     * @param {unknown} args arguments to be transmitted on the server side
     */
    TriggerServerCallback = (eventName: string, cb: any, args: unknown) => {
        this.ClientCallBack[this.requestId] = cb;

        const triggerEvent: TcsEvent = {
            eventType: TcsEventsList.LISTENER_CALLBACK_SERVER,
            target: TcsEventTarget.SERVER,
            data: {
                eventName: eventName,
                requestId: this.requestId,
                args: args,
            },
        };
        this.eventManager.sendEvent(triggerEvent);
        this.requestId++;
    };
}

export default TcsCallbackManager;
