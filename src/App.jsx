import React from 'react';
import Header from './Components/Header';
import BuscadorReceta from './Components/BuscadorReceta';
import MostrarRecetas from './Components/MostrarRecetas';

import RecetaProvider from './ContextApi/RecetaContext';
import CategoriaProvider from './ContextApi/CategoriaContext';
import ModalProvider from './ContextApi/ModalContext';

const App = () => {

	return (
		<RecetaProvider>
			<CategoriaProvider>
				<ModalProvider>
					<Header />

					<div className="container">
						<BuscadorReceta />
						<MostrarRecetas />
					</div>
				</ModalProvider>
			</CategoriaProvider>
		</RecetaProvider>
	)
}

export default App;