import { AxiosInstance } from "axios";
import { TipoMovimentacaoEnum } from "../enums/TipoMovimentacaoEnum";
import { ICategoriaMovimentacao } from "../interfaces/ICategoriaMovimentacao";
import { ISomaCategoriasPorMes } from "../interfaces/ISomaCategoriasPorMes";

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

	async obtemSomaCategoriasEValores(idConta: number, dataInicio: number,
			dataFim: number, tipoMovimentacao: string) {
		const params = {
			idConta: idConta,
			dataInicio: dataInicio,
			dataFim: dataFim,
			tipoMovimentacao: tipoMovimentacao
		};
		try {
			const response = await this.axiosInstance
				.get<ISomaCategoriasPorMes[]>(`${this.urlDefault}/soma-categorias`, {params});
			return {...response};
		} catch (error) {
			console.log(`Não foi possível obter a soma de movimentações de categorias`, error);
			return undefined;
		}
	}

	async obtemSomaCategoriasEValoresPorMeses(idConta: number, dataInicio: number,
		dataFim: number, tipoMovimentacao: string) {
	const params = {
		idConta: idConta,
		dataInicio: dataInicio,
		dataFim: dataFim,
		tipoMovimentacao: tipoMovimentacao
	};
	try {
		const response = await this.axiosInstance
			.get<ISomaCategoriasPorMes[]>(`${this.urlDefault}/soma-categorias-meses`, {params});
		return {...response};
	} catch (error) {
		console.log(`Não foi possível obter a comparação da soma de categorias`, error);
		return undefined;
	}
}
}
