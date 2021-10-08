/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

class TcsPlayer {
	private source: number;
	private playerId: string;
	private licenses: Licenses;
	private punishments: TcsPunishmentsList;
	private wholeSession: number;
	private sessionStart: number;

	private characters: TcsCharacter[];

	private group: TcsGroups;

	private ready: boolean;

	constructor(source: number) {
		this.source = source;

		this.playerId = '-1';
		this.punishments = {
			warns: [],
			kicks: [],
			bans: [],
		};
		this.wholeSession = 0;
		this.sessionStart = +new Date();
		this.group = TcsGroups.PLAYER;

		this.characters = [];

		this.ready = false;

		const playerLicenses = getPlayerIdentifiers(source);

		this.licenses = {
			steam: playerLicenses.find((l) => l.indexOf('steam:') > -1),
			discord: playerLicenses.find((l) => l.indexOf('discord:') > -1),
			license: playerLicenses.find((l) => l.indexOf('license:') > -1),
			xbl: playerLicenses.find((l) => l.indexOf('xbl:') > -1),
		};

		TCS.debug('Retieving player...');
		this.retrievingInformations();
	}

	private async fetchPunishments() {
		TCS.debug(`Fetching punishements for player ${this.playerId}`);
		const punishments = await TCS.databaseManager
			.database()
			.get(['punishments'], {
				playerId: this.playerId,
			})
			.execute();

		if (punishments) {
			this.punishments = {
				bans: punishments
					.filter((pn) => pn.data?.type === 'ban')
					.map((pn) => pn.data as TcsPunishment),
				kicks: punishments
					.filter((pn) => pn.data?.type === 'kick')
					.map((pn) => pn.data as TcsPunishment),
				warns: punishments
					.filter((pn) => pn.data?.type === 'warn')
					.map((pn) => pn.data as TcsPunishment),
			};
		}
	}

	private async fetchCharacters() {
		TCS.debug(`Fetching characters for player ${this.playerId}`);
		const characters = await TCS.databaseManager
			.database()
			.get([PLAYER_MODULE_CHARACTERS_TABLE], {
				playerId: this.playerId,
			})
			.execute();

		if (!characters) {
			this.characters = [];
			return;
		}

		this.characters = characters.map(
			(character) =>
				new TcsCharacter(
					this,
					character.id,
					character.data?.informations,
					character.data?.skin,
					character.data?.coords,
					character.data?.mugshot
				)
		);
	}

	/**
	 * Retrieve player informations or create a new document if the player's informations don't exist
	 */
	async retrievingInformations() {
		const player = await TCS.databaseManager
			.database()
			.get([PLAYER_MODULE_PLAYERS_TABLE], {
				discord: this.licenses.discord,
			})
			.executeOne();

		if (!player) {
			const newPlayer = await TCS.databaseManager
				.database()
				.insert(PLAYER_MODULE_PLAYERS_TABLE, {
					...this.licenses,
					group: this.group,
					sessionTime: 0,
				});

			if (newPlayer) {
				this.playerId = newPlayer.id;
			}

			this.ready = true;
			return;
		}

		this.playerId = player.id;
		this.group = player.data?.group;
		this.wholeSession = player.data?.sessionTime;

		this.setGroup(TcsGroups.ADMIN);

		await this.fetchPunishments();
		await this.fetchCharacters();

		const loadedEvent: TcsClientEvent = {
			target: TcsEventTarget.CLIENT,
			eventType: TcsEventsList.PLAYER_LOADED,
			targetId: this.source,
			data: {
				characters: this.characters.map((character) => character.export()),
			},
		};

		TCS.debug(`Player ${this.playerId} ready, sending loaded event`);
		TCS.eventManager.sendEvent(loadedEvent);

		this.ready = true;
	}

	/**
	 * Get the FiveM player's source
	 * @returns FiveM player's source
	 */
	getSource() {
		return this.source;
	}

	/**
	 * Get the TCS player's ID
	 * @returns TCS player's ID
	 */
	getId() {
		return this.playerId;
	}

	/**
	 * Check if the player has loaded and retrieved his informations
	 * @returns True if the player has loaded
	 */
	isReady() {
		return this.ready;
	}

	/**
	 * Get the player's punishments history
	 * @returns Player's punishments
	 */
	getPunishments() {
		return this.punishments;
	}

	/**
	 * Add the specified punishment to the player's history
	 * @param punishment New punishment to add to the player's history
	 */
	async addPunishment(punishment: TcsPunishment) {
		await TCS.databaseManager.database().insert('punishments', punishment);

		switch (punishment.type) {
			case 'ban':
				this.punishments.bans.push(punishment);
				break;
			case 'kick':
				this.punishments.kicks.push(punishment);
				break;

			case 'warn':
				this.punishments.warns.push(punishment);
				break;

			default:
				TCS.error(`Invalid punishment type "${punishment.type}"`);
		}
	}

	/**
	 * Get the current player's group
	 * @returns Player's group
	 */
	getGroup() {
		return this.group;
	}

	/**
	 * Set the new player's group
	 * @param newGroup New group of the player
	 */
	setGroup(newGroup: TcsGroups) {
		this.group = newGroup;

		TCS.databaseManager.database().update(
			PLAYER_MODULE_PLAYERS_TABLE,
			{
				id: this.playerId,
			},
			{
				group: this.group,
			}
		);
	}

	/**
	 * Check if the player has the specified permission
	 * @param permission Permission to check
	 * @returns True if the current player has the specified permission
	 */
	hasPermission(permission: TcsPermissions) {
		return (
			GroupsPermissionsConfig[this.group].includes(TcsPermissions.ALL) ||
			GroupsPermissionsConfig[this.group].includes(permission)
		);
	}

	/**
	 * Get the current session time
	 * @returns Session time
	 */
	getSessionTime(): TcsSessionTime {
		const currentTime = +new Date();
		const diff = Math.abs(currentTime - this.sessionStart);

		return this.msToTime(diff);
	}

	/**
	 * Get the all sessions time
	 * @returns Session time
	 */
	getAllSessionsTime(): TcsSessionTime {
		const currentTime = +new Date();
		const diff = Math.abs(currentTime - this.sessionStart);

		const allSessions = this.wholeSession + diff;

		return this.msToTime(allSessions);
	}

	/**
	 * Convert ms to session time
	 * @param diff ms to convert
	 * @returns Converted ms to session time
	 */
	msToTime(diff: number): TcsSessionTime {
		const weeks = Math.floor(diff / (7 * 24 * 60 * 60 * 1000));
		const weeksms = diff % (7 * 24 * 60 * 60 * 1000);
		const days = Math.floor(weeksms / (24 * 60 * 60 * 1000));
		const daysms = diff % (24 * 60 * 60 * 1000);
		const hours = Math.floor(daysms / (60 * 60 * 1000));
		const hoursms = diff % (60 * 60 * 1000);
		const minutes = Math.floor(hoursms / (60 * 1000));
		const minutesms = diff % (60 * 1000);
		const sec = Math.floor(minutesms / 1000);

		return {
			weeks: weeks,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: sec,
		};
	}
	/**
	 * Save current player session
	 */
	disconnect() {
		const currentTime = +new Date();
		const diff = Math.abs(currentTime - this.sessionStart);

		this.wholeSession += diff;
		TCS.databaseManager.database().update(
			PLAYER_MODULE_PLAYERS_TABLE,
			{
				id: this.playerId,
			},
			{
				sessionTime: this.wholeSession,
			}
		);
	}
}
