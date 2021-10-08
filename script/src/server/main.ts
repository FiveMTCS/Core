/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

const TCS: TcsCore = new TcsCore();
exports('getCore', () => TCS);

(function () {
	if (GetCurrentResourceName() !== 'tcs') {
		console.log(
			`${ConsoleColors.RED}TCS ERROR : Please do NOT rename tcs resource, it may breaks the different TCS modules.`
		);
		console.log(
			`${ConsoleColors.RED}TCS stopped loading. Rename the resource back to ${
				ConsoleColors.YELLOW
			}'tcs'${ConsoleColors.RED}, current name : '${GetCurrentResourceName()}'${
				ConsoleColors.RESET
			}`
		);
		return;
	}
})();
