import { FC } from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton:FC = props => (
	<ContentLoader
		className='pizza-block'
		speed={2}
		width={280}
		height={500}
		viewBox='0 0 280 500'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
		{...props}
	>
		<circle cx='138' cy='148' r='125' />
		<rect x='0' y='300' rx='10' ry='10' width='280' height='21' />
		<rect x='0' y='349' rx='10' ry='10' width='280' height='88' />
		<rect x='0' y='455' rx='10' ry='10' width='95' height='30' />
		<rect x='125' y='447' rx='30' ry='30' width='152' height='45' />
	</ContentLoader>
);

export default Skeleton;
