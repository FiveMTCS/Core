/**
 * @author Anthony Robert
 * @version 0.1.0
 * @since 0.1.0
 */

import { IItem } from './item.interface';

export const itemsList: Record<string, IItem> = {
    bread: {
        canUse: true,
        name: 'bread',
        weight: 0.2,
        args: {},
    },
};
