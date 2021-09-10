/**
 * @author Maxence Leguede
 * @version 1.1.0
 * @since 0.1.0
 */

var TCS: TcsCore;
var onTcsLoadedFunctions: Function[] = [];
var onLoadModuleFunctions: Record<string, Function[]> = {};
var loadTcsModuleInfosFunction: Function[] = [];

var onLoadModule = (moduleName: string, fnc: Function) => {
	if (TCS != null) {
		fnc();
		return;
	}

	if (!onLoadModuleFunctions[moduleName])
		onLoadModuleFunctions[moduleName] = [];

	onLoadModuleFunctions[moduleName].push(fnc);
};

var onTcsLoaded = (fnc: Function) => {
	if (TCS != null) {
		fnc();
		return;
	}
	onTcsLoadedFunctions.push(fnc);
};

var loadTcsModuleInfos = (fnc: Function) => {
	if (TCS != null) {
		fnc();
		return;
	}
	loadTcsModuleInfosFunction.push(fnc);
};

exports('loadTcsModuleInfos', loadTcsModuleInfos);
exports('onTcsLoaded', onTcsLoaded);
exports('getCore', () => {
	return TcsCore.bind(TCS);
});
exports(
	'addExternalModuleToGame',
	(moduleInfos: TcsModuleInfos | null, onInit: Function) => {
		TCS.modules.addModuleToGame(new TcsModule(moduleInfos, onInit));
	}
);
