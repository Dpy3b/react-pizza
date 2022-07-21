import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cart from './slices/cart/slice';
import filter from './slices/filter/slice'; // называем наш слайс как угодно т.к. импорт дефолтный, можно хоть фильтер, хоть фильтерслайс
import pizza from './slices/pizza/slice';

export const store = configureStore({
	reducer: {
		filter,
		cart,
		pizza,
	},
});


export type RootState = ReturnType<typeof store.getState>



export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
