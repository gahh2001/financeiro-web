import { TipoMovimentacaoEnum } from "../enums/TipoMovimentacaoEnum";
import { Movimentacao } from "../types/Movimentacao";

export const criaMovimentacaoVazia = (
	tipo: TipoMovimentacaoEnum = TipoMovimentacaoEnum.POSITIVO,
	dataMovimentacao: Date = new Date()
): Movimentacao => ({
	valor: 0,
	dataMovimentacao: dataMovimentacao,
	tipoMovimentacao: tipo.toString(),
	idCategoriaMovimentacao: 0,
	descricaoMovimentacao: "",
	icone: "",
	corIcone: "",
	alteraSaldo: true
});

export const formataValorInput = (valor: number) =>
	valor ? valor.toFixed(2) : "";
