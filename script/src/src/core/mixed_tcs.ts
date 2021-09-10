/**
 * @author Maxence Leguede
 * @version 1.1.0
 * @since 0.1.0
 */

class TcsCore {
	readonly eventManager: TcsEventManager;
	readonly modules: TcsModuleManager;
	readonly lang: TcsLanguageManager;
	readonly threads: TcsThreadsManager;
	readonly inputs: TcsInputManager;
	readonly callbacks: TcsCallbackManager;
	readonly database: TcsDatabaseManager | null = null;
	readonly ui: TcsUiManager | null = null;
	readonly logs: TcsLogsManager;
	readonly isServerSided: boolean;

	/**
	 * Initialize the TCS core
	 */
	constructor() {
		console.log(
			`${ConsoleColors.BLUE}[TCS] ${ConsoleColors.YELLOW}Initializing...`
		);
		this.eventManager = new TcsEventManager();
		this.modules = new TcsModuleManager();
		this.lang = new TcsLanguageManager();
		this.threads = new TcsThreadsManager();
		this.inputs = new TcsInputManager();
		this.callbacks = new TcsCallbackManager(this.eventManager);
		try {
			//@ts-ignore
			this.isServerSided = ScheduleResourceTick != undefined;

			if (this.isServerSided) {
				this.database = new TcsDatabaseManager();
			}
		} catch (error) {
			this.isServerSided = false;
		}

		this.logs = new TcsLogsManager(
			this.database,
			this.eventManager,
			this.isServerSided
		);

		if (!this.isServerSided) {
			this.ui = new TcsUiManager();
		}

		console.log(
			`${ConsoleColors.BLUE}[TCS] ${ConsoleColors.GREEN}Ready to go !`
		);
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
