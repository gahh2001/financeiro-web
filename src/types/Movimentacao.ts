export type Movimentacao = {
	id?: number;
	valor: number;
	dataMovimentacao: Date;
	tipoMovimentacao: string;
	idCategoriaMovimentacao: number;
	nomeCategoriaMovimentacao?: string;
	descricaoMovimentacao: string;
	icone: string;
	corIcone: string;
}