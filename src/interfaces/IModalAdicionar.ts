import { ReactNode } from "react";
import { TipoMovimentacaoEnum } from "../enums/TipoMovimentacaoEnum";

export type IModalAdicionar = {
	children?: ReactNode;
	isOpen: boolean;
	tipo: TipoMovimentacaoEnum;
	closeModal: () => void;
	edit: boolean;
	idMovimentacao: number | undefined;
	date: Date;
	categoria: string;
	valor: string;
	descricao: string;
	selectedDate: Date;
	googleId: string | null;
}