import { useContext, useEffect, useRef } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { sortList } from '../components/Sort';

import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { SearchContext } from '../App';
import Pagination from '../components/Pagination/Pagination';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import '../scss/app.scss';
const Home = (/* { searchValue } */) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = useRef(false);
	const isMounted = useRef(false);

	//const { searchValue } = useContext(SearchContext);
	//const [items, setItems] = useState([]);
	//const [isLoading, setIsLoading] = useState(true);

	//const [categoryId, setCategoryId] = useState(0); // достаем из редакс тулкита через юзселектор
	const { categoryId, sortType, order, currentPage, searchValue } = useSelector(state => ({
		categoryId: state.filter.categoryId,
		sortType: state.filter.sort.sortProperty,
		order: state.filter.sort.order,
		currentPage: state.filter.currentPage,
		searchValue: state.filter.searchValue
	}));

	const { items, status } = useSelector(state => state.pizza);

	// если изменили епараметры и был первый рендер
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sortType,
				categoryId,
				currentPage,
				order,
			});
			navigate(`?${queryString}`);
		}
		isMounted.current = true;

		if (!window.location.search) {
			fetchPizzas();
		}
	}, [categoryId, sortType, currentPage, order]);

	// если был первый рендер, проверяем урл параметры и сохраняем в редаксе
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);
			const order = sortList.find(obj => obj.order === params.order);
			dispatch(
				setFilters({
					...params,
					sort,
					order,
				})
			);
			isSearch.current = true;
		}
		/* if (!window.location.search) {
			fetchPizzas()
		} */
	}, []);

	// если был первый недер, то запрашиваем пиццы
	useEffect(() => {
		if (!isSearch.current) {
			getPizzas();
		}
		isSearch.current = false;
	}, [categoryId, sortType, searchValue, currentPage, order]);

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
	const onChangeCategory = id => {
		dispatch(setCategoryId(id));
	};

	const onPageChange = number => {
		dispatch(setCurrentPage(number));
	};

	const getPizzas = async () => {
		dispatch(fetchPizzas({ categoryId, sortType, order, currentPage, search }));

		//setItems(res.data);
		//setIsLoading(false);
	};
	/* const onChangeSort = sortType => {
		dispatch(setSort(sortType))
	} */
	//const [currentPage, setCurrentPage] = useState(1); // избавились от этого состояния т.к. пихнули его в тулкит

	const search = searchValue ? searchValue : '';

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

	const skeletons = [...new Array(12)].map((_, index) => <Skeleton key={index} />);

	const pizzas = items
		/* .filter(obj => {
			if (obj.title.toLowerCase().includes(searchValue)) {
				return true;
			}
			return false;
		})  */ // подобная фильтрация эффективна только при ограниченном кол-ве айтемов при статичном массиве, иначе лучше обращаться через бэк
		.map(({ title, price, imageUrl, sizes, types, id }) => (
			<Link key={id} to={`/pizza/${id}`}>
				<PizzaBlock
					id={id}
					title={title}
					price={price}
					imageUrl={imageUrl}
					sizes={sizes}
					types={types}
				/>
			</Link>
		));

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort /* value={sortType} onChangeSort={i => setSortType(i)} */ />
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
