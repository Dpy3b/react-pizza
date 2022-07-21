export type CartItemType = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	size: number;
	type: string;
	//totalCount?: number,
	count: number;
};

export interface ICartSliceState {
	totalPrice: number;
	items: CartItemType[];
	totalCount?: number;
}
