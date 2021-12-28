/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

import {
    TcsClientEvent,
    TcsEvent,
    TcsEventTarget,
} from '../../types/events/events.enum';
import TcsEventListener from './eventListenerClass';

class TcsEventManager {
    private waitingEvents: TcsEvent[];
    private listeners: TcsEventListener[];

    /**
     * Creates an event manager. It handles all the incoming events and outcoming events.
     * Should only be used by the core.
     *
     * @param {boolean} isServerSided
     */
    constructor(isServerSided: boolean) {
        this.waitingEvents = [];
        this.listeners = [];

        onNet('tcs:handleEvent', (event: TcsEvent) => {
            if (event.target === TcsEventTarget.SERVER) {
                if (isServerSided) {
                    event.sender = source;
                    event.target = TcsEventTarget.LOCAL;
                } else event.target = TcsEventTarget.CLIENT;
            }
            if (event.target === TcsEventTarget.CLIENT && !isServerSided) {
                event.target = TcsEventTarget.LOCAL;
            }
            this.sendEvent(event);
        });

        setTick(() => {
            this.waitingEvents.forEach((event, index) => {
                if (event.target == TcsEventTarget.LOCAL) {
                    this.listeners
                        .filter(
                            (listener) =>
                                listener.getEventType() == event.eventType,
                        )
                        .forEach((listener) =>
                            listener.applyEventHandler(
                                event.data,
                                event.sender,
                            ),
                        );
                } else {
                    if (!isServerSided) emitNet('tcs:handleEvent', event);
                    else {
                        const clientEvent = event as TcsClientEvent;
                        emitNet('tcs:handleEvent', clientEvent.targetId, event);
                    }
                }
                this.waitingEvents.splice(index, 1);
                return;
            });
        });
    }

    /**
     * Send the specified event and triggers it for the target
     *
     * @param {TcsEvent} event Event to send
     */
    sendEvent = (event: TcsEvent) => {
        this.waitingEvents.push(event);
    };

    /**
     * Add an event handler that will be triggered each time the specified event will be triggered
     *
     * @param {TcsEventListener} handler Handler to add
     */
    addEventHandler = (handler: TcsEventListener) => {
        this.listeners.push(handler);
    };
}

export default TcsEventManager;
