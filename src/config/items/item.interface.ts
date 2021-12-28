/**
 * @author Anthony Robert
 * @version 0.1.0
 * @since 0.1.0
 */

export interface IItem {
    name: string;
    weight: number;
    canUse: boolean;
    count?: number;
    args?: unknown;
}
