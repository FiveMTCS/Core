/**
 * @author Anthony Robert
 * @version 0.1.0
 * @since 0.1.0
 */

class TcsLogsManager {
	private logsToSend: Array<TcsLogs>;
	private eventManager: TcsEventManager;
	private eventListener: TcsEventListener | null;
	private isServerSide: boolean;

	/**
	 * Initialize the logs manager
	 */
	constructor(eventManager: TcsEventManager, isServerSide: boolean) {
		this.logsToSend = [];
		this.eventManager = eventManager;
		//this.currentDb = db?.database();
		this.eventListener = null;
		this.isServerSide = isServerSide;

		if (this.isServerSide) {
			this.eventListener = new TcsEventListener(
				TcsEventsList.LOGS_SEND,
				({ message }: { message: string }) => {
					this.send(message);
				}
			);
			this.eventManager.addEventHandler(this.eventListener);
		}
	}

	/**
	 * Main function to save a log
	 * @param message string to save
	 */
	send = (message: any) => {
		if (this.isServerSide) {
			this.logsToSend.push({
				message: message.toString(),
				timestamp: new Date().getTime(),
			});
		} else {
			const logsEvent: TcsEvent = {
				eventType: TcsEventsList.LOGS_SEND,
				target: TcsEventTarget.SERVER,
				data: {
					message: message,
				},
			};
			this.eventManager.sendEvent(logsEvent);
		}
	};
}
