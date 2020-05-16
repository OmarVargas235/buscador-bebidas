import React, { useState, useEffect, useContext } from 'react';
import CardBebida from './CardBebida';
import Spinner from './Spinner';

import { RecetaContext } from '../ContextApi/RecetaContext';
import { CategoriaContext } from '../ContextApi/CategoriaContext';

const MostrarReceta = () => {

	const { recetas, loading } = useContext(RecetaContext);
	const { categoriaCambio, guardarCategoriaCambio } = useContext(CategoriaContext);

	const up = document.querySelector('h2'); 
	document.documentElement.style.scrollBehavior = "smooth"; //Efecto smooth

	const [inicial, guardarInicial] = useState(0);
	const [final, guardarFinal] = useState(0);
	const [recetasLocal, guardarrecetasLocal] = useState([]);

	let mensaje = recetas.length === 0 ? '' : 'Listado';

	useEffect(() => {
		console.log(recetas.length);

		const paginacion = () => {
			const copiaRecetas = [];
			
			//Si la categoria cambia se reinicia los valores iniciales y finales
			if (categoriaCambio) {
				guardarInicial(0);
				guardarFinal(15);
			}
			
			if (recetas.length > 0) {
				for (let i = inicial; i < final; i++) {
					copiaRecetas.push(recetas[i]);
				} 
			}

			guardarrecetasLocal(copiaRecetas);
			guardarCategoriaCambio(false);
		}
		
		recetas.length > 15 ? paginacion() : guardarrecetasLocal(recetas);

	}, [recetas, final, inicial, categoriaCambio, guardarCategoriaCambio]);

	const paginaAtras = () => {
		if (recetas.length === final) {
			guardarInicial(inicial - 15);
			guardarFinal(recetas.length - (final - inicial));

		} else {
			guardarInicial(inicial - 15);
			guardarFinal(final - 15);
		}

		window.scrollTo(0, up.getBoundingClientRect().top + window.scrollY); //Efecto smooth
	}

	const paginaSiguiente = () => { 
		if (final <= recetas.length && (recetas.length - final) > 15) {
			guardarInicial(final);
			guardarFinal(final + 15);

		} else {
			guardarInicial(final);
			guardarFinal(final + (recetas.length - final));
		}
		
		window.scrollTo(0, up.getBoundingClientRect().top + window.scrollY); //Efecto smooth
	}

	return (
		<React.Fragment>
			<h2 className="text-center mb-3">{ mensaje }</h2>

			{
				loading ? <Spinner />
				: <React.Fragment> 
					<div className="card-columns">
							{		
								recetasLocal.map(element => (
									<CardBebida 
										key={element.idDrink}
										receta={element}
									/>
								))
							}
					</div>

					{
						recetas.length > 15
						? <div className="botones d-flex justify-content-center my-3">
							{
								inicial === 0 ? null : <span className="btn btn-primary mr-3" onClick={paginaAtras}>Atras</span>
							}

							{
								recetas.length === Math.floor(final) ? null : <span className="btn btn-primary" onClick={paginaSiguiente}>Siguiente</span>
							}
						</div> : null
					}
				</React.Fragment>
			}
		</React.Fragment>
	)
}

export default MostrarReceta;