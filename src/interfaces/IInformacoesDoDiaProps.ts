import { TipoMovimentacaoEnum } from "../enums/TipoMovimentacaoEnum";
import { Movimentacao } from "../types/Movimentacao";

export type IInformacoesDoDiaProps = {
	selectedDate: Date;
	movimentacoesMes: Movimentacao[];
	isOpenModalAdd: boolean;
	isOpenModalRemove: boolean;
	visivel: boolean;
	modalAddRendimento: () => void;
	modalAddDespesa: () => void;
	setVisible: () => void;
	modalApagaMovimentacao: (movimentacaoApagar: Movimentacao) => void;
	dialogDescricao: (description: string) => void;
	handleEditMovimentacao: (idMovimentacao: number | undefined, data: Date, valor: string, categoria: string,
		descricao: string, tipoEdit: TipoMovimentacaoEnum) => void;
}