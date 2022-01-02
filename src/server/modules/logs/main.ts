import { sqlTypes } from '@tcsTypes/sqlColumn.enum';
import TCS from '@/tcs';

(function () {
    TCS.databaseManager.onDatabaseReady(async () => {
        await TCS.databaseManager.database().ensureColumns('logs', [
            {
                column: 'timestamp',
                type: sqlTypes.BIGINT,
            },
            {
                column: 'message',
                type: sqlTypes.TEXT,
            },
        ]);
    });

    on('playerDropped', (reason: string) => {
        const _source = source;
        TCS.logs.send(
            TCS.lang.getAndReplace('player.debug.dropped', {
                playerName: GetPlayerName(_source),
                reason: reason,
            }),
        );
    });

    on('playerConnecting', (name: string) => {
        TCS.logs.send(
            TCS.lang.getAndReplace('player.connecting', {
                playerName: name,
            }),
        );
    });
})();
