export type IMovimentacao = {
	id: number
	idConta: number;
	valor: number;
	dataMovimentacao: Date;
	tipoMovimentacao: string;
	idCategoriaMovimentacao: number;
	nomeCategoriaMovimentacao: string
}