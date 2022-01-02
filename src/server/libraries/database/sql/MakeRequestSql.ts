/* eslint-disable @typescript-eslint/no-explicit-any */
import MakeRequest from '../MakeRequest';
import IQueryResult from '@tcsTypes/queryResult.interface';

export default class MakeRequestSQL extends MakeRequest {
    private con: any;
    constructor(
        con: any,
        tables: string[],
        query: Record<string, unknown>,
        params?: { limitCount?: number; orderBy?: unknown },
    ) {
        super(tables, query, params);

        this.con = con;
    }

    limit = (count: number): Promise<IQueryResult[]> => {
        this.limitCount = count;

        return this.execute();
    };

    orderBy = (list: unknown): Promise<IQueryResult[]> => {
        this.orderByList = list;
        return this.execute();
    };

    /**
     * Converts a record to a SQL equation
     *
     * @param {Record<string, any>} record List of key //value to transform in sql equation
     * @param {string} sep Separator between each equation
     * @returns {string} The record transformed in a SQL equation
     */
    private recordToSqlstring = (
        record: Record<string, any>,
        sep = ' ',
    ): string => {
        const result: string[] = [];

        for (const key in record) {
            if (Object.prototype.hasOwnProperty.call(record, key)) {
                const value = record[key];

                if (typeof value === 'string') {
                    result.push(`${key}='${value}'`);
                } else {
                    result.push(`${key}=${value}`);
                }
            }
        }

        return result.join(sep);
    };

    execute = async (): Promise<IQueryResult[]> => {
        const sql = `SELECT * FROM ${this.tables.join(
            ',',
        )} WHERE ${this.recordToSqlstring(this.query)} ${
            this.limitCount > 0 ? `LIMIT ${this.limitCount}` : ''
        };`;

        const [result] = await this.con.execute(sql);
        return result.map((res: any) => {
            return {
                id: res.id,
                data: res,
            };
        });
    };

    executeOne = async (): Promise<IQueryResult | null> => {
        const sql = `SELECT * FROM ${this.tables.join(
            ',',
        )} WHERE ${this.recordToSqlstring(this.query)} LIMIT 1;`;

        const [result] = await this.con.execute(sql);
        if (result.length == 0) return null;
        return {
            id: result[0].id,
            data: result[0],
        };
    };
}
