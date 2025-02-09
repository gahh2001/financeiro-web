export type Planejamento = {
	id?: number;
	ativo: boolean;
	categorias: number[];
	dataFim: Date;
	dataInicio: Date;
	nome: string;
	recorrencia: string;
	tipo: string;
	valor: number;
}