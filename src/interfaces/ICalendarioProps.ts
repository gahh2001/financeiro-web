import { IMovimentacao } from "./IMovimentacao";

export type  ICalendarioProps = {
	googleId: string | null;
	movimentacoesMes: IMovimentacao[];
	isOpenModalAdd: boolean;
	isOpenModalRemove: boolean;
	onDayClick: (selectedDate: Date) => void;
	atualizaMovimentacoesMes: (movimentacoes: IMovimentacao[]) => void;
}