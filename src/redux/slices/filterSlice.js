import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности',
		sortProperty: 'rating',
		order: 'desc',
	},
};

export const filterSlice = createSlice({
	// очевидно этот метод создаст нам слайс который будет хранить в себе настройки
	name: 'filter',
	initialState, // то же, что и initialState: initialState, деструктуризация ЕПТА
	reducers: {
		setCategoryId(state, action) {
			state.categoryId = action.payload;
		},
		setSort(state, action) {
			state.sort = action.payload;
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSort , setCurrentPage} = filterSlice.actions;

export default filterSlice.reducer;
