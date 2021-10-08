/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

const TCS: TcsCore = new TcsCore();
exports('getCore', () => TCS);

onNet('onClientMapStart', () => {
	//@ts-ignore
	exports.spawnmanager.setAutoSpawn(true);

	//@ts-ignore
	exports.spawnmanager.forceRespawn();
});

var firstSpawn = false;
onNet('playerSpawned', () => {
	if (GetCurrentResourceName() === 'tcs' && !firstSpawn) {
		firstSpawn = true;
	}
});
