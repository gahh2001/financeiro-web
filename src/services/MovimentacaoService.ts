import { AxiosInstance } from "axios";
import { IMovimentacao } from "../interfaces/IMovimentacao";

export class MovimentacaoService {
	constructor(private readonly axiosInstance: AxiosInstance){}

	async getMovimentacao(idConta: number, dataInicio: number, dataFim: number) {
		const params = {
			idConta: 1,
			dataInicio: dataInicio,
			dataFim: dataFim
		}
		try {
			const response = await this.axiosInstance
				.get<IMovimentacao[]>('/movimentacao', {params});
			return {...response };
		} catch (error) {
			console.log(`Não foi possível obter as movimentações`, error);
			return undefined;
		}
	}
}