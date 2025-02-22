import { Dayjs } from "dayjs";

export interface FiltrosMovimentacoesProps extends ListaMovimentacaoProps {
	setDataFim: (data: Dayjs | null)=> void;
	setDataInicio: (data: Dayjs | null) => void;
	setCategorias: (categorias: string[])=> void;
	setTipo: (value: string)=> void;
}

export interface ListaMovimentacaoProps {
	categorias: string[];
	dataInicio: Dayjs | null;
	dataFim: Dayjs | null;
	tipo: string;
}