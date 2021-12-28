/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

import IPunishment from './punishment.interace';

interface IPunishmentsList {
    warns: IPunishment[];
    kicks: IPunishment[];
    bans: IPunishment[];
}

export default IPunishmentsList;
