export type Planejamento = {
	id?: number;
	ativo: boolean;
	categorias: number[];
	dataFim: Date;
	dataInicio: Date;
	googleId: string | null;
	nome: string;
	recorrencia: string;
	tipo: string;
	valor: number;
}