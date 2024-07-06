export type ICategoriaMovimentacao = {
	id: number | null;
	tipoMovimentacao: string; //POSITIVO ou NEGATIVO
	nomeCategoria: string;
	icone: string;
	corIcone: string;
	googleId: string | null;
}