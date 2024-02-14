import { Dayjs } from "dayjs";

export type IFiltersAnaliticProps = {
	ano: Dayjs | null;
	mes: Dayjs | null;
	tipoMovimentacao: string;
	tipoComparacao: string;
	fullYear: boolean
}