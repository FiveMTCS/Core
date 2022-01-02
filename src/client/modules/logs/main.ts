/**
 * @author Anthony Robert
 * @version 0.1.0
 * @since 0.1.0
 */

import TCS from '@/tcs';

(function () {
    onNet('chat:addMessage', (message: string) => {
        TCS.logs.send(
            TCS.lang.getAndReplace('chatMessage', {
                playerName: GetPlayerName(PlayerPedId()),
                message: message,
            }),
        );
    });
})();
