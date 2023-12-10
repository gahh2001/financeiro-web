export type ICategoriaMovimentacao = {
	id: number;
	tipoMovimentacao: number; //POSITIVO ou NEGATIVO
	nomeCategoria: string;
	idConta: number;
}