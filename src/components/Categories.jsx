import { useState } from 'react';

const Categories = ({ value, onChangeCategory }) => {
	//const [activeIndex, setActiveIndex] = useState(0);

	const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

	/* const onClickCategory = (i) => {
        setActiveIndex(i)
    } */
	return (
		<div className='categories'>
			<ul>
				{categories.map((categoryName, i) => (
					<li
						key={i}
						onClick={() => onChangeCategory(i)}
						className={value === i ? 'active' : ''}
					>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
