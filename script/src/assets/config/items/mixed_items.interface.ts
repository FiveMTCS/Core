/**
 * @author Anthony Robert
 * @version 0.1.0
 * @since 0.1.0
 */

interface Item {
	name: string;
	weight: number;
	canUse: boolean;
	count?: number;
	args?: Object;
}
