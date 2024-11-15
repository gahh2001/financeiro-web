import { TipoMovimentacaoEnum } from "../enums/TipoMovimentacaoEnum";
import { IMovimentacao } from "./IMovimentacao";

export type IInformacoesDoDiaProps = {
	selectedDate: Date;
	movimentacoesMes: IMovimentacao[];
	isOpenModalAdd: boolean;
	isOpenModalRemove: boolean;
	visivel: boolean;
	modalAddRendimento: () => void;
	modalAddDespesa: () => void;
	setVisible: () => void;
	modalApagaMovimentacao: (movimentacaoApagar: IMovimentacao) => void;
	dialogDescricao: (description: string) => void;
	handleEditMovimentacao: (idMovimentacao: number | undefined, data: Date, valor: string, categoria: string,
		descricao: string, tipoEdit: TipoMovimentacaoEnum) => void;
}