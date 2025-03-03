import { Movimentacao } from "../types/Movimentacao";

export type ICalendarioProps = {
	movimentacoesMes: Movimentacao[];
	isOpenModalRemove: boolean;
	onDayClick: (selectedDate: Date) => void;
	atualizaMovimentacoesMes: (movimentacoes: Movimentacao[]) => void;
}