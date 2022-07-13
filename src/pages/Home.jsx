import { useContext, useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SearchContext } from '../App';
import Pagination from '../components/Pagination/Pagination';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import '../scss/app.scss';
const Home = (/* { searchValue } */) => {
	const dispatch = useDispatch();
	const { searchValue } = useContext(SearchContext);
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	//const [categoryId, setCategoryId] = useState(0); // достаем из редакс тулкита через юзселектор
	const { categoryId, sortType, order, currentPage } = useSelector(state => ({
		categoryId: state.filter.categoryId,
		sortType: state.filter.sort.sortProperty,
		order: state.filter.sort.order,
		currentPage: state.filter.currentPage
	}));
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
	}

	/* const onChangeSort = sortType => {
		dispatch(setSort(sortType))
	} */
	//const [currentPage, setCurrentPage] = useState(1); // избавились от этого состояния т.к. пихнули его в тулкит

	const search = searchValue ? searchValue : '';

	useEffect(() => {
		setIsLoading(true);
		/* fetch(
			`https://62cac4103e924a01285e89b3.mockapi.io/items?${
				categoryId > 0 ? `category=${categoryId}` : ''
			}&sortBy=${sortType}&order=${order}&search=${search}&page=${currentPage}&limit=${4}`
		)
			.then(res => res.json())
			.then(arr => {
				setItems(arr);
				setIsLoading(false);
				//window.scrollTo(0, 0);
			}); */
		axios
			.get(
				`https://62cac4103e924a01285e89b3.mockapi.io/items?${
					categoryId > 0 ? `category=${categoryId}` : ''
				}&sortBy=${sortType}&order=${order}&search=${search}&page=${currentPage}&limit=${4}`
			)
			.then(res => {
				setItems(res.data);
				setIsLoading(false);
			});
	}, [categoryId, sortType, searchValue, currentPage]);

	const skeletons = [...new Array(12)].map((_, index) => <Skeleton key={index} />);

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
				<Sort /* value={sortType} onChangeSort={i => setSortType(i)} */ />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading ? skeletons : pizzas}

				{/* <PizzaBlock title='Жульен' price={550} />
						<PizzaBlock title='C креветками' price={480} /> */}
			</div>
			<Pagination currentPage={currentPage} onPageChange={onPageChange} />
		</div>
	);
};

export default Home;
