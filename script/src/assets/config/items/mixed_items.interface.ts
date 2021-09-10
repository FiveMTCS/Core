/**
 * @author Anthony Robert
 * @version 1.1.0
 * @since 1.1.0
 */

interface Item {
	name: string;
	weight: number;
	canUse: boolean;
	count?: number;
	args?: Object;
}
