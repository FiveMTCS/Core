/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

class TcsCore extends TcsMixedCore {
	readonly inputs: TcsInputManager;

	/**
	 * Initialize the TCS core
	 */
	constructor() {
		super(false);

		this.inputs = new TcsInputManager();
		console.log(
			`${ConsoleColors.BLUE}[TCS] ${ConsoleColors.GREEN}Ready to go !`
		);
	}
}
