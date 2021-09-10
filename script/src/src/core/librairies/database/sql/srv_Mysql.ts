class MysqlDatabase implements database {
	private client: any;

	constructor(onConnectionDone: Function) {
		const mysql = require('mysql2');
		const connectionParameters = {
			host: DATABASE_CONFIG.address,
			port: DATABASE_CONFIG.port,
			user: DATABASE_CONFIG.username,
			password: encodeURIComponent(DATABASE_CONFIG.password),
			database: DATABASE_CONFIG.databaseName,

			waitForConnections: true,
			connectionLimit: 20,
		};

		const connectToDb = async () => {
			const pool = await mysql.createPool(connectionParameters);
			this.client = pool.promise();
			onConnectionDone();
		};

		connectToDb().catch((err: Error) => TCS.error(err.message));
	}

	/**
	 * Execute the specified query and returns it's result
	 * @param sql Sql query to execute
	 * @returns A promise resolving the query's result
	 */
	private async asyncQuery(sql: string) {
		if (TCS_CONFIG.sqlDebug) TCS.debug(sql);
		try {
			const [result, _] = await this.client.execute(sql);
			return result;
		} catch (e) {
			TCS.error(e);
		}
	}

	/**
	 * Converts a record to a SQL equation
	 * @param record List of key / value to transform in sql equation
	 * @param sep Separator between each equation
	 * @returns The record transformed in a SQL equation
	 */
	private recordToSqlString(record: Record<string, any>, sep = ' '): string {
		let result: string[] = [];

		for (const key in record) {
			const value = record[key];

			if (typeof value === 'string') {
				result.push(`\`${key}\`='${value}'`);
			} else {
				result.push(`\`${key}\`=${value}`);
			}
		}

		return result.join(sep);
	}

	/**
	 * Will create the table if it doesn't exist
	 * @param table Name of the table to create if it doesn't exist
	 */
	private async ensureTables(table: string) {
		if (table) {
			const request = `CREATE TABLE IF NOT EXISTS \`${table}\` (\`id\` int(11) NOT NULL auto_increment, PRIMARY KEY  (\`id\`));`;

			await this.asyncQuery(request);
		}
		return;
	}

	/**
	 * Will create the table with the specified columns if they don't exist
	 * @param table Table to create the columns in
	 * @param columns List of the columns, specified by their name and values type
	 */
	async ensureColumns(table: string, columns: sqlColumn[]) {
		await this.ensureTables(table);
		const sqlColumns = columns.map(
			(column) => `\`${column.column}\` ${column.type}`
		);
		const request = `ALTER TABLE ${table} ADD COLUMN IF NOT EXISTS (${sqlColumns.join(
			', '
		)});`;

		await this.asyncQuery(request);

		return;
	}

	/**
	 * Create a new db request that gets the data
	 * @param table Name of the table to get the values from
	 * @param selector Query of the current request
	 * @returns A make request object corresponding to the current request
	 */
	get(table: string[], selector: Record<string, any>): MakeRequest {
		return new MakeRequestSQL(this.client, table, selector);
	}

	/**
	 * Update the specified documents of the table
	 * @param table Name of the table to update the values from
	 * @param selector Query of the current request
	 * @param newValues Values of the found documents to update
	 * @returns A promise from the request
	 */
	update(
		table: string,
		selector: Record<string, any>,
		newValues: Record<string, any>
	): Promise<Object> {
		return new Promise((resolve, reject) => {
			const sql = `UPDATE ${table} SET ${this.recordToSqlString(
				newValues,
				', '
			)} WHERE ${this.recordToSqlString(selector, ' AND ')};`;

			this.asyncQuery(sql).then(resolve).catch(reject);
		});
	}

	/**
	 * Delete the specified documents of the table
	 * @param table Name of the table to delete the values from
	 * @param query Query of the current request
	 * @returns A promise from the request
	 */
	delete(table: string, query: Record<string, any>): Promise<Object> {
		return new Promise((resolve, reject) => {
			const sql = `DELETE FROM ${table} WHERE ${this.recordToSqlString(
				query,
				', '
			)};`;

			this.asyncQuery(sql).then(resolve).catch(reject);
		});
	}

	/**
	 * Insert the specified document in the table
	 * @param table Name of the table to insert the document to
	 * @param newDocument The new document to insert
	 * @returns A promise from the request
	 */
	async insert(
		table: string,
		newDocument: Record<string, any>
	): Promise<QueryResult> {
		let keys: string[] = [];
		let values: string[] = [];

		for (const key in newDocument) {
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

		const sql = `INSERT INTO ${table} (${keys.join(',')}) VALUES (${values.join(
			','
		)});`;

		const result = await this.asyncQuery(sql);

		const insertedLine = await this.get([table], {
			id: result.insertId,
		}).executeOne();

		return {
			id: result.insertId,
			data: insertedLine ? insertedLine : undefined,
		};
	}
}
