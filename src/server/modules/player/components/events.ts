/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

import TcsPlayer from './player/player';

(() => {
    onNet('playerJoining', (source: string) => {
        new TcsPlayer(source);
    });
})();
