class TcsMixedCore {
	readonly eventManager: TcsEventManager;
	readonly lang: TcsLanguageManager;
	readonly threads: TcsThreadsManager;
	readonly callbacks: TcsCallbackManager;
	readonly logs: TcsLogsManager;
	readonly isServerSided: boolean;

	constructor(isServerSided: boolean) {
		console.log(
			`${ConsoleColors.BLUE}[TCS] ${ConsoleColors.YELLOW}Initializing...`
		);
		this.eventManager = new TcsEventManager();
		this.lang = new TcsLanguageManager();
		this.threads = new TcsThreadsManager();
		this.callbacks = new TcsCallbackManager(this.eventManager);
		this.logs = new TcsLogsManager(this.eventManager, isServerSided);
		this.isServerSided = isServerSided;
	}

	/**
	 * Display the specified message if the server is in debug mode
	 * @param message Message to print in the console
	 */
	debug = (message: string) => {
		if (TCS_CONFIG.debugMode) {
			console.log(
				`${ConsoleColors.BLUE}[debug] ${message}`,
				ConsoleColors.RESET
			);
		}
	};

	/**
	 * Display the specified error in the console
	 * @param error Error to print in the console
	 */
	error(error: string) {
		if (TCS_CONFIG.showErrorsAnyCase || TCS_CONFIG.debugMode) {
			console.log(`${ConsoleColors.RED}[ERROR] ${error}`, ConsoleColors.RESET);
		}
	}

	/**
	 * Display the specified warning in the console
	 * @param warning Warning to print in the console
	 */
	warning(warning: string) {
		if (TCS_CONFIG.showWarningsAnyCase || TCS_CONFIG.debugMode) {
			console.log(
				`${ConsoleColors.YELLOW}[WARNING] ${warning}`,
				ConsoleColors.RESET
			);
		}
	}
}
