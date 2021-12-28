/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

interface IPunishment {
    type: 'ban' | 'kick' | 'warn';
    playerId: string;
    timestamp: number;
    sender: string;
    reason: string;
    note?: string;
}

export default IPunishment;
