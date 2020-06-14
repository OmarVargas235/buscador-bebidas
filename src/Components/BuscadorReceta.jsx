import React, { useState, useEffect, useContext } from 'react';
import { RecetaContext } from '../ContextApi/RecetaContext';
import { CategoriaContext } from '../ContextApi/CategoriaContext';

const BuscadorReceta = () => {
	const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
	const { guardarRecetas, guardarLoading } = useContext(RecetaContext);
	const { guardarCategoriaCambio } = useContext(CategoriaContext);

	const [ingrediente, guardarIngrediente] = useState('');
	const [categoria, guardarCategoria] = useState('');
	const [categorias, guardarCategorias] = useState([]);
	const [errorApi, guardarErrorApi] = useState(false);

	useEffect(() => {
		//Se hace la peticion para cargar las diferentes categorias

		const consultarAPI = async () => {
			try {
				const consulta = await fetch(url);
				const respuesta = await consulta.json();
				guardarCategorias(respuesta.drinks);

			} catch(errorApi) {
				console.log(errorApi)
				guardarErrorApi(true);
			}
		}

		consultarAPI();
	}, []);

	const submitBuscarBebida = async e => {
		e.preventDefault();
		
		if (ingrediente === '' || categoria === '') return;
		
		//Cambia el valor del loading, para que se muestre un Spinner mientras se hace el llamado a la API
		guardarLoading(true);

		/*Detecta si hay un cambio de categoria, para poder reiniciar los valores,
		Iniciales y finales de la paginacion*/
		guardarCategoriaCambio(true);
		
		//Consulta a la API que me trae la informacion del coctel.
		const consulta = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}&c=${categoria}`);
		const respuesta = await consulta.json();
		
		/*Si se resuelve la consulta, entonces Se cambia el estado del loading y se deja de mostrar el
		spinner, ademas se guarda la informacion de la consulta de arriba en el estado del contextAPI*/
		if (consulta.status === 200) {
			guardarLoading(false);	
			guardarRecetas(respuesta.drinks);
		}
	}

	return (
		<div className="buscarReceta text-center">
			{ errorApi ? <h3 className="my-5 alert alert-danger text-center">
			Error en el servidor, Por favor intentelo mas tarde</h3> : null }

			<h3 className="my-5">Busca bebidas por Categoria o Ingrediente</h3>

			<form onSubmit={ submitBuscarBebida }>
				<div className="row">
					<div className="form-group col-md-4">
						<input 
							type="text"
							placeholder="Buscar por ingrediente, ejem: tequila"
							className="form-control ingrediente"
							onChange={e => guardarIngrediente(e.target.value)}
						/>
					</div>
					
					<div className="form-group col-md-4">
						<select 
							className="select custom-select"
							onChange={ e => guardarCategoria(e.target.value) }
						>
							<option value="">-- Selecciona Categoria --</option>
							{
								categorias.map((element, index) => (
									<option 
										value={element.strCategory}
										key={index}
									>{element.strCategory}</option>
								))
							}
						</select>
					</div>
					
					<div className="col-md-4">
						<input 
							type="submit" 
							value="Buscar Bebidas" 
							className="btn btn-danger btn-block" 
						/>
					</div>
				</div>
			</form>
		</div>
	)
}

export default BuscadorReceta;
