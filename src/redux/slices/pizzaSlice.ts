import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

// omit imports and state <CartItem[], Record<string, string>>

type FetchPizzasArgs = {
	categoryId: number;
	sortType: string;
	order: string;
	currentPage: number;
	search: string;
};

//type FetchPizzasArgs = Record<string, string>

type Pizza = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
	rating?: number;
};

export enum Status {
	LOADING = 'loading',
	SUCCSESS = 'success',
	ERROR = 'error',
}

interface PizzaSliceState {
	items: Pizza[];
	status: Status;
}

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
};

export type SearchPizzaParams = {
	sortBy: string;
	order: string;
	categoryId: number;
	searchValue: string;
	currentPage: number;
	sortProperty: string;
};

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>( // returned and thunkArg
	'pizza/fetchPizzasStatus',
	async ({ categoryId, sortType, order, currentPage, search } /* : FetchPizzasArgs */) => {
		//{ categoryId, sortType, order, currentPage, search } = params;
		// в строке указываем название для асинхронного экшна
		const { data } = await axios.get<Pizza[]>(
			`https://62cac4103e924a01285e89b3.mockapi.io/items?${
				categoryId > 0 ? `category=${categoryId}` : ''
			}&sortBy=${sortType}&order=${order}&search=${search}&page=${currentPage}&limit=${4}`
		);

		return data; // as CartItem[];
	}
);

export const pizzaSlice = createSlice({
	// очевидно этот метод создаст нам слайс который будет хранить в себе настройки
	name: 'pizza',
	initialState, // то же, что и initialState: initialState, деструктуризация ЕПТА
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchPizzas.pending, (state, action) => {
			state.status = Status.LOADING;
			state.items = [];
		});

		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCSESS;
		});

		builder.addCase(fetchPizzas.rejected, (state, action) => {
			state.status = Status.ERROR;
			state.items = [];
		});
	},
	/* [fetchPizzas.pending]: (state, action) => {
			state.status = 'loading';
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			console.log('всё ок');
			state.items = action.payload;
			state.status = 'success';
		},
		[fetchPizzas.rejected]: (state, action) => {
			console.log('была ошибка');
			state.status = 'error';
			state.items = [];
		}, */
});

export const selectPizzaData = (state: RootState) => state.pizza;

// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
