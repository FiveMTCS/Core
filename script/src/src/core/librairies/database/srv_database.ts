class TcsDatabaseManager {
	private currentDb: database;
	private connected: boolean;
	private onDatabaseReadyList: Function[];

	constructor() {
		this.onDatabaseReadyList = [];
		this.connected = false;
		if (DATABASE_CONFIG.nosql) {
			this.currentDb = new MongoDatabase(() => {
				this.loadReadyList();
			});
		} else {
			this.currentDb = new MysqlDatabase(() => {
				this.loadReadyList();
			});
		}
	}

	loadReadyList() {
		this.connected = true;
		this.onDatabaseReadyList.forEach((fnc) => fnc());
	}

	onDatabaseReady(fnc: Function) {
		if (!this.currentDb || !this.connected) {
			this.onDatabaseReadyList.push(fnc);
			return;
		}

		fnc();
	}

	database() {
		return this.currentDb;
	}
}
