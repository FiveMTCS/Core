/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @author Anthony Robert
 * @version 0.1.0
 * @since 0.1.0
 */

import ConsoleColors from '../../../mixed/types/consoleColors';
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
    private ServerCallBack: any[];
    private eventManager: TcsEventManager;
    private eventListenerServer: TcsEventListener;

    /**
     * Initialize the callbacks manager
     *
     * @param {TcsEventManager} eventManager Current event manager.
     */
    constructor(eventManager: TcsEventManager) {
        this.ServerCallBack = [];
        this.eventManager = eventManager;

        /**
         * Server side event
         */
        this.eventListenerServer = new TcsEventListener(
            TcsEventsList.LISTENER_CALLBACK_SERVER,
            (
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
                if (this.ServerCallBack[eventName] != null) {
                    const result = this.ServerCallBack[eventName](source, args);
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
                } else {
                    console.log(
                        `${ConsoleColors.RED}[ERROR] [CALLBACKS]: ${eventName} DOES NOT EXIST`,
                        ConsoleColors.RESET,
                    );
                    error(
                        LanguageManager.getAndReplace(
                            'callbacks.error.notExist',
                            {
                                name: eventName,
                            },
                        ),
                    );
                }
            },
        );
        this.eventManager.addEventHandler(this.eventListenerServer);
    }

    /**
     * Server side function
     *
     * @param {string} eventName The name of the event to call on the client side
     * @param {any} cb return function
     */
    RegisterServerCallback = (eventName: string, cb: any) => {
        this.ServerCallBack[eventName] = cb;
    };
}

export default TcsCallbackManager;
