import { IMovimentacao } from "./IMovimentacao";

export type InformacoesDoMesProps = {
	selectedDate: Date;
	googleId: string | null;
		modalAddRendimento: () => void;
	modalAddDespesa: () => void;
	modalApagaMovimentacao: (movimentacaoApagar: IMovimentacao) => void;
}