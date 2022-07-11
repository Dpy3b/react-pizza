import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

import '../scss/app.scss';

const Home = () => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [categoryId, setCategoryId] = useState(0);
	const [sortType, setSortType] = useState({ name: 'популярности', sort: 'rating', order: 'desc' });

	useEffect(() => {
		setIsLoading(true);
		fetch(
			`https://62cac4103e924a01285e89b3.mockapi.io/items?${
				categoryId > 0 ? `category=${categoryId}` : ''
			}&sortBy=${sortType.sort}&order=${sortType.order}`
		)
			.then(res => res.json())
			.then(arr => {
				setItems(arr);
				setIsLoading(false);
				window.scrollTo(0, 0);
			});
	}, [categoryId, sortType]);
	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onClickCategory={i => setCategoryId(i)} />
				<Sort value={sortType} onChangeSort={i => setSortType(i)} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading
					? [...new Array(12)].map((_, index) => <Skeleton key={index} />)
					: items.map(({ title, price, imageUrl, sizes, types, id }) => (
							<PizzaBlock
								key={id}
								title={title}
								price={price}
								imageUrl={imageUrl}
								sizes={sizes}
								types={types}
							/>
					  ))}

				{/* <PizzaBlock title='Жульен' price={550} />
						<PizzaBlock title='C креветками' price={480} /> */}
			</div>
		</div>
	);
};

export default Home;
