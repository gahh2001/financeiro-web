import { ReactNode } from "react";
import { TipoMovimentacaoEnum } from "../enums/TipoMovimentacaoEnum";
import { IMovimentacao } from "./IMovimentacao";

export type IModalAddMovimentacao = {
	children?: ReactNode;
	isOpen: boolean;
	tipo: TipoMovimentacaoEnum;
	edit: boolean;
	idMovimentacao: number | undefined;
	date: Date;
	categoria: string;
	valor: string;
	descricao: string;
	selectedDate: Date;
	movimentacoesMes: IMovimentacao[];
	closeModal: () => void;
	atualizaMovimentacoesMes: (movimentacoes: IMovimentacao[]) => void;
}