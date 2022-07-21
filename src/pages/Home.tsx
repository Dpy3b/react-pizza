import { FC, useCallback, useEffect, useRef } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import { SearchContext } from '../App';
import Pagination from '../components/Pagination/Pagination';
import { RootState, useAppDispatch } from '../redux/store';
import '../scss/app.scss';
import { setFilters, setCategoryId, setCurrentPage } from '../redux/slices/filter/slice';
import { fetchPizzas } from '../redux/slices/pizza/asyncActions';
import { SearchPizzaParams } from '../redux/slices/pizza/types';
import { Sort, sortList } from '../components/Sort';
import { selectFilter, selectSort } from '../redux/slices/filter/selectors';
import { SortType } from '../redux/slices/filter/types';
const Home: FC = (/* { searchValue } */) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isSearch = useRef(false);
	const isMounted = useRef(false);

	//const { searchValue } = useContext(SearchContext);
	//const [items, setItems] = useState([]);
	//const [isLoading, setIsLoading] = useState(true);

	//const [categoryId, setCategoryId] = useState(0); // достаем из редакс тулкита через юзселектор

	// я не могу теперь достать из фильтра ещё свойства из вложенных объектов, т.к. типа это должны быть отдельные слайсы по мнению тайпскрипта
/* 	const { categoryId, sortType, order, currentPage, searchValue } = useSelector(
		(state: RootState) => ({
			categoryId: state.filter.categoryId,

			order: state.filter.sort.order,
			sortType: state.filter.sort.sortProperty,
			currentPage: state.filter.currentPage,
			searchValue: state.filter.searchValue,
		})
	); */

	const { categoryId, currentPage, searchValue } = useSelector(selectFilter);
const sort: SortType = useSelector(selectSort)
	const { items, status } = useSelector((state: RootState) => state.pizza);


const onChangeCategory = useCallback((id: number) => {
	dispatch(setCategoryId(id));
}, []);

const onPageChange = (number: number) => {
	dispatch(setCurrentPage(number));
};

	// если был первый рендер, проверяем урл параметры и сохраняем в редаксе
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(
				window.location.search.substring(1)
			) as unknown as SearchPizzaParams;
			/* const sort = sortList.find(
				obj => obj.sortProperty === params.sortType && obj.order === params.order
			); */
			console.log(params)

			dispatch(
				//@ts-ignore
				setFilters({
					/* searchValue: params.search,
					categoryId: Number(params.category),
					currentPage: Number(params.currentPage),
					sort: sort || sortList[0], */
					categoryId,
					//@ts-ignore
					sort,
					order: sort.order,
					currentPage,
					searchValue,
				})
			);
			isSearch.current = true;
		}
	}, []);

	// если был первый недер, то запрашиваем пиццы
	useEffect(() => {
		if (!isSearch.current) {
			getPizzas();
		}
		isSearch.current = false;
	}, [categoryId, sort.sortProperty, searchValue, currentPage, sort.order]);

	// если изменили епараметры и был первый рендер
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortType: sort.sortProperty,
				categoryId,
				currentPage,
				order: sort.order,
			});
			console.log(sort.order)
			navigate(`?${queryString}`);
		}
		isMounted.current = true;

		if (!window.location.search) {
			const sortType = sort.sortProperty
			const order = sort.order
			dispatch(fetchPizzas({ categoryId, sortType, order, currentPage, search }));
		}
	}, [categoryId, sort.sortProperty, currentPage, sort.order]);

	useEffect(() => {
		getPizzas();
	}, []);
	/*
	const [sortType, setSortType] = useState({
		name: 'популярности',
		sort: 'rating',
		order: 'desc',
	});
	 */


	const getPizzas = async () => {
		const sortType = sort.sortProperty;
		const order = sort.order;
		dispatch(fetchPizzas({ categoryId, sortType, order, currentPage, search }));

		//setItems(res.data);
		//setIsLoading(false);
	};
	/* const onChangeSort = sortType => {
		dispatch(setSort(sortType))
	} */
	//const [currentPage, setCurrentPage] = useState(1); // избавились от этого состояния т.к. пихнули его в тулкит

	const search = searchValue ? searchValue : '';

	// бизнес логику пишем не тут
	/* useEffect(() => {
		 fetch(
			`https://62cac4103e924a01285e89b3.mockapi.io/items?${
				categoryId > 0 ? `category=${categoryId}` : ''
			}&sortBy=${sortType}&order=${order}&search=${search}&page=${currentPage}&limit=${4}`
		)
			.then(res => res.json())
			.then(arr => {
				setItems(arr);
				setIsLoading(false);
				//window.scrollTo(0, 0);
			});
	}, [categoryId, sortType, searchValue, currentPage, order]); */

	const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

	const pizzas = items
		/* .filter(obj => {
			if (obj.title.toLowerCase().includes(searchValue)) {
				return true;
			}
			return false;
		})  */ // подобная фильтрация эффективна только при ограниченном кол-ве айтемов при статичном массиве, иначе лучше обращаться через бэк
		.map(({ title, price, imageUrl, sizes, types, id }) => (
			<PizzaBlock
				key={id}
				id={id}
				title={title}
				price={price}
				imageUrl={imageUrl}
				sizes={sizes}
				types={types}
			/>
		));

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort value={sort.sortProperty} /*  onChangeSort={i => setSortType(i)} */ />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			{status === 'error' ? (
				<div>пицц нету</div>
			) : (
				<div className='content__items'>
					{/* isLoading  */ status === 'loading' ? skeletons : pizzas}

					{/* <PizzaBlock title='Жульен' price={550} />
						<PizzaBlock title='C креветками' price={480} /> */}
				</div>
			)}

			<Pagination currentPage={currentPage} onPageChange={onPageChange} />
		</div>
	);
};

export default Home;
