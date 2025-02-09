import { Movimentacao } from "../types/Movimentacao";

export type ICalendarioProps = {
	movimentacoesMes: Movimentacao[];
	isOpenModalAdd: boolean;
	isOpenModalRemove: boolean;
	onDayClick: (selectedDate: Date) => void;
	atualizaMovimentacoesMes: (movimentacoes: Movimentacao[]) => void;
}