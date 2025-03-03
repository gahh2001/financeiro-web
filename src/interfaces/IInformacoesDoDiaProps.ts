import { TipoMovimentacaoEnum } from "../enums/TipoMovimentacaoEnum";
import { Movimentacao } from "../types/Movimentacao";

export type IInformacoesDoDiaProps = {
	selectedDate: Date;
	movimentacoesMes: Movimentacao[];
	isOpenModalRemove: boolean;
	visivel: boolean;
	modalAddDespesa: () => void;
	setVisible: () => void;
	modalApagaMovimentacao: (movimentacaoApagar: Movimentacao) => void;
	handleEditMovimentacao: (idMovimentacao: number | undefined, data: Date, valor: string, categoria: string,
		descricao: string, tipoEdit: TipoMovimentacaoEnum, alteraSaldo: boolean) => void;
}