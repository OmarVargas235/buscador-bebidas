import React, { useState, createContext } from 'react';

export const CategoriaContext = createContext();

const CategoriaProvider = props => {

	const [categoriaCambio, guardarCategoriaCambio] = useState(false);

	return (
		<CategoriaContext.Provider value={{
			categoriaCambio,
			guardarCategoriaCambio
		}}>
			{ props.children }
		</CategoriaContext.Provider>
	)
}

export default CategoriaProvider;