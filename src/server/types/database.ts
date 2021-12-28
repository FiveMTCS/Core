/* eslint-disable @typescript-eslint/no-explicit-any */
import MakeRequest from 'libraries/database/MakeRequest';
import IQueryResult from './queryResult.interface';
import { ISqlColumn } from './sqlColumn.enum';

export interface IDatabase {
    /**
     * Will create the table with the specified columns if they don't exist
     *
     * @param {string} table Table to create the columns in
     * @param {sqlColumn[]} columns List of the columns, specified by their name and values type
     */
    ensureColumns(table: string, columns: ISqlColumn[]): void;

    /**
     * Get the values from the specified query and tables
     *
     * @param {string[]} tables Tables to get the values from
     * @param {Record<string, any>} query Current query to fetch the values
     */
    get(tables: string[], query: Record<string, any>): MakeRequest;

    /**
     * Update rows / documents from the database
     *
     * @param {string} table Table to update the value from
     * @param {Record<string, any>} query Current query to select the rows / documents to update
     * @param {Record<string, any>} newValues New values to set from the selected rows / documents
     */
    update(
        table: string,
        query: Record<string, any>,
        newValues: Record<string, any>,
    ): Promise<any>;

    /**
     * Insert the object in the specified table
     *
     * @param {string} table Table to insert the value from
     * @param {Record<string, any>} object Document to insert to the specified table
     */
    insert(table: string, object: Record<string, any>): Promise<IQueryResult>;

    /**
     * Delete rows / documents from the database
     *
     * @param {string} table Table to delete the values from
     * @param {Record<string, any>} query Current query to select the rows / documents to delete
     */
    delete(table: string, query: Record<string, any>): Promise<any>;
}
