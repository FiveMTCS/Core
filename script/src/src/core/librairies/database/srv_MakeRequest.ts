abstract class MakeRequest {
	protected tables: string[];
	protected query: Record<string, any>;
	//@ts-ignore
	protected limitCount: Number;
	//@ts-ignore
	protected orderByList: Object;

	constructor(tables: string[], query: Record<string, any>) {
		this.tables = tables;
		this.query = query;
	}

	/**
	 * Sets the results count limit to the current request
	 * @param count Results count
	 * @returns Returns the current request
	 */
	limit(count: Number): MakeRequest {
		this.limitCount = count;
		return this;
	}

	/**
	 * ONLY FOR MONGO | Sets the current order to give to the results
	 * @param list Mongo sort request object
	 * @returns Returns the current request
	 */
	orderBy(list: Object): MakeRequest {
		this.orderByList = list;
		return this;
	}

	/**
	 * Execute the query
	 * @returns Returns the query results
	 */
	abstract execute(): Promise<QueryResult[]>;

	/**
	 * Execute the query but returns only one result
	 * @returns Returns one result from the query
	 */
	abstract executeOne(): Promise<QueryResult | null>;
}

class MakeRequestSQL extends MakeRequest {
	private con: any;
	constructor(con: any, tables: string[], query: Record<string, any>) {
		super(tables, query);

		this.con = con;
	}

	/**
	 * Converts a record to a SQL equation
	 * @param record List of key / value to transform in sql equation
	 * @param sep Separator between each equation
	 * @returns The record transformed in a SQL equation
	 */
	private recordToSqlstring(record: Record<string, any>, sep = ' '): string {
		let result: string[] = [];

		for (const key in record) {
			const value = record[key];

			if (typeof value === 'string') {
				result.push(`${key}='${value}'`);
			} else {
				result.push(`${key}=${value}`);
			}
		}

		return result.join(sep);
	}

	async execute(): Promise<QueryResult[]> {
		const sql = `SELECT * FROM ${this.tables.join(
			','
		)} WHERE ${this.recordToSqlstring(this.query)} ${
			this.limitCount > 0 ? `LIMIT ${this.limitCount}` : ''
		};`;

		const [result, _] = await this.con.execute(sql);
		return result.map((res: any) => {
			return {
				id: res.id,
				data: res,
			};
		});
	}

	async executeOne(): Promise<QueryResult | null> {
		const sql = `SELECT * FROM ${this.tables.join(
			','
		)} WHERE ${this.recordToSqlstring(this.query)} LIMIT 1;`;

		const [result, _] = await this.con.execute(sql);
		if (result.length == 0) return null;
		return {
			id: result[0].id,
			data: result[0],
		};
	}
}

class MakeRequestMongo extends MakeRequest {
	private db: any;
	constructor(db: any, collection: string[], query: Record<string, any>) {
		super(collection, query);

		if (collection.length == 0)
			throw new Error('No collection designed during get request.');

		this.db = db;
	}

	execute(): Promise<QueryResult[]> {
		return new Promise((resolve, reject) => {
			let currentRequest = this.db.collection(this.tables[0]).find(this.query);

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
					})
				);
			});
		});
	}

	executeOne(): Promise<QueryResult | null> {
		return new Promise((resolve, reject) => {
			this.db
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
	}
}
