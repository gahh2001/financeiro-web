import { Dayjs } from "dayjs";

export interface FiltrosMovimentacoesProps {
	setDataFim: (data: Dayjs | null)=> void;
	setDataInicio: (data: Dayjs | null) => void;
	setCategorias: (categorias: string[])=> void;
	setTipo: (value: string)=> void;
	dataInicio: Dayjs | null;
	dataFim: Dayjs | null;
	tipo: string;
	categorias: string[];
	googleId: string | null;
}