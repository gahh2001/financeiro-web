import { Movimentacao } from "../types/Movimentacao";

export type ICalendarioProps = {
	movimentacoesMes: Movimentacao[];
	onDayClick: (selectedDate: Date) => void;
	atualizaMovimentacoesMes: (movimentacoes: Movimentacao[]) => void;
}