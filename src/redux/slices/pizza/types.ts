import { Status } from './slice';
export type FetchPizzasArgs = {
	categoryId: number;
	sortType: string;
	order: string;
	currentPage: number;
	search: string;
};

//type FetchPizzasArgs = Record<string, string>

export type Pizza = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
	rating?: number;
};


export type SearchPizzaParams = {
	category: string;
	search: string;
	sortType: string;
	currentPage: string;
	order: string;
};

export interface PizzaSliceState {
	items: Pizza[];
	status: Status;
}