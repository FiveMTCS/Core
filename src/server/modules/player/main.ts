/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

import TcsEventListener from '@mixed/libraries/events/eventListenerClass';
import TcsEventsList from '@mixed/types/events/eventsList.enum';
import { sqlTypes } from '@tcsTypes/sqlColumn.enum';
import TCS from '@/tcs';
import {
    PLAYER_MODULE_PLAYERS_TABLE,
    PLAYER_MODULE_PUNISHMENTS_TABLE,
} from './components/constants';
import { getPlayer, loadPlayer } from './components/functions';

import { initCallbacks } from './components';
import TCS_CONFIG from '@config/config';
import {
    TcsClientEvent,
    TcsEventTarget,
} from '@mixed/types/events/events.enum';

export const init = () => {
    initCallbacks();

    TCS.databaseManager.onDatabaseReady(async () => {
        await TCS.databaseManager
            .database()
            .ensureColumns(PLAYER_MODULE_PLAYERS_TABLE, [
                {
                    column: 'group',
                    type: sqlTypes.VARCHAR,
                },
                {
                    column: 'steam',
                    type: sqlTypes.VARCHAR,
                },
                {
                    column: 'discord',
                    type: sqlTypes.VARCHAR,
                },
                {
                    column: 'license',
                    type: sqlTypes.VARCHAR,
                },
                {
                    column: 'xbl',
                    type: sqlTypes.VARCHAR,
                },
                {
                    column: 'sessionTime',
                    type: sqlTypes.BIGINT,
                },
            ]);
        await TCS.databaseManager
            .database()
            .ensureColumns(PLAYER_MODULE_PUNISHMENTS_TABLE, [
                {
                    column: 'type',
                    type: sqlTypes.VARCHAR,
                },
                {
                    column: 'playerId',
                    type: sqlTypes.VARCHAR,
                },
                {
                    column: 'timestamp',
                    type: sqlTypes.BIGINT,
                },
                {
                    column: 'sender',
                    type: sqlTypes.VARCHAR,
                },
                {
                    column: 'reason',
                    type: sqlTypes.VARCHAR,
                },
                {
                    column: 'note',
                    type: sqlTypes.VARCHAR,
                },
            ]);

        const eventHandler = new TcsEventListener(
            TcsEventsList.PLAYER_READY,
            (data: Object, source?: string) => {
                if (!source) return;
                let player = getPlayer(source);

                if (!player) {
                    // If the server is in debug mode and the resource restarted, we load the player
                    if (TCS_CONFIG.debugMode) {
                        loadPlayer(source);
                        player = getPlayer(source);

                        while (!player.isReady()) {
                            TCS.delay(100);
                        }
                    } else return;
                }

                const loadedEvent: TcsClientEvent = {
                    target: TcsEventTarget.CLIENT,
                    eventType: TcsEventsList.PLAYER_LOADED,
                    targetId: source,
                    data: {
                        characters: player
                            .getCharacters()
                            .map((character) => character.export()),
                    },
                };

                TCS.eventManager.sendEvent(loadedEvent);
            },
        );

        TCS.eventManager.addEventHandler(eventHandler);
    });
};
