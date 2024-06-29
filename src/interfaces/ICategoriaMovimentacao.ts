export type ICategoriaMovimentacao = {
	id: number;
	tipoMovimentacao: string; //POSITIVO ou NEGATIVO
	nomeCategoria: string;
	idConta: number;
	simbolo: string;
	corSimbolo: string;
}