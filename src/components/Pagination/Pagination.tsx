import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

interface IPaginationProps {
	onPageChange: (page: number) => void; // так пишем, когда функция ничего не возвращает
	currentPage: number;
}

const Pagination: FC<IPaginationProps> = ({ onPageChange, currentPage }) => {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel='...'
			nextLabel='>'
			previousLabel='<'
			pageRangeDisplayed={4}
			pageCount={3}
			forcePage={currentPage - 1}
			/* renderOnZeroPageCount={null} походу лишний проп */
			onPageChange={event => {
				onPageChange(event.selected + 1);
			}}
		/>
	);
};

export default Pagination;
