//import { createContext, useState } from 'react';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
//import Cart from './pages/Cart';
//import FullPizza from './pages/FullPizza';
import Home from './pages/Home';
//import NotFound from './pages/NotFound';
import './scss/app.scss';

// export const SearchContext = createContext();

const FullPizza = lazy(() => import(/* webpackChunkName: "FullPizza" */'./pages/FullPizza'))
const NotFound = lazy(()=> import('./pages/NotFound'))
const Cart = lazy(()=> import('./pages/Cart'))

function App() {
	//const [searchValue, setSearchValue] = useState('') // контекст ниже нам уже не нужен
	return (
		<div className='wrapper'>
			{/* <SearchContext.Provider
				value={{
					searchValue,
					setSearchValue,
				}}
			> */}{' '}
			<Header />
			{/* комонент провайдер у объекта контекста, помещаем сюда все что нам нужно глобально */}
			{/* searchValue={searchValue} setSearchValue={setSearchValue} */}
			{/* теперь не передаем сюда эти пропсы, потом вытянем их из контекста */}
			<div className='content'>
				<Routes>
					<Route path='/' element={<Home /* searchValue={searchValue} */ />} />
					<Route
						path='/cart'
						element={
							<Suspense fallback={<div>Загрузка</div>}>
								<Cart />
							</Suspense>
						}
					/>
					<Route
						path='/pizza/:id'
						element={
							<Suspense fallback={<div>Загрузка</div>}>
								<FullPizza />
							</Suspense>
						}
					/>

					<Route
						path='*'
						element={
							<Suspense fallback={<div>Загрузка</div>}>
								<NotFound />
							</Suspense>
						}
					/>
				</Routes>
			</div>
			{/*  */}
		</div>
	);
}

export default App;
