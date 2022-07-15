import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// omit imports and state

export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzasStatus',
	async ({ categoryId, sortType, order, currentPage, search }) => {
		// в строке указываем название для асинхронного экшна
		const { data } = await axios.get(
			`https://62cac4103e924a01285e89b3.mockapi.io/items?${
				categoryId > 0 ? `category=${categoryId}` : ''
			}&sortBy=${sortType}&order=${order}&search=${search}&page=${currentPage}&limit=${4}`
		);
		return data;
	}
);
const initialState = {
	items: [],
	status: 'loading',
};

export const pizzaSlice = createSlice({
	// очевидно этот метод создаст нам слайс который будет хранить в себе настройки
	name: 'pizza',
	initialState, // то же, что и initialState: initialState, деструктуризация ЕПТА
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: {
		[fetchPizzas.pending]: (state, action) => {
			state.status = 'loading';
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			console.log('всё ок');
			state.items = action.payload;
			state.status = 'success'
		},
		[fetchPizzas.rejected]: (state, action) => {
			console.log('была ошибка');
			state.status = 'error'
			state.items = []
		},
	},
});

// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
