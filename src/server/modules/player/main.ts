/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

import TcsEventListener from 'mixed/libraries/events/eventListenerClass';
import TcsEventsList from 'mixed/types/events/eventsList.enum';
import { sqlTypes } from 'types/sqlColumn.enum';
import TCS from '../../tcs';
import {
    PLAYER_MODULE_PLAYERS_TABLE,
    PLAYER_MODULE_PUNISHMENTS_TABLE,
} from './components/constants';
import { loadPlayer } from './components/functions';

import { initCallbacks } from './components';

export const init = () => {
    initCallbacks();

    console.log('1');
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
        console.log('2');
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

        console.log('3');
        const eventHandler = new TcsEventListener(
            TcsEventsList.PLAYER_READY,
            (data: Object, source?: string) => {
                console.log('loading');
                if (source) loadPlayer(source);
            },
        );

        TCS.eventManager.addEventHandler(eventHandler);
    });
};
