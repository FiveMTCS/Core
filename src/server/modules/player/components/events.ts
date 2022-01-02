/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

import TCS from '@/tcs';
import IDeferrals from '@/types/deferrals';
import { loadPlayer, switchPlayerSource } from './functions';

(() => {
    onNet(
        'playerConnecting',
        (
            playerName: string,
            setKickReason: (reason: string) => void,
            deferrals: IDeferrals,
        ) => {
            deferrals.defer();
            TCS.debug(
                TCS.lang.getAndReplace('player.debug.connecting', {
                    playerName,
                }),
            );
            loadPlayer((global as any).source, deferrals);
        },
    );

    onNet('playerJoining', (oldID: string) => {
        const source = (global as any).source;
        switchPlayerSource(source, oldID);
    });
})();
