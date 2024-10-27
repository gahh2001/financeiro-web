import { IMovimentacao } from "./IMovimentacao";

export type InformacoesDoMesProps = {
	selectedDate: Date;
	googleId: string | null;
	movimentacoesMes: IMovimentacao[];
	visivel: boolean;
	modalAddRendimento: () => void;
	modalAddDespesa: () => void;
	modalApagaMovimentacao: (movimentacaoApagar: IMovimentacao) => void;
}