/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

import * as Player from '@modules/player/main';
import * as Events from '@modules/events/main';
import TCS from './tcs';

globalThis.exports('getCore', () => TCS);

onNet('onClientMapStart', () => {
    // @ts-ignore
    globalThis.exports.spawnmanager.setAutoSpawn(true);

    // @ts-ignore
    globalThis.exports.spawnmanager.forceRespawn();
});

let firstSpawn = false;
onNet('playerSpawned', () => {
    if (GetCurrentResourceName() === 'tcs' && !firstSpawn) {
        firstSpawn = true;
    }
});

(function () {
    Player.init();
    Events.init();
})();
