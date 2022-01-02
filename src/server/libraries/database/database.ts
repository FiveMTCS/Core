import DATABASE_CONFIG from '@config/databaseConfig';
import LanguageManager from '@mixed/libraries/language/languageManager';
import { debug } from '@mixed/libraries/logs/fivemConsole';
import { IDatabase } from '../../types/database';
import MongoDatabase from './mongo/MongoDatabase';
import MysqlDatabase from './sql/MysqlDatabase';

export default class TcsDatabaseManager {
    private currentDb: IDatabase;
    private connected: boolean;
    private onDatabaseReadyList: { (): void }[];

    constructor() {
        debug(LanguageManager.get('database.connecting'));
        this.onDatabaseReadyList = [];
        this.connected = false;
        if (DATABASE_CONFIG.nosql) {
            this.currentDb = new MongoDatabase(() => {
                this.loadReadyList();
            });
        } else {
            this.currentDb = new MysqlDatabase(() => {
                this.loadReadyList();
            });
        }
    }

    private loadReadyList = () => {
        debug(LanguageManager.get('database.connected'));
        this.connected = true;
        this.onDatabaseReadyList.forEach((fnc) => fnc());
    };

    onDatabaseReady = (fnc: () => void) => {
        if (!this.currentDb || !this.connected) {
            this.onDatabaseReadyList.push(fnc);
            return;
        }

        fnc();
    };

    database = () => {
        return this.currentDb;
    };
}
