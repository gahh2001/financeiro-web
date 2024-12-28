import { Dayjs } from "dayjs";

export type IFiltroDataProps = {
	ano: Dayjs | null;
	mes: Dayjs | null;
	tipoMovimentacao: string;
	tipoComparacao: string;
	fullYear: boolean;
	setMes: (date: Dayjs | null) => void;
	setAno: (date: Dayjs | null) => void; 
	setTipoMovimentacao: (tipo: string) => void;
	setTipoComparacao: (tipo: string) => void;
	setFullYear: (tipo: boolean) => void;
}