import IQueryResult from 'types/queryResult.interface';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default abstract class MakeRequest {
    protected tables: string[];
    protected query: Record<string, unknown>;
    protected limitCount: number;
    protected orderByList: unknown;

    constructor(
        tables: string[],
        query: Record<string, unknown>,
        params?: { limitCount?: number; orderBy?: unknown },
    ) {
        this.tables = tables;
        this.query = query;

        this.limitCount = params && params.limitCount ? params.limitCount : 0;
        this.orderByList = params && params.orderBy ? params.orderBy : {};
    }

    /**
     * Sets the results count limit to the current request
     *
     * @param {number} count Results count
     * @returns {MakeRequest} Returns the current request
     */
    abstract limit(count: number): Promise<IQueryResult[]>;

    /**
     * ONLY FOR MONGO | Sets the current order to give to the results
     *
     * @param {unknown} list Mongo sort request unknown
     * @returns {MakeRequest} Returns the current request
     */
    abstract orderBy(list: unknown): Promise<IQueryResult[]>;

    /**
     * Execute the query
     *
     * @returns {Promise<IQueryResult[]>} Returns the query results
     */
    abstract execute(): Promise<IQueryResult[]>;

    /**
     * Execute the query but returns only one result
     *
     * @returns {Promise<IQueryResult | null>} Returns one result from the query
     */
    abstract executeOne(): Promise<IQueryResult | null>;
}
