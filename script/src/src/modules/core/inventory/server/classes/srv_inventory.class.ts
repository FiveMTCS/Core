/**
 * @author Anthony Robert
 * @version 1.1.0
 * @since 1.1.0
 */

class TcsInventory {
	private inventory: Array<Item>;
	private maxInventoryWeight: number;

	constructor(maxInventoryWeight: number) {
		this.inventory = [];
		this.maxInventoryWeight = maxInventoryWeight;
	}

	/**
	 * Gives the player an amount of an item
	 * @param item Item
	 * @param qty number
	 * @returns boolean
	 */
	addItem(item: Item, qty: number): boolean {
		const futureWeight = this.getTotalWeight() + item.weight * qty;
		if (futureWeight <= this.maxInventoryWeight) {
			const itemFound = this.inventory.find(
				(index) => index.name === item.name
			);
			if (itemFound) {
				if (this.equals(itemFound.args, item.args)) {
					if (itemFound.count) itemFound.count += qty;
				} else {
					item.count = qty;
					this.inventory.push(item);
					return true;
				}
			} else {
				item.count = qty;
				this.inventory.push(item);
				return true;
			}
		}
		return false;
	}

	/**
	 * Removes an amount of an item from inventory
	 * @param item Item
	 * @param qty number
	 * @returns boolean
	 */
	removeItem(item: Item, qty: number): boolean {
		let count = qty;
		const possessedCount = this.getItemCount(item);
		if (possessedCount >= qty) {
			this.inventory.forEach((element, index) => {
				if (count > 0) {
					if (element.name === item.name) {
						this.inventory.splice(index, 1);
						count--;
					}
				}
			});
			return true;
		}
		return false;
	}

	/**
	 * Returns if the player has an item in his inventory
	 * @param item
	 * @returns
	 */
	haveItemInInventory(item: Item): boolean {
		if (this.inventory.find((index) => index.name === item.name)) {
			return true;
		}
		return false;
	}

	/**
	 * Get the count of different items that countains an inventory
	 * @returns number
	 */
	getNbOfItems(): number {
		return this.inventory.length;
	}

	/**
	 * Returns the weight of an inventory
	 * @returns number
	 */
	getTotalWeight(): number {
		let count = 0;
		this.inventory.forEach((item) => {
			count += item.weight;
		});
		return count;
	}

	/**
	 *  Get the count of an item in the inventory
	 * @param item Item
	 * @returns number
	 */
	getItemCount(item: Item): number {
		return this.inventory.filter((index) => index.name === item.name).length;
	}

	private equals (a: any, b: any): boolean {
		if(a.length !== b.length) return false;
		const uniqueValues = new Set([...a, ...b]);
		for(const v of uniqueValues) {
			const aCount = a.filter((e: any) => e === v).length;
			const bCount = b.filter((e: any) => e === v).length;
			if(aCount !== bCount) return false;
		}
		return true;
	}
}
