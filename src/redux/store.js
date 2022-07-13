import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice'; // называем наш слайс как угодно т.к. импорт дефолтный, можно хоть фильтер, хоть фильтерслайс

export const store = configureStore({
	reducer: {
		filter,
	},
});
