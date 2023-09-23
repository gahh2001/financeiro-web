export type IMovimentacao = {
	idConta: number;
	valor: number;
	dataMovimentacao: Date;
	tipoMovimentacao: string;
	idCategoriaMovimentacao: number;
}