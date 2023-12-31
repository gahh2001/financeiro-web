import { AxiosInstance } from "axios";
import { TipoMovimentacaoEnum } from "../enums/TipoMovimentacaoEnum";
import { ICategoriaMovimentacao } from "../interfaces/ICategoriaMovimentacao";
import { SomaCategoriasPorMes } from "../interfaces/SomaCategoriasPorMes";

export class CategoriaMovimentacaoService {
	constructor(private readonly axiosInstance: AxiosInstance) {}
	urlDefault = "/categoria-movimentacao"

	async obtemCategoriasMovimentacaoPorIdConta(idConta: number) {
		const params = {
			idConta: idConta,
		};
		try {
			const response = await this.axiosInstance
				.get<ICategoriaMovimentacao[]>(this.urlDefault, { params });
			return { ...response };
		} catch (error) {
			console.log(`Não foi possível obter as movimentações`, error);
			return undefined;
		}
	}

	async obtemCategoriaMovimentacaoPorId(id: number) {
		const url = `${this.urlDefault}/${id}`;
		try {
			const response = await this.axiosInstance
				.get<ICategoriaMovimentacao>(url)
			return {...response.data}
		} catch (error) {
			console.log(`Não foi possível obter a categoria de movimentação`, error);
			return undefined
		}
	}

	async obtemCategoriasPorTipoMovimentacaoEConta(idConta: number, tipoMovimentacao: TipoMovimentacaoEnum) {
		const params = {
			idConta: idConta,
			tipoMovimentacao: tipoMovimentacao.toString(),
		};
		try {
			const response = await this.axiosInstance
				.get<ICategoriaMovimentacao[]>(`${this.urlDefault}/tipo`, {params});
			return {...response};
		} catch (error) {
			console.log(`Não foi possível obter as movimentações`, error);
			return undefined;
		}
	}

	async obtemSomaCategoriasEValores(idConta: number, data: number) {
		const params = {
			idConta: idConta,
			dataMes: data
		};
		try {
			const response = await this.axiosInstance
				.get<SomaCategoriasPorMes[]>(`${this.urlDefault}/mes`, {params});
			return {...response};
		} catch (error) {
			console.log(`Não foi possível obter a soma de movimentações por categoria`, error);
			return undefined;
		}
	}
}
