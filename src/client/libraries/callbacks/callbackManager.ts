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
import TCS from '@/tcs';

class TcsCallbackManager {
    private callbacksResult: any[];
    private requestId = 0;
    private eventManager: TcsEventManager;
    private eventListenerClient: TcsEventListener;

    /**
     * Initialize the callbacks manager
     *
     * @param {TcsEventManager} eventManager Current event manager.
     */
    constructor(eventManager: TcsEventManager) {
        this.callbacksResult = [];
        this.eventManager = eventManager;

        /**
         * Client side event
         */
        this.eventListenerClient = new TcsEventListener(
            TcsEventsList.LISTENER_CALLBACK_CLIENT,
            ({ requestId, args }: { requestId: number; args: any }) => {
                this.callbacksResult[requestId] = args;
            },
        );
        this.eventManager.addEventHandler(this.eventListenerClient);
    }

    /**
     * Calls a server callback and returns the result of this callback.
     *
     * @param {string} eventName The name of the event to call on the server side
     * @param {unknown} args arguments to be transmitted on the server side
     * @returns {Promise<unknown>} The result of the callback
     */
    triggerServerCallback = async (eventName: string, args: unknown) => {
        const currentRequestId = this.requestId;
        this.callbacksResult[currentRequestId] = null;

        const triggerEvent: TcsEvent = {
            eventType: TcsEventsList.LISTENER_CALLBACK_SERVER,
            target: TcsEventTarget.SERVER,
            data: {
                eventName: eventName,
                requestId: currentRequestId,
                args: args,
            },
        };
        this.eventManager.sendEvent(triggerEvent);
        this.requestId++;

        while (this.callbacksResult[currentRequestId] === null) {
            await TCS.delay(50);
        }

        const result = this.callbacksResult[currentRequestId];
        delete this.callbacksResult[currentRequestId];

        if (result.callbackError) {
            TCS.error(
                TCS.lang.getAndReplace('callbacks.error.notExist', {
                    name: eventName,
                }),
            );

            return null;
        }

        return result;
    };
}

export default TcsCallbackManager;
