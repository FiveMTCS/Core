/**
 * @author Anthony Robert
 * @version 0.1.0
 * @since 0.1.0
 */

import { TcsEvent, TcsEventTarget } from '../../types/events/events.enum';
import TcsEventsList from '../../types/events/eventsList.enum';
import TcsEventListener from '../events/eventListenerClass';
import TcsEventManager from '../events/eventManager';
import { TcsLogs } from './logs';

class TcsLogsManager {
    private logsToSend: Array<TcsLogs>;
    private eventManager: TcsEventManager;
    private eventListener: TcsEventListener | null;
    private isServerSide: boolean;

    /**
     * Initialize the logs manager.
     *
     * @param {TcsEventManager} eventManager Current event manager.
     * @param {boolean} isServerSide Is it currently server sided ?
     */
    constructor(eventManager: TcsEventManager, isServerSide: boolean) {
        this.logsToSend = [];
        this.eventManager = eventManager;
        // this.currentDb = db?.database();
        this.eventListener = null;
        this.isServerSide = isServerSide;

        if (this.isServerSide) {
            this.eventListener = new TcsEventListener(
                TcsEventsList.LOGS_SEND,
                ({ message }: { message: string }) => {
                    this.send(message);
                },
            );
            this.eventManager.addEventHandler(this.eventListener);
        }
    }

    /**
     * Main function to save a log
     *
     * @param {unknown} message string to save
     */
    send = (message: unknown) => {
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

export default TcsLogsManager;
