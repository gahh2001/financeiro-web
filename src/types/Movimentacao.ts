export type Movimentacao = {
	id?: number;
	googleId: string | null;
	valor: number;
	dataMovimentacao: Date;
	tipoMovimentacao: string;
	idCategoriaMovimentacao: number;
	nomeCategoriaMovimentacao?: string;
	descricaoMovimentacao: string;
	icone: string;
	corIcone: string;
}