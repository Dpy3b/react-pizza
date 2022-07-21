import { FC, memo, MouseEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../redux/slices/filter/slice';
import { RootState } from '../redux/store';


export type SortItem = {
	id: number
	name: string;
	sortProperty: string
	order: string;
};

type PopupClick = MouseEvent & {
	path: Node[]
};

export const sortList: SortItem[] = [
	{ id: 0, name: 'популярности (по убыванию)', sortProperty: 'rating', order: 'desc' },
	{ id: 1, name: 'популярности (по возрастанию)', sortProperty: 'rating', order: 'asc' },
	{ id: 2, name: 'цене (по убыванию)', sortProperty: 'price', order: 'desc' },
	{ id: 3, name: 'цене (по возрастанию)', sortProperty: 'price', order: 'asc' },
	{ id: 4, name: 'алфавиту (по убыванию)', sortProperty: 'title', order: 'desc' },
	{ id: 5, name: 'алфавиту (по возрастанию)', sortProperty: 'title', order: 'asc' },
];

type SortProps = {
	value: string
}

export const Sort: FC< SortProps > = memo((/* { value, onChangeSort } */{ value}) => {
	const dispatch = useDispatch();
	const sort = useSelector((state: RootState) => state.filter.sort);

	const sortRef = useRef<HTMLDivElement>(null); // нужно либо нулл либо хтмл див елемент

	const [open, setOpen] = useState(false);
	//const [selected, setSelected] = useState(0);

	//const sortName = list[value].name;

	const onClickListItem = (obj: SortItem) => {
		//setSelected(i)
		/* onChangeSort(i) */ dispatch(setSort(obj));
		setOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const _event = event as PopupClick;

			if (sortRef.current && !_event.path.includes(sortRef.current)) {
				setOpen(false);
			}
		};
		// @ts-ignore
		document.body.addEventListener('click', handleClickOutside);
		// @ts-ignore
		return () => document.body.removeEventListener('click', handleClickOutside);
	}, []);

	return (
		<div ref={sortRef} className='sort'>
			<div className='sort__label'>
				<svg
					width='10'
					height='6'
					viewBox='0 0 10 6'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
						fill='#2C2C2C'
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={() => setOpen(!open)}>{/* value.name */ sort.name}</span>
			</div>
			{open && (
				<div className='sort__popup'>
					<ul>
						{sortList.map((obj, i) => (
							<li
								key={i}
								onClick={() => onClickListItem(obj)}
								className={sort.sortProperty === obj.sortProperty ? 'active' : ''}
							>
								{obj.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
});
