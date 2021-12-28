/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

import TcsEventsList from '../../types/events/eventsList.enum';

class TcsEventListener {
    private eventType: TcsEventsList;
    private handler: (data: unknown, sender?: string) => void;

    /**
     * Create a listener that will be called each time the specified event is triggered
     *
     * @param {TcsEventsList} eventType Type of events to listen to
     * @param {(data: unknown, sender?: string) => void} handler Current event handler, that will be executed each times the event is triggered
     */
    constructor(
        eventType: TcsEventsList,
        handler: (data: unknown, sender?: string) => void,
    ) {
        this.eventType = eventType;
        this.handler = handler;
    }

    /**
     * Get the current listener event it is waiting for
     *
     * @returns {TcsEventsList} Current event type name
     */
    getEventType = (): TcsEventsList => {
        return this.eventType;
    };

    /**
     * Triggers the event listener function with the specified data
     *
     * @param {unknown} data Data to send to the event listener function
     * @param {string} sender Data to send to the event listener function
     */
    applyEventHandler = (data: unknown = {}, sender?: string) => {
        this.handler(data, sender);
    };
}

export default TcsEventListener;
