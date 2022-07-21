import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchPizzas } from "./asyncActions";
import { FetchPizzasArgs, Pizza, PizzaSliceState } from "./types";

export enum Status {
	LOADING = 'loading',
	SUCCSESS = 'success',
	ERROR = 'error',
}

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
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


// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
