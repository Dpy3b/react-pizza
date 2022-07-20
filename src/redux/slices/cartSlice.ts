import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';


/* export interface ICartState {
	totalPrice: number;
	items: [];
	totalCount: number;
}
 */


export type CartItemType = {
	id: string,
	title: string,
	price: number,
	imageUrl: string,
	size: number,
	type: string,
	//totalCount?: number,
	count: number
}

interface ICartSliceState {
	totalPrice: number;
	items: CartItemType[];
	totalCount?: number;
}

const initialState: ICartSliceState = {
	totalPrice: 0,
	items: [],

};

export const cartSlice = createSlice({
	// очевидно этот метод создаст нам слайс который будет хранить в себе настройки
	name: 'cart',
	initialState, // то же, что и initialState: initialState, деструктуризация ЕПТА
	reducers: {
		addItem(state, action) {
			/* state.items.push(action.payload)
            state.totalPrice = state.totalPrice + action.payload.price; */
			const findItem = state.items.find(obj => obj.id === action.payload.id);
			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({ ...action.payload, count: 1 });
			}
			state.totalPrice = state.items.reduce((sum, item) => {
				return item.price * item.count + sum;
			}, 0);
			state.totalCount = state.items.reduce((sum, item) => item.count + sum, 0);
		},
		minusItem(state, action) {
			const findItem = state.items.find(obj => obj.id === action.payload.id);
			if (findItem) {
				findItem.count--;
			}
			state.totalPrice = state.items.reduce((sum, item) => {
				return state.totalPrice - item.price;
			}, 0);
		},
		removeItem(state, action) {
			state.items.filter(obj => obj.id !== action.payload);
		},

		clearItems(state, action) {
			state.items = [];
			state.totalCount = 0;
			state.totalPrice = 0
		},
	},
});

export const selectCart = (state: RootState) => state.cart
export const selectCartTotalPrice = (state: RootState) => state.cart.totalPrice

// Action creators are generated for each case reducer function
export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
