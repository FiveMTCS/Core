import * as mysql from 'mysql2';
import DATABASE_CONFIG from '@config/databaseConfig';
import { error } from '@mixed/libraries/logs/fivemConsole';

const connectionParameters = {
    host: DATABASE_CONFIG.address,
    port: DATABASE_CONFIG.port,
    user: DATABASE_CONFIG.username,
    password: encodeURIComponent(DATABASE_CONFIG.password),
    database: DATABASE_CONFIG.databaseName,

    waitForConnections: true,
    connectionLimit: 20,
};

let client;

const connectToDb = async () => {
    const pool = await mysql.createPool(connectionParameters);
    client = pool.promise();
};

connectToDb().catch((err: Error) => error(err.message));

export const getDatabase = () => client;
