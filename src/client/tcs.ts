/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

import TcsCallbackManager from 'libraries/callbacks/callbackManager';
import TcsInputManager from 'libraries/inputs/inputsManager';
import TcsMixedCore from 'mixed/tcs';

export class TcsCore extends TcsMixedCore {
    readonly callbacks: TcsCallbackManager;
    readonly inputs: TcsInputManager;

    /**
     * Initialize the TCS core
     */
    constructor() {
        super(false);

        this.callbacks = new TcsCallbackManager(this.eventManager);
        this.inputs = new TcsInputManager();
        this.debug(this.lang.get('core.ready'));
    }
}

const TCS = new TcsCore();
export default TCS;
