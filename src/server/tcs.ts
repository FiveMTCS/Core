/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

import TcsCallbackManager from 'libraries/callbacks/callbackManager';
import TcsDatabaseManager from 'libraries/database/database';
import TcsMixedCore from 'mixed/tcs';

export class TcsCore extends TcsMixedCore {
    readonly callbacks: TcsCallbackManager;
    readonly databaseManager: TcsDatabaseManager;

    /**
     * Initialize the TCS core
     */
    constructor() {
        super(true);

        this.callbacks = new TcsCallbackManager(this.eventManager);
        this.databaseManager = new TcsDatabaseManager();
        this.debug(this.lang.get('core.ready'));
    }
}

const TCS = new TcsCore();
export default TCS;
