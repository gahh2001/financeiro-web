import { Dayjs } from "dayjs";

export type IFiltroDataProps = {
	ano: Dayjs | null;
	mes: Dayjs | null;
	fullYear: boolean;
	tipoMovimentacao: string;
	setMes: (date: Dayjs | null) => void;
	setAno: (date: Dayjs | null) => void;
	setFullYear: (tipo: boolean) => void;
	setTipoMovimentacao: (tipo: string) => void;
}