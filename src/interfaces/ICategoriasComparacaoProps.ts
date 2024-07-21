import { ISeriesComparacao } from "./ISeriesComparacao";
import { ISeriesEvolucao } from "./ISeriesEvolucao";

export type ICategoriasComparacaoProps = {
	comparacoes: ISeriesComparacao[] | null;
	evolucao: ISeriesEvolucao[] | null;
	agrupamentosMes: string[];
}