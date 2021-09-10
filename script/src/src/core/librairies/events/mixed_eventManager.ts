/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

class TcsEventManager {
	private waitingEvents: TcsEvent[];
	private listeners: TcsEventListener[];

	/**
	 * Creates an event manager. It handles all the incoming events and outcoming events.
	 * Should only be used by the core.
	 */
	constructor() {
		this.waitingEvents = [];
		this.listeners = [];

		onNet('tcs:handleEvent', (event: TcsEvent) => {
			if (event.target === TcsEventTarget.SERVER) {
				if (TCS.isServerSided) {
					event.sender = source;
					event.target = TcsEventTarget.LOCAL;
				} else event.target = TcsEventTarget.CLIENT;
			}
			if (event.target === TcsEventTarget.CLIENT && !TCS.isServerSided) {
				event.target = TcsEventTarget.LOCAL;
			}
			this.sendEvent(event);
		});

		setTick(() => {
			this.waitingEvents.forEach((event, index) => {
				if (event.target == TcsEventTarget.LOCAL) {
					this.listeners
						.filter((listener) => listener.getEventType() == event.eventType)
						.forEach((listener) =>
							listener.applyEventHandler(event.data, event.sender)
						);
				} else {
					if (!TCS.isServerSided) emitNet('tcs:handleEvent', event);
					else {
						//@ts-ignore
						emitNet('tcs:handleEvent', event.targetId, event);
					}
				}
				this.waitingEvents.splice(index, 1);
				return;
			});
		});
	}

	/**
	 * Send the specified event and triggers it for the target
	 * @param event Event to send
	 */
	sendEvent = (event: TcsEvent) => {
		this.waitingEvents.push(event);
	};

	/**
	 * Add an event handler that will be triggered each time the specified event will be triggered
	 * @param handler Handler to add
	 */
	addEventHandler = (handler: TcsEventListener) => {
		this.listeners.push(handler);
	};
}
