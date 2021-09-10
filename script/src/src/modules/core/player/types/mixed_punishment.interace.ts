/**
 * @author Maxence Leguede
 * @version 1.1.0
 * @since 1.1.0
 */

interface TcsPunishment {
	type: 'ban' | 'kick' | 'warn';
	playerId: string;
	timestamp: number;
	sender: string;
	reason: string;
	note?: string;
}
