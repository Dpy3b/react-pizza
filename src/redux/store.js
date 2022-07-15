import { configureStore } from '@reduxjs/toolkit';
import cart from './slices/cartSlice';
import filter from './slices/filterSlice'; // называем наш слайс как угодно т.к. импорт дефолтный, можно хоть фильтер, хоть фильтерслайс
import pizza from './slices/pizzaSlice';

export const store = configureStore({
	reducer: {
		filter,
		cart,
		pizza,
	},
});
