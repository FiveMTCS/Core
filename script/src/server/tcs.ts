/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

class TcsCore extends TcsMixedCore {
	readonly databaseManager: TcsDatabaseManager;

	/**
	 * Initialize the TCS core
	 */
	constructor() {
		super(true);

		this.databaseManager = new TcsDatabaseManager();
		console.log(
			`${ConsoleColors.BLUE}[TCS] ${ConsoleColors.GREEN}Ready to go !`
		);
	}
}
