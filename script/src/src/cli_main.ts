/**
 * @author Maxence Leguede
 * @version 1.1.0
 * @since 1.1.0
 */

onNet('onClientMapStart', () => {
	//@ts-ignore
	exports.spawnmanager.setAutoSpawn(true);

	//@ts-ignore
	exports.spawnmanager.forceRespawn();
});

function loadTCS() {
	TCS = new TcsCore();

	loadTcsModuleInfosFunction.forEach((fnc) => fnc());

	setTimeout(() => onTcsLoadedFunctions.forEach((fnc) => fnc()), 1000);
}

var firstSpawn = false;
onNet('playerSpawned', () => {
	if (GetCurrentResourceName() === 'tcs' && !firstSpawn) {
		firstSpawn = true;
		loadTCS();
	}
});

(() => {
	setTimeout(() => {
		if (TCS_CONFIG.debugMode) {
			loadTCS();
		}
	}, 5000);
})();
