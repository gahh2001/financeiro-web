import { ReactNode } from "react";
import { TipoMovimentacaoEnum } from "../enums/TipoMovimentacaoEnum";
import { Movimentacao } from "../types/Movimentacao";

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
	movimentacoesMes: Movimentacao[];
	closeModal: () => void;
	atualizaMovimentacoesMes: (movimentacoes: Movimentacao[]) => void;
}