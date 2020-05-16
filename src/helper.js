export const delegacionEvento = e => {
	let reiniciarValor = false;
	let target = e.target,
		dataset = target.dataset,
		value = dataset.value;

	reiniciarValor = value === undefined ? true : false;

	return reiniciarValor; 
}