/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

class TcsEventListener {
	private eventType: TcsEventsList;
	private handler: Function;

	/**
	 * Create a listener that will be called each time the specified event is triggered
	 * @param eventType Type of events to listen to
	 * @param handler Current event handler, that will be executed each times the event is triggered
	 */
	constructor(eventType: TcsEventsList, handler: Function) {
		this.eventType = eventType;
		this.handler = handler;
	}

	/**
	 *	Get the current listener event it is waiting for
	 * @returns Current event type name
	 */
	getEventType() {
		return this.eventType;
	}

	/**
	 * Triggers the event listener function with the specified data
	 * @param data Data to send to the event listener function
	 */
	applyEventHandler(data: Object = {}, sender?: string) {
		this.handler(data, sender);
	}
}
