/**
 * @author Maxence Leguede
 * @version 1.1.0
 * @since 1.1.0
 */

class TcsUiManager {
	private modulesUi: Record<string, string[]>;

	constructor() {
		this.modulesUi = {};
	}

	/**
	 * Shows a module's interface to the game
	 * @param module Module the interface comes from
	 * @param uiName Name of the HTML file of the interface
	 */
	openUi(module: TcsModule, uiName: string) {
		if (!this.modulesUi[module.getId()]) {
			this.modulesUi[module.getId()] = [];
		}

		const moduleUi = this.modulesUi[module.getId()];
		if (moduleUi.indexOf(uiName) !== -1) return;

		SendNuiMessage(
			JSON.stringify({
				openInterface: true,
				module: module.getId(),
				file: uiName,
			})
		);

		moduleUi.push(uiName);
	}

	/**
	 * Hide a module's interface to the game
	 * @param module Module the interface comes from
	 * @param uiName Name of the HTML file of the interface
	 */
	closeUi(module: TcsModule, uiName: string) {
		if (!this.modulesUi[module.getId()]) return;

		const moduleUi = this.modulesUi[module.getId()];
		const index = moduleUi.indexOf(uiName);
		if (index === -1) return;

		SendNuiMessage(
			JSON.stringify({
				closeInterface: true,
				file: uiName,
			})
		);

		moduleUi.splice(index);
	}

	/**
	 * Shows a modal in the user's interface
	 * @param title Title of the modal
	 * @param description Description of the modal
	 */
	showModal(title: string, description: string) {
		SendNuiMessage(
			JSON.stringify({
				showModal: true,
				title: title,
				description: description,
			})
		);
	}

	/**
	 * Display a notification in the user's screen
	 * @param text Text to show in the notification
	 * @param icon Notification's icon
	 * @param color Notification's color style
	 */
	showNotification(text: string, icon?: string, color?: string) {
		SendNuiMessage(
			JSON.stringify({
				showNotification: true,
				description: text,
				icon: icon,
				color: color,
			})
		);
	}

	/**
	 * Display a titled notification in the user's screen
	 * @param title Notification's title
	 * @param description Notification's description
	 * @param icon  Notification's icon
	 * @param color Notification's color
	 */
	showTitledNotification(
		title: string,
		description: string,
		icon?: string,
		color?: string
	) {
		SendNuiMessage(
			JSON.stringify({
				showTitledNotification: true,
				title: title,
				description: description,
				icon: icon,
				color: color,
			})
		);
	}

	/**
	 * Display an error in the user's screen
	 * @param title Error's title
	 * @param description Error's description
	 */
	showError(title: string, description: string) {
		SendNuiMessage(
			JSON.stringify({
				showError: true,
				title: title,
				description: description,
			})
		);
	}

	/**
	 * Display an warning in the user's screen
	 * @param title Warning's title
	 * @param description Warning's description
	 */
	showWarning(title: string, description: string) {
		SendNuiMessage(
			JSON.stringify({
				showWarning: true,
				title: title,
				description: description,
			})
		);
	}
}
