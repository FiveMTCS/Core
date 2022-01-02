import './events';
import * as Player from './player/callbacks';
import * as Classes from './classes';
import * as Moderation from './moderation';

export const initCallbacks = () => {
    Classes.initCallbacks();
    Player.initCallbacks();
    Moderation.initCallbacks();
};
