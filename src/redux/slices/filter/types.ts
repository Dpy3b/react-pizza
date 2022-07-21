export type SortType = {
	name: string;
	sortProperty: string;
	order: string;
};
export interface IFilterState {
	searchValue: string;
	categoryId: number;
	currentPage: number;
	sort: SortType;
    order: string;
}
