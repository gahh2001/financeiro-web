import { IMovimentacao } from "./IMovimentacao";

export type InformacoesDoMesProps = {
	selectedDate: Date;
	movimentacoesMes: IMovimentacao[];
	visivel: boolean;
	modalAddRendimento: () => void;
	modalAddDespesa: () => void;
	modalApagaMovimentacao: (movimentacaoApagar: IMovimentacao) => void;
}