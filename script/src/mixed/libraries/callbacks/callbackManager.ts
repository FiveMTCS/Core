/**
 * @author Anthony Robert
 * @version 0.1.0
 * @since 0.1.0
 */

class TcsCallbackManager {
	private ClientCallBack: any[];
	private ServerCallBack: any[];
	private requestId = 0;
	private eventManager: TcsEventManager;
	private eventListenerClient: TcsEventListener;
	private eventListenerServer: TcsEventListener;

	/**
	 * Initialize the callbacks manager
	 */
	constructor(eventManager: TcsEventManager) {
		this.ClientCallBack = [];
		this.ServerCallBack = [];
		this.eventManager = eventManager;

		/**
		 * Client side event
		 */
		this.eventListenerClient = new TcsEventListener(
			TcsEventsList.LISTENER_CALLBACK_CLIENT,
			({ requestId, args }: { requestId: number; args: any }) => {
				this.ClientCallBack[requestId](args);
				this.ClientCallBack[requestId] = null;
			}
		);
		this.eventManager.addEventHandler(this.eventListenerClient);
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
				source?: string
			) => {
				//@ts-ignore
				if (this.ServerCallBack[eventName] != null) {
					//@ts-ignore
					const result = this.ServerCallBack[eventName](source, args);
					const triggerEvent: TcsClientEvent = {
						eventType: TcsEventsList.LISTENER_CALLBACK_CLIENT,
						target: TcsEventTarget.CLIENT,
						//@ts-ignore
						targetId: source,
						data: {
							requestId: requestId,
							args: result,
						},
					};
					this.eventManager.sendEvent(triggerEvent);
				} else {
					TCS.error(`[CALLBACKS]: ${eventName} DO NOT EXIST`);
				}
			}
		);
		this.eventManager.addEventHandler(this.eventListenerServer);
	}

	/**
	 * Client side function
	 * @param eventName The name of the event to call on the server side
	 * @param cb return function
	 * @param args arguments to be transmitted on the server side
	 */
	TriggerServerCallback = (eventName: string, cb: Function, args: any) => {
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

	/**
	 * Server side function
	 * @param eventName The name of the event to call on the client side
	 * @param cb return function
	 */
	RegisterServerCallback = (eventName: string, cb: Function) => {
		//@ts-ignore
		this.ServerCallBack[eventName] = cb;
	};
}
