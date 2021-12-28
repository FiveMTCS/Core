/* eslint-disable @typescript-eslint/no-explicit-any */
import IQueryResult from '../../../types/queryResult.interface';
import MakeRequest from '../MakeRequest';
import { getDatabase } from './Mongo';

export default class MakeRequestMongo extends MakeRequest {
    constructor(
        collection: string[],
        query: Record<string, any>,
        params?: { limitCount?: number; orderBy?: any },
    ) {
        super(collection, query, params);

        if (collection.length == 0) {
            throw new Error('No collection designed during get request.');
        }
    }

    limit = (count: number): Promise<IQueryResult[]> => {
        this.limitCount = count;

        return this.execute();
    };

    orderBy = (list: any): Promise<IQueryResult[]> => {
        this.orderByList = list;
        return this.execute();
    };

    execute = (): Promise<IQueryResult[]> => {
        return new Promise((resolve, reject) => {
            let currentRequest = getDatabase()
                .collection(this.tables[0])
                .find(this.query);

            if (this.limitCount) {
                currentRequest = currentRequest.limit(this.limitCount);
            }

            if (this.orderByList) {
                currentRequest = currentRequest.sort(this.orderByList);
            }

            currentRequest.toArray((err: Error, result: any[]) => {
                if (err) reject(err);

                resolve(
                    result.map((res) => {
                        return {
                            id: res._id,
                            data: res,
                        };
                    }),
                );
            });
        });
    };

    executeOne = (): Promise<IQueryResult | null> => {
        return new Promise((resolve, reject) => {
            getDatabase()
                .collection(this.tables[0])
                .findOne(this.query, (err: Error, result: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    if (result == null) {
                        resolve(null);
                        return;
                    }

                    resolve({
                        id: result._id,
                        data: result,
                    });
                });
        });
    };
}
