import './events';
import * as Player from './player/callbacks';
import * as Classes from './classes';

export const initCallbacks = () => {
    Classes.initCallbacks();
    Player.initCallbacks();
};
