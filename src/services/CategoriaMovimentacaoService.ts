import { AxiosInstance } from "axios";
import { ICategoriaMovimentacao } from "../interfaces/ICategoriaMovimentacao";

export class CategoriaMovimentacaoService {
	constructor(private readonly axiosInstance: AxiosInstance) {}

	async obtemCategoriasMovimentacaoPorIdConta(idConta: number) {
		const params = {
			idConta: idConta,
		};
		try {
			const response = await this.axiosInstance
				.get<ICategoriaMovimentacao[]>("/categoria-movimentacao", { params });
			return { ...response };
		} catch (error) {
			console.log(`Não foi possível obter as movimentações`, error);
			return undefined;
		}
	}

	async obtemCategoriaMovimentacaoPorId(id: number) {
		const url = `/categoria-movimentacao/${id}`;
		try {
			const response = await this.axiosInstance
				.get<ICategoriaMovimentacao>(url)
			return {...response.data}
		} catch (error) {
			console.log(`Não foi possível obter a categoria de movimentação`, error);
			return undefined
		}
	}
}
