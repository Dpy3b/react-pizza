import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
const Pagination = ({ onPageChange }) => {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel='...'
			nextLabel='>'
			previousLabel='<'
			pageRangeDisplayed={4}
			pageCount={3}
			renderOnZeroPageCount={null}
			onPageChange={event => {
				onPageChange(event.selected + 1);
			}}
		/>
	);
};

export default Pagination;
