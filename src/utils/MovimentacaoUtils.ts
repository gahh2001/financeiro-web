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

export const getMovementType = (movimentacao: Movimentacao) =>
	movimentacao.tipoMovimentacao.toUpperCase() === TipoMovimentacaoEnum.POSITIVO.toString()
		? TipoMovimentacaoEnum.POSITIVO
		: TipoMovimentacaoEnum.NEGATIVO;

export const toLocalCalendarDate = (date: Date) => {
	const utcDate = new Date(date);
	return new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate());
};
