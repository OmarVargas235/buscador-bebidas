import React, { useEffect, useContext } from 'react';
import Spinner from './Spinner';
import { delegacionEvento } from '../helper';
import { ModalContext } from '../ContextApi/ModalContext';

const VentanaModal = () => {

	const { receta, loadingModal, guardarReceta, guardarLoadingModal } = useContext(ModalContext);
	
	useEffect(() => {
		if (receta === '') return;

		const body = document.querySelector('body');

		body.addEventListener('click', e => {
			/*Si el usuario hace click fuera del modal, la funcion delegacionEvento(e) me retorna un true
			y me limpia el state de la receta que se obtiene del contextAPI*/
			if (delegacionEvento(e)) {
				guardarReceta('');
				guardarLoadingModal(true);
			}
		});
	}, [receta, guardarReceta, guardarLoadingModal])

	const listaIgredientesCantidades = () => {
		let ingredientes = [];
		
		for (let i = 1; i < 16; i++) {
			if (receta[`strIngredient${i}`] !== null) {
				ingredientes.push(
					<li data-value="modal-abierto" key={i}> 
					{ receta[`strIngredient${i}`] } { receta[`strMeasure${i}`] } </li>
				)
			}
		}

		return ingredientes;
	}
	
	return (
		<div id="recetaModal" className="modal fade" tabIndex="-1" role="dialog"
				aria-labelledby="modal" aria-hidden="true">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
				 	<div className="modal-header d-block d-sm-none">
				        <button type="button" className="close" data-dismiss="modal">&times;</button>
				    </div>

					<div className="modal-body" data-value="modal-abierto">
						<h2 className="modal-title mb-2 font-weight-bold" data-value="modal-abierto">
						{receta.strDrink}</h2>

						<h3 className="font-weight-bold mt-4" data-value="modal-abierto">Instrucciones</h3>
						<p data-value="modal-abierto">{receta.strInstructions}</p>
						
						{
							loadingModal ? <Spinner />
							: <img data-value="modal-abierto" src={receta.strDrinkThumb} alt={receta.strDrink} className="my-4 img-fluid" />
						}

						<h3 data-value="modal-abierto" className="font-weight-bold">Ingredientes y  cantidades</h3>

						{ receta === '' ? null 
							: <ul data-value="modal-abierto">
								{ listaIgredientesCantidades() }
							</ul>  
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default VentanaModal;