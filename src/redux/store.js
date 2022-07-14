import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice'; // называем наш слайс как угодно т.к. импорт дефолтный, можно хоть фильтер, хоть фильтерслайс

import cart from './slices/cartSlice'
export const store = configureStore({
	reducer: {
		filter,
cart
	},
});
