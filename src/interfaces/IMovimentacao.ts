export type IMovimentacao = {
	id?: number;
	googleId: string | null;
	valor: number;
	dataMovimentacao: Date;
	tipoMovimentacao: string;
	idCategoriaMovimentacao: number;
	nomeCategoriaMovimentacao?: string;
	descricaoMovimentacao: string;
}