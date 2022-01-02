import DATABASE_CONFIG from '@config/databaseConfig';
import { MongoClient } from 'mongodb';

let db;

const connectionUrl = `mongodb://${
    DATABASE_CONFIG.username
}:${encodeURIComponent(DATABASE_CONFIG.password)}@${DATABASE_CONFIG.address}:${
    DATABASE_CONFIG.port
}/`;

const client = new MongoClient(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect((err: Error) => {
    if (err) {
        console.error(err);
        return;
    }

    db = client.db(DATABASE_CONFIG.databaseName);
});

export const getDatabase = () => db;
