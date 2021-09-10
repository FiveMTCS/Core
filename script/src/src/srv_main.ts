/**
 * @author Maxence Leguede
 * @version 1.1.0
 * @since 1.1.0
 */

on('onResourceStart', (resourceName: string) => {
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
	if (resourceName === GetCurrentResourceName()) {
		TCS = new TcsCore();
		loadTcsModuleInfosFunction.forEach((fnc) => fnc());

		setTimeout(() => onTcsLoadedFunctions.forEach((fnc) => fnc()), 1000);
	}
});
