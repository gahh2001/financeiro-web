import { ReactNode } from "react";
import { TipoMovimentacaoEnum } from "../enums/TipoMovimentacaoEnum";
import { IMovimentacao } from "./IMovimentacao";

export type IModalApagar = {
	children?: ReactNode;
	isOpen: boolean;
	tipo: TipoMovimentacaoEnum;
	closeModalRemove: () => void;
	movimentacao: IMovimentacao | null;
	googleId: string | null;
}