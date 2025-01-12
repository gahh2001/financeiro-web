export type Planejamento = {
	id?: number;
	ativo: boolean;
	categorias: string[];
	dataFim: Date;
	dataInicio: Date;
	googleId: string | null;
	nome: string;
	recorrencia: string;
	tipo: string;
	tipoCategorias: string;
	valor: number;
}