export type CategoriaMovimentacao = {
	id: number | null;
	tipoMovimentacao: string; //POSITIVO ou NEGATIVO
	nomeCategoria: string;
	icone: string;
	corIcone: string;
	valorPadrao: number;
}