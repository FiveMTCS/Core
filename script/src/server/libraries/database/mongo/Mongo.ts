class MongoDatabase implements database {
  private client
  private db: any

  constructor(onConnectionDone: Function) {
    const mongoClient = require('mongodb').MongoClient
    const connectionUrl = `mongodb://${DATABASE_CONFIG.username}:${encodeURIComponent(
      DATABASE_CONFIG.password
    )}@${DATABASE_CONFIG.address}:${DATABASE_CONFIG.port}/`

    this.client = new mongoClient(connectionUrl, { useUnifiedTopology: true })
    this.client.connect((err: Error) => {
      if (err) {
        console.error(err)
        return
      }

      this.db = this.client.db(DATABASE_CONFIG.databaseName)
      onConnectionDone()
    })
  }

  ensureColumns = async (table: string, columns: sqlColumn[]) => {
    return
  }

  /**
   * Create a new db request that gets the data
   * @param collection Name of the collection to get the values from
   * @param selector Query of the current request
   * @returns A make request object corresponding to the current request
   */
  get = (collection: string[], selector: Record<string, any>): MakeRequest => {
    if (selector['id']) {
      selector['_id'] = selector['id']

      delete selector['id']
    }
    return new MakeRequestMongo(this.db, collection, selector)
  }

  /**
   * Update the specified documents of the collection
   * @param collection Name of the collection to update the values from
   * @param selector Query of the current request
   * @param newValues Values of the found documents to update
   * @returns A promise from the request
   */
  update = (
    collection: string,
    selector: Record<string, any>,
    newValues: Record<string, any>
  ): Promise<Object> => {
    if (collection.length == 0) throw new Error('No collection designed during update request.')

    if (selector['id']) {
      selector['_id'] = selector['id']

      delete selector['id']
    }
    return new Promise((resolve, reject) => {
      this.db
        .collection(collection)
        .updateMany(selector, { $set: newValues }, (err: Error, res: Object) => {
          if (err) reject(err)
          resolve(res)
        })
    })
  }

  /**
   * Delete the specified documents of the collection
   * @param collection Name of the collection to delete the values from
   * @param query Query of the current request
   * @returns A promise from the request
   */
  delete = (collection: string, query: Record<string, any>): Promise<Object> => {
    return new Promise((resolve, reject) => {
      if (query['id']) {
        query['_id'] = query['id']

        delete query['id']
      }
      console.log(query)
      this.db.collection(collection).deleteMany(query, (err: Error, res: Object) => {
        if (err) reject(err)
        resolve(res)
      })
    })
  }

  /**
   * Insert the specified document in the collection
   * @param collection Name of the collection to insert the document to
   * @param newDocument The new document to insert
   * @returns A promise from the request
   */
  insert = (collection: string, newDocument: Record<string, any>): Promise<QueryResult> => {
    return new Promise((resolve, reject) => {
      this.db.collection(collection).insertOne(newDocument, (err: Error, res: any) => {
        if (err) reject(err)
        resolve({
          id: res.insertedId,
          data: res.ops[0]
        })
      })
    })
  }
}
