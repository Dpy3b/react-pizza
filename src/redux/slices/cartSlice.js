import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
			state.totalPrice = state.totalPrice + action.payload.price;
		},
		removeItem(state, action) {
			state.items.filter(obj => obj.id !== action.payload);
		},
		clearItems(state, action) {
			state.items = [];
		},
	},
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
