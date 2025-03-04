import { ReactNode } from "react";
import { TipoMovimentacaoEnum } from "../enums/TipoMovimentacaoEnum";
import { Movimentacao } from "../types/Movimentacao";

export type IModalApagar = {
	children?: ReactNode;
	tipo: TipoMovimentacaoEnum;
	movimentacao: Movimentacao | null;
}