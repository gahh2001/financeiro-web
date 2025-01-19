import { Dayjs } from "dayjs";

export type IModalPlanejamento = {
	nome:string;
	tipo: string;
	recorrencia: string;
	valor: string
	dataInicio: Dayjs | null;
	dataFim: Dayjs | null;
	setNome: (nome: string) => void;
	setTipo: (tipo: string) => void;
	setRecorrencia: (tipo: string) => void;
	setValor: (valor: string) => void;
	setDataInicio: (valor: Dayjs | null) => void;
	setDataFim: (valor: Dayjs | null) => void;
}