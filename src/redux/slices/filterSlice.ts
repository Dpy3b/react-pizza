import { createSlice, PayloadAction } from '@reduxjs/toolkit';


/* export interface IRootState {
	searchValue: string
	categoryId: number
	currentPage: number
	sort: {
		name: string
		sortProperty: string
		desc: string
	}
}



 */


export type SortBy = {
	name: string;
	sortProperty: string;
	order: string;
};
export interface IFilterState {
	searchValue: string;
	categoryId: number;
	currentPage: number;
	sort: SortBy | undefined;
	order: string;
}

const initialState: IFilterState = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности',
		sortProperty: 'rating',
		order: 'desc',
	},
	order: 'desc'
};

export const filterSlice = createSlice({
	// очевидно этот метод создаст нам слайс который будет хранить в себе настройки
	name: 'filter',
	initialState, // то же, что и initialState: initialState, деструктуризация ЕПТА
	reducers: {
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload;
		},
		setSort(state, action: PayloadAction<SortBy>) {
			state.sort = action.payload;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setFilters(state, action: PayloadAction<IFilterState>) {
			state.currentPage = Number(action.payload.currentPage);
			state.sort = action.payload.sort;
			state.categoryId = Number(action.payload.categoryId);
			state.order = action.payload.order
		},
	},
});

// ВОТ ТУТ МОЖНО ДОБАВАИТ СЕЛЕКТОРЫ ПО ЖЕЛАНИЮ

// Action creators are generated for each case reducer function
export const { setCategoryId, setSort , setCurrentPage, setFilters, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer;
