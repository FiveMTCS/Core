import TcsEventManager from './libraries/events/eventManager';
import LanguageManager, {
    TcsLanguageManager,
} from './libraries/language/languageManager';
import { debug, error, warning } from './libraries/logs/fivemConsole';
import TcsLogsManager from './libraries/logs/logsManager';
import TcsThreadsManager from './libraries/threads/threadsManager';

class TcsMixedCore {
    readonly lang: TcsLanguageManager;
    readonly eventManager: TcsEventManager;
    readonly threads: TcsThreadsManager;
    readonly logs: TcsLogsManager;
    readonly isServerSided: boolean;

    constructor(isServerSided: boolean) {
        this.lang = LanguageManager;

        this.debug(this.lang.get('core.initializing'));
        this.eventManager = new TcsEventManager(isServerSided);
        this.threads = new TcsThreadsManager();
        this.logs = new TcsLogsManager(this.eventManager, isServerSided);
        this.isServerSided = isServerSided;
    }

    delay = (ms) => new Promise((res) => setTimeout(res, ms));

    /**
     * Display the specified message if the server is in debug mode
     *
     * @param {string} message Message to print in the console
     */
    debug = debug;

    /**
     * Display the specified error in the console
     *
     * @param {string} error Error to print in the console
     */
    error = error;

    /**
     * Display the specified warning in the console
     *
     * @param {string} warning Warning to print in the console
     */
    warning = warning;
}

export default TcsMixedCore;
