/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

import ConsoleColors from '@mixed/types/consoleColors';
import { error, confirm } from '@mixed/libraries/logs/fivemConsole';
import TCS from '@/tcs';
import * as Player from '@modules/player/main';

globalThis.exports('Core', () => TCS);

(function () {
    if (GetCurrentResourceName() !== 'tcs') {
        error(
            `Please do NOT rename tcs resource, it may breaks the different TCS modules.`,
        );
        error(
            `TCS stopped loading. Rename the resource back to ${
                ConsoleColors.YELLOW
            }'tcs'${
                ConsoleColors.RED
            }, current name : '${GetCurrentResourceName()}'${
                ConsoleColors.RESET
            }`,
        );
        StopResource(GetCurrentResourceName());
        return;
    }

    Player.init();
    confirm(TCS.lang.get('core.ready'));
})();

export default TCS;
