interface database {
	/**
	 * Will create the table with the specified columns if they don't exist
	 * @param table Table to create the columns in
	 * @param columns List of the columns, specified by their name and values type
	 */
	ensureColumns(table: string, columns: sqlColumn[]): void;

	/**
	 * Get the values from the specified query and tables
	 * @param tables Tables to get the values from
	 * @param query Current query to fetch the values
	 */
	get(tables: string[], query: Record<string, any>): MakeRequest;

	/**
	 * Update rows / documents from the database
	 * @param table Table to update the value from
	 * @param query Current query to select the rows / documents to update
	 * @param newValues New values to set from the selected rows / documents
	 */
	update(
		table: string,
		query: Record<string, any>,
		newValues: Record<string, any>
	): Promise<Object>;

	/**
	 * Insert the object in the specified table
	 * @param table Table to insert the value from
	 * @param object Document to insert to the specified table
	 */
	insert(table: string, object: Record<string, any>): Promise<QueryResult>;

	/**
	 * Delete rows / documents from the database
	 * @param table Table to delete the values from
	 * @param query Current query to select the rows / documents to delete
	 */
	delete(table: string, query: Record<string, any>): Promise<Object>;
}
