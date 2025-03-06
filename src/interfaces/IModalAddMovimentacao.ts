import { ReactNode } from "react";
import { TipoMovimentacaoEnum } from "../enums/TipoMovimentacaoEnum";
import { Movimentacao } from "../types/Movimentacao";

export type IModalAddMovimentacao = {
	children?: ReactNode;
	edit: boolean;
	idMovimentacao: number | undefined;
	date: Date;
	categoria: string;
	valor: string;
	descricao: string;
	alteraSaldo: boolean;
	selectedDate: Date;
	movimentacoesMes: Movimentacao[];
	atualizaMovimentacoesMes: (movimentacoes: Movimentacao[]) => void;
}