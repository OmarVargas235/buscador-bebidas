import React, { useState, useEffect, createContext } from 'react';

export const ModalContext = createContext();

const ModalProvider = props => {

	const [idReceta, guardarIdReceta] = useState(null);
	const [receta, guardarReceta] = useState('');
	const [loadingModal, guardarLoadingModal] = useState(true);

	useEffect(() => {
		if (idReceta === null) return;

		const consultarAPI = async () => {
			const consulta = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`);
			const respuesta = await consulta.json();
			guardarReceta(respuesta.drinks[0]);

			if (consulta.status === 200) guardarLoadingModal(false);
		}

		consultarAPI();
	}, [idReceta])

	return (
		<ModalContext.Provider value={{
			receta,
			loadingModal,
			guardarIdReceta,
			guardarReceta, 
			guardarLoadingModal
		}}>
			{ props.children }
		</ModalContext.Provider>
	)
}

export default ModalProvider;