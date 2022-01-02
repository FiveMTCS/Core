/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Config from '@config/index';
import { debug, error } from '@mixed/libraries/logs/fivemConsole';
import { IDatabase } from '@tcsTypes/database';
import IQueryResult from '@tcsTypes/queryResult.interface';
import { ISqlColumn } from '@tcsTypes/sqlColumn.enum';
import MakeRequest from '../MakeRequest';
import MakeRequestSQL from './MakeRequestSql';
import { getDatabase } from './Mysql';

class MysqlDatabase implements IDatabase {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    private client: any;

    constructor(onConnectionDone: () => void) {
        //eslint-disable-next-line @typescript-eslint/no-var-requires
        this.connect(onConnectionDone);
    }

    private connect = async (onConnectionDone: () => void) => {
        const delay = (ms) => new Promise((res) => setTimeout(res, ms));
        while (!getDatabase()) {
            await delay(100);
        }
        this.client = getDatabase();
        onConnectionDone();
    };

    /**
     * Execute the specified query and returns it's result
     *
     * @param {string} sql Sql query to execute
     * @returns {Promise<unknown>} A promise resolving the query's result
     */
    private asyncQuery = async (sql: string) => {
        if (Config.Tcs.sqlDebug) debug(sql);
        try {
            const [result] = await this.client.execute(sql);
            return result;
        } catch (e) {
            error(e);
        }
    };

    /**
     * Converts a record to a SQL equation
     *
     * @param {Record<string, unknown>} record List of key //value to transform in sql equation
     * @param {string} sep Separator between each equation
     * @returns {string} The record transformed in a SQL equation
     */
    private recordToSqlString = (
        record: Record<string, unknown>,
        sep = ' ',
    ): string => {
        const result: string[] = [];

        for (const key in record) {
            if (Object.prototype.hasOwnProperty.call(record, key)) {
                const value = record[key];

                if (typeof value === 'string') {
                    result.push(`\`${key}\`='${value}'`);
                } else {
                    result.push(`\`${key}\`=${value}`);
                }
            }
        }

        return result.join(sep);
    };

    /**
     * Will create the table if it doesn't exist
     *
     * @param {string} table Name of the table to create if it doesn't exist
     */
    private ensureTables = async (table: string) => {
        if (table) {
            const request = `CREATE TABLE IF NOT EXISTS \`${table}\` (\`id\` int(11) NOT NULL auto_increment, PRIMARY KEY  (\`id\`));`;

            await this.asyncQuery(request);
        }
        return;
    };

    /**
     * Will create the table with the specified columns if they don't exist
     *
     * @param {string} table Table to create the columns in
     * @param {sqlColumn[]} columns List of the columns, specified by their name and values type
     */
    ensureColumns = async (table: string, columns: ISqlColumn[]) => {
        await this.ensureTables(table);
        const sqlColumns = columns.map(
            (column) => `\`${column.column}\` ${column.type}`,
        );
        const request = `ALTER TABLE ${table} ADD COLUMN IF NOT EXISTS (${sqlColumns.join(
            ', ',
        )});`;

        await this.asyncQuery(request);

        return;
    };

    /**
     * Create a new db request that gets the data
     *
     * @param {string[]} tables Name of the table to get the values from
     * @param {Record<string, any>} selector Query of the current request
     * @returns {MakeRequest} A make request object corresponding to the current request
     */
    get = (tables: string[], selector: Record<string, any>): MakeRequest => {
        return new MakeRequestSQL(this.client, tables, selector);
    };

    /**
     * Update the specified documents of the table
     *
     * @param {string} table Name of the table to update the values from
     * @param {Record<string, any>} selector Query of the current request
     * @param {Record<string, any>} newValues Values of the found documents to update
     * @returns {Promise<any>} A promise from the request
     */
    update = (
        table: string,
        selector: Record<string, any>,
        newValues: Record<string, any>,
    ): Promise<any> => {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE ${table} SET ${this.recordToSqlString(
                newValues,
                ', ',
            )} WHERE ${this.recordToSqlString(selector, ' AND ')};`;

            this.asyncQuery(sql).then(resolve).catch(reject);
        });
    };

    /**
     * Delete the specified documents of the table
     *
     * @param {string} table Name of the table to delete the values from
     * @param {Record<string, any>} query Query of the current request
     * @returns {Promise<any>} A promise from the request
     */
    delete = (table: string, query: Record<string, any>): Promise<any> => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM ${table} WHERE ${this.recordToSqlString(
                query,
                ', ',
            )};`;

            this.asyncQuery(sql).then(resolve).catch(reject);
        });
    };

    /**
     * Insert the specified document in the table
     *
     * @param {string} table Name of the table to insert the document to
     * @param {Record<string, any>} newDocument The new document to insert
     * @returns {Promise<IQueryResult>} A promise from the request
     */
    insert = async (
        table: string,
        newDocument: Record<string, any>,
    ): Promise<IQueryResult> => {
        const keys: string[] = [];
        const values: string[] = [];

        for (const key in newDocument) {
            if (Object.prototype.hasOwnProperty.call(newDocument, key)) {
                const value = newDocument[key];

                if (value) {
                    keys.push(`\`${key}\``);

                    if (typeof value === 'string') {
                        values.push(`'${value}'`);
                    } else {
                        values.push(`${value}`);
                    }
                }
            }
        }

        const sql = `INSERT INTO ${table} (${keys.join(
            ',',
        )}) VALUES (${values.join(',')});`;

        const result = await this.asyncQuery(sql);

        const insertedLine = await this.get([table], {
            id: result.insertId,
        }).executeOne();

        return {
            id: result.insertId,
            data: insertedLine ? insertedLine : undefined,
        };
    };
}

export default MysqlDatabase;
