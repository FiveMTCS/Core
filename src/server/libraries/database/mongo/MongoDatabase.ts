/* eslint-disable @typescript-eslint/no-explicit-any */
import IQueryResult from '../../../types/queryResult.interface';
import { IDatabase } from '../../../types/database';
import MakeRequest from '../MakeRequest';
import MakeRequestMongo from './MakeRequestMongo';
import { getDatabase } from './Mongo';

class MongoDatabase implements IDatabase {
    constructor(onConnectionDone: () => void) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires

        this.connect(onConnectionDone);
    }

    private connect = async (onConnectionDone: () => void) => {
        const delay = (ms) => new Promise((res) => setTimeout(res, ms));
        while (!getDatabase()) {
            await delay(100);
        }
        onConnectionDone();
    };

    /**
     * Does nothing with Mongodb
     *
     * @returns {void}
     */
    ensureColumns = async () => {
        return;
    };

    /**
     * Create a new db request that gets the data
     *
     * @param {string[]} collection Name of the collection to get the values from
     * @param {Record<string, any>} selector Query of the current request
     * @returns {MakeRequest} A make request object corresponding to the current request
     */
    get = (
        collection: string[],
        selector: Record<string, any>,
    ): MakeRequest => {
        if (selector['id']) {
            selector['_id'] = selector['id'];

            delete selector['id'];
        }
        return new MakeRequestMongo(collection, selector);
    };

    /**
     * Update the specified documents of the collection
     *
     * @param {string} collection Name of the collection to update the values from
     * @param {Record<string, any>} selector Query of the current request
     * @param {Record<string, any>} newValues Values of the found documents to update
     * @returns {Promise<any>} A promise from the request
     */
    update = (
        collection: string,
        selector: Record<string, any>,
        newValues: Record<string, any>,
    ): Promise<any> => {
        if (collection.length == 0) {
            throw new Error('No collection designed during update request.');
        }

        if (selector['id']) {
            selector['_id'] = selector['id'];

            delete selector['id'];
        }
        return new Promise((resolve, reject) => {
            getDatabase()
                .collection(collection)
                .updateMany(
                    selector,
                    { $set: newValues },
                    (err: Error, res: any) => {
                        if (err) reject(err);
                        resolve(res);
                    },
                );
        });
    };

    /**
     * Delete the specified documents of the collection
     *
     * @param {string} collection Name of the collection to delete the values from
     * @param {Record<string, any>} query Query of the current request
     * @returns {Promise<any>} A promise from the request
     */
    delete = (collection: string, query: Record<string, any>): Promise<any> => {
        return new Promise((resolve, reject) => {
            if (query['id']) {
                query['_id'] = query['id'];

                delete query['id'];
            }
            getDatabase()
                .collection(collection)
                .deleteMany(query, (err: Error, res: any) => {
                    if (err) reject(err);
                    resolve(res);
                });
        });
    };

    /**
     * Insert the specified document in the collection
     *
     * @param {string} collection Name of the collection to insert the document to
     * @param {Record<string, any>} newDocument The new document to insert
     * @returns {Promise<IQueryResult>} A promise from the request
     */
    insert = (
        collection: string,
        newDocument: Record<string, any>,
    ): Promise<IQueryResult> => {
        return new Promise((resolve, reject) => {
            getDatabase()
                .collection(collection)
                .insertOne(newDocument, (err: Error, res: any) => {
                    if (err) reject(err);
                    resolve({
                        id: res.insertedId,
                        data: res.ops[0],
                    });
                });
        });
    };
}

export default MongoDatabase;
