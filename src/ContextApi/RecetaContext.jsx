import React, { useState, createContext } from 'react';

export const RecetaContext = createContext();

const RecetaProvider = props => {

	const [recetas, guardarRecetas] = useState([]);
	const [loading, guardarLoading] = useState(false);

	return (
		<RecetaContext.Provider value = {{
			recetas,
			loading,
			guardarRecetas,
			guardarLoading
		}}>
			{ props.children }
		</RecetaContext.Provider>
	)
}

export default RecetaProvider;