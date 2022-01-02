/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @author Anthony Robert
 * @version 0.1.0
 * @since 0.1.0
 */

import {
    TcsClientEvent,
    TcsEventTarget,
} from '../../../mixed/types/events/events.enum';
import TcsEventsList from '../../../mixed/types/events/eventsList.enum';
import TcsEventListener from '../../../mixed/libraries/events/eventListenerClass';
import TcsEventManager from '../../../mixed/libraries/events/eventManager';
import { error } from '../../../mixed/libraries/logs/fivemConsole';
import LanguageManager from '../../../mixed/libraries/language/languageManager';

class TcsCallbackManager {
    private callbacks: any[];
    private eventManager: TcsEventManager;
    private eventListenerServer: TcsEventListener;

    /**
     * Initialize the callbacks manager
     *
     * @param {TcsEventManager} eventManager Current event manager.
     */
    constructor(eventManager: TcsEventManager) {
        this.callbacks = [];
        this.eventManager = eventManager;

        this.eventListenerServer = new TcsEventListener(
            TcsEventsList.LISTENER_CALLBACK_SERVER,
            async (
                {
                    eventName,
                    requestId,
                    args,
                }: {
                    eventName: string;
                    requestId: number;
                    args: any;
                },
                source?: string,
            ) => {
                let result = {};
                if (this.callbacks[eventName] != null) {
                    result = await this.callbacks[eventName](source, args);
                } else {
                    error(
                        LanguageManager.getAndReplace(
                            'callbacks.error.notExist',
                            {
                                name: eventName,
                            },
                        ),
                    );

                    result = { callbackError: true };
                }

                const triggerEvent: TcsClientEvent = {
                    eventType: TcsEventsList.LISTENER_CALLBACK_CLIENT,
                    target: TcsEventTarget.CLIENT,
                    targetId: source,
                    data: {
                        requestId: requestId,
                        args: result,
                    },
                };
                this.eventManager.sendEvent(triggerEvent);
            },
        );
        this.eventManager.addEventHandler(this.eventListenerServer);
    }

    /**
     * Create a server callback
     *
     * @param {string} eventName The name of the event to call on the client side
     * @param {any} cb return function
     */
    registerServerCallback = (eventName: string, cb: any) => {
        this.callbacks[eventName] = cb;
    };
}

export default TcsCallbackManager;
