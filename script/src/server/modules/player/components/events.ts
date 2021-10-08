/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

(() => {
	onNet('playerJoining', (source: number) => {
		new TcsPlayer(source);
	});
})();
