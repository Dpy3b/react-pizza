import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, FetchPizzasArgs } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>( // returned and thunkArg
	'pizza/fetchPizzasStatus',
	async (params /* : FetchPizzasArgs */) => {
		const { categoryId, sortType, order, currentPage, search } = params;
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
