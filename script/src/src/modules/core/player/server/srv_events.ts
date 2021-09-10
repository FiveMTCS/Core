/**
 * @author Maxence Leguede
 * @version 1.1.0
 * @since 1.1.0
 */

(() => {
	onNet('playerJoining', (source: number) => {
		new TcsPlayer(source);
	});
})();
