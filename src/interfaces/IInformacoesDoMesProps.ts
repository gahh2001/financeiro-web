import { IMovimentacao } from "./IMovimentacao";

export type InformacoesDoMesProps = {
	selectedDate: Date;
	modalAddRendimento: () => void;
	modalAddDespesa: () => void;
	modalApagaMovimentacao: (movimentacaoApagar: IMovimentacao) => void;
}