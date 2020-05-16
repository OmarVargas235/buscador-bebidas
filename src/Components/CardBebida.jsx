import React, { useContext } from 'react';
import VentanaModal from './VentanaModal';

import { ModalContext } from '../ContextApi/ModalContext';

const CardBebida = ({ receta }) => {
	
	const { guardarIdReceta } = useContext(ModalContext);

	return (
		<div className="card">
			<h3 className="font-weight-bold m-3">{receta.strDrink}</h3>
			
			<img src={receta.strDrinkThumb} alt={receta.strDrinkThumb} 
			className="card-img-top" />
		
			<div className="card-body">
				<button 
					className="btn btn-block btn-color-receta text-light" 
					data-toggle="modal"
					data-target="#recetaModal"
					data-value="modal-abierto"
					onClick={ () => guardarIdReceta(receta.idDrink) }
				>Ver Receta</button>

				<VentanaModal />
			</div>
		</div>
	)
}

export default CardBebida;