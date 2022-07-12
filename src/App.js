import Header from './components/Header';
import Home from './pages/Home';
import { BrowserRouter as Router, Switch, Route, Routes, Link } from 'react-router-dom';
import './scss/app.scss';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import { useState } from 'react';
import { createContext } from 'react';

const SearchContext = createContext()

function App() {

	const [searchValue, setSearchValue] = useState('')
	return (
		<div className='wrapper'>
			<SearchContext.Provider value={{searchValue, setSearchValue}}> {/* комонент провайдер у объекта контекста, помещаем сюда все что нам нужно глобально */}
				<Header searchValue={searchValue} setSearchValue={setSearchValue} />
				<div className='content'>
					<Routes>
						<Route path='/' element={<Home searchValue={searchValue} />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</div>
			</SearchContext.Provider>
		</div>
	);
}

export default App;
