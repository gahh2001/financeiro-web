import { Movimentacao } from "../types/Movimentacao";

export type InformacoesDoMesProps = {
	selectedDate: Date;
	movimentacoesMes: Movimentacao[];
	visivel: boolean;
	modalAddRendimento: () => void;
	modalAddDespesa: () => void;
	modalApagaMovimentacao: (movimentacaoApagar: Movimentacao) => void;
}