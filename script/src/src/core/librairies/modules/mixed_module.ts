/**
 * @author Maxence Leguede
 * @version 1.0.0
 * @since 0.1.0
 */

class TcsModule {
	//@ts-ignore
	private moduleInfos: TcsModuleInfos;
	private launchMethod: Function;
	private destroyMethod: Function;
	private moduleFunctions: Record<string, Function>;

	moduleLaunched: Boolean;
	shouldLaunch: Boolean;

	/**
	 * Create a new Tcs module instance
	 * @param moduleType Type of the current module
	 * @param moduleName Name of the current module, as if it was a ressource
	 * @param launchMethod Method to launch when the module is ready
	 * @param moduleDependencies List of modules ids this module depends on
	 */
	constructor(moduleInfos: TcsModuleInfos | null, launchMethod: Function) {
		this.shouldLaunch = true;

		if (moduleInfos != null) {
			this.moduleInfos = moduleInfos;

			if (
				TCS_CONFIG.versionningCheck &&
				TCS.isServerSided &&
				this.moduleInfos.git
			) {
				this.checkVersion();
			}
		} else {
			this.shouldLaunch = false;
		}
		this.launchMethod = launchMethod;
		this.destroyMethod = () => {};
		this.moduleLaunched = false;

		this.moduleFunctions = {};
	}

	/**
	 * Declare a function in the current module
	 * @param name Name of the function
	 * @param exec Function to execute
	 */
	createFunction(name: string, exec: Function) {
		this.moduleFunctions[name] = exec;
	}

	/**
	 * Get a created function by its name
	 * @param name Name of the function to get
	 * @returns The function assigned with the name
	 */
	fnc(name: string) {
		if (!this.moduleFunctions[name])
			return () =>
				this.printDebug(`${ConsoleColors.RED}Function ${name} isn't declared`);

		return this.moduleFunctions[name];
	}

	/**
	 * Get the id of the current module
	 * @returns id of the current module
	 */
	getId(): string {
		return `${this.moduleInfos.moduleType}/${this.moduleInfos.moduleName}`;
	}

	/**
	 * Get the list of the current module dependencies
	 * @returns list of current module dependencies
	 */
	getDependencies(): Array<string> {
		return this.moduleInfos.dependencies || [];
	}

	/**
	 * Set the method that will be called when the module has to be stopped
	 * @param destroyMethod Method that will be called when the module is stopped
	 */
	setDestroyModule(destroyMethod: Function) {
		this.destroyMethod = destroyMethod;
	}

	/**
	 * Stop the module
	 */
	destroyModule() {
		this.printDebug('Shutting down module !', ConsoleColors.RED);
		try {
			TCS.threads.removeThreadByModule(this);
			this.moduleLaunched = false;
			this.shouldLaunch = false;
			this.destroyMethod();
			this.printDebug(
				'Module has been stopped correctly !',
				ConsoleColors.GREEN
			);
		} catch (e) {
			this.printDebug(
				'An error has been thrown while shutting down the module !',
				ConsoleColors.RED
			);
			console.log(ConsoleColors.RED, e.message, ConsoleColors.RESET);
			this.shouldLaunch = false;
		}
	}

	/**
	 * Starts the module
	 */
	initModule() {
		this.printDebug('Starting module !');
		try {
			if (onLoadModuleFunctions[this.getId()])
				onLoadModuleFunctions[this.getId()].forEach((fnc) => fnc(this));

			this.launchMethod(this);
			TCS.lang.loadModuleLang(this, TCS_CONFIG.lang);
			this.moduleLaunched = true;
			this.printDebug('Module has been started !', ConsoleColors.GREEN);
		} catch (e) {
			this.printDebug(
				'An error has been thrown while starting the module !',
				ConsoleColors.RED
			);
			console.error(ConsoleColors.RED, e, ConsoleColors.RESET);
			this.shouldLaunch = false;
		}
	}

	/**
	 * Check with github the last version of the module to know if the current module is up to date.
	 */
	private checkVersion() {
		const https = require('https');
		const options = {
			hostname: 'raw.githubusercontent.com',
			port: 443,
			path: `/${this.moduleInfos.git}/main/.tcs.json`,
			method: 'GET',
		};

		const req = https.request(options, (res: any) => {
			res.on('data', (d: any) => {
				const buf = Buffer.from(d);
				const json = JSON.parse(buf.toString('utf-8'));

				if (!json.version) {
					return;
				}
				if (this.isVersionSuperior(json.version, this.moduleInfos.version)) {
					TCS.warning(
						`Module ${this.getId()} has a new version (current: ${
							this.moduleInfos.version
						} | new version : ${json.version}) ! \n${
							ConsoleColors.YELLOW
						}You can download it at : https://github.com/${
							this.moduleInfos.git
						}${ConsoleColors.RESET}`
					);
				}
			});
		});

		req.on('error', (error: any) => {
			console.error(error);
		});

		req.end();
	}

	/**
	 * Check if the current version is superior at the compared one
	 * @param current Latest version number of the module
	 * @param compare Version to compare to
	 * @param currentStep Step on the string version of the module (splitted by dot)
	 * @returns Returns true if the current version is superior to the compared version. Returns false if not.
	 */
	private isVersionSuperior(
		current: string,
		compare: string,
		currentStep: number = 0
	): boolean {
		const currentNumber = parseInt(current.split('.')[currentStep]);
		const compareNumber = parseInt(compare.split('.')[currentStep]);

		if (currentNumber == compareNumber) {
			if (currentStep == 2) return false;
			return this.isVersionSuperior(current, compare, currentStep + 1);
		} else {
			return currentNumber > compareNumber;
		}
	}

	/**
	 * Print a debug message to the console
	 * @param message Message to print in the console, a prefix is concatened to it (category/name)
	 * @param messageColor Color of the current message in the console, yellow by default
	 */
	printDebug(
		message: string,
		messageColor: ConsoleColors = ConsoleColors.YELLOW
	) {
		if (TCS_CONFIG.debugMode)
			console.log(
				`${ConsoleColors.BLUE} [${this.getId()}] ${messageColor}`,
				message,
				ConsoleColors.RESET
			);
	}
}
