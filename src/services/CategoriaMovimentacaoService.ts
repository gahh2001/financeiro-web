import { AxiosInstance } from "axios";
import { TipoMovimentacaoEnum } from "../enums/TipoMovimentacaoEnum";
import { IMediasAnalitico } from "../interfaces/IMediasAnalitico";
import { CategoriaMovimentacao } from "../types/CategoriaMovimentacao";
import { SomaCategoriasPorMes } from "../types/SomaCategoriasPorMes";

export class CategoriaMovimentacaoService {
	constructor(private readonly axiosInstance: AxiosInstance) {}
	urlDefault = "/categoria-movimentacao";

	async adicionaCategoria(googleId : string | null, categoria: Partial<CategoriaMovimentacao>) {
		try {
			const response = await this.axiosInstance
				.post(this.urlDefault, categoria)
			return {...response}
		} catch (error) {
			console.log("Erro ao salvar categoria")
			return undefined;
		}
	}

	async atualizaCategoria(googleId : string | null, categoria: Partial<CategoriaMovimentacao>) {
		try {
			const response = await this.axiosInstance
				.patch(this.urlDefault, categoria)
			return {...response}
		} catch (error) {
			console.log("Erro ao atualizar categoria")
			return undefined;
		}
	}

	async obtemCategoriasMovimentacaoPorConta(googleId: string | null) {
		const params = {
			googleId: googleId,
		};
		try {
			const response = await this.axiosInstance
				.get<CategoriaMovimentacao[]>(this.urlDefault, { params });
			return { ...response };
		} catch (error) {
			console.log(`Não foi possível obter as categorias de movimentações`, error);
			return undefined;
		}
	}

	async obtemCategoriaMovimentacaoPorId(googleId : string | null, id: number) {
		const url = `${this.urlDefault}/${id}`;
		const params = {
			googleId: googleId,
		}
		try {
			const response = await this.axiosInstance
				.get<CategoriaMovimentacao>(url, {params})
			return {...response.data}
		} catch (error) {
			console.log(`Não foi possível obter a categoria de movimentação`, error);
			return undefined
		}
	}

	async obtemCategoriasPorTipoMovimentacaoEConta(googleId : string | null,
			tipoMovimentacao: TipoMovimentacaoEnum | null) {
		const params = {
			googleId: googleId,
			tipoMovimentacao: tipoMovimentacao?.toString(),
		};
		try {
			const response = await this.axiosInstance
				.get<CategoriaMovimentacao[]>(`${this.urlDefault}/tipo`, {params});
			return {...response};
		} catch (error) {
			console.log(`Não foi possível obter as movimentações`, error);
			return undefined;
		}
	}

	async obtemSomaCategoriasEValores(googleId : string | null, dataInicio: number,
			dataFim: number, tipoMovimentacao: string) {
		const params = {
			googleId: googleId,
			dataInicio: dataInicio,
			dataFim: dataFim,
			tipoMovimentacao: tipoMovimentacao
		};
		try {
			const response = await this.axiosInstance
				.get<SomaCategoriasPorMes[]>(`${this.urlDefault}/soma-categorias`, {params});
			return {...response};
		} catch (error) {
			console.log(`Não foi possível obter a soma de movimentações de categorias`, error);
			return undefined;
		}
	}

	async obtemSomaCategoriasEValoresPorMeses(googleId : string | null, dataInicio: number,
			dataFim: number, tipoMovimentacao: string) {
		const params = {
			googleId: googleId,
			dataInicio: dataInicio,
			dataFim: dataFim,
			tipoMovimentacao: tipoMovimentacao
		};
		try {
			const response = await this.axiosInstance
				.get<SomaCategoriasPorMes[]>(`${this.urlDefault}/soma-categorias-meses`, {params});
			return {...response};
		} catch (error) {
			console.log(`Não foi possível obter a comparação da soma de categorias`, error);
			return undefined;
		}
	}

	async obtemSomaCategoriasEvolucao(googleId : string | null, dataInicio: number, dataFim: number) {
		const params = {
			googleId: googleId,
			dataInicio: dataInicio,
			dataFim: dataFim,
		};
		try {
			const response = await this.axiosInstance
				.get<SomaCategoriasPorMes[]>(`${this.urlDefault}/soma-tipos-meses`, {params});
			return {...response};
		} catch (error) {
			console.log(`Não foi possível obter a soma de categorias para a evolução`, error);
			return undefined;
		}
	}

	async obtemInformacoesgerais(googleId : string | null, dataInicio: number, dataFim: number) {
		const params = {
			googleId: googleId,
			dataInicio: dataInicio,
			dataFim: dataFim,
		};
		try {
			const response = await this.axiosInstance
				.get<IMediasAnalitico>(`${this.urlDefault}/soma-informacoes-gerais`, {params});
			return {...response};
		} catch (error) {
			console.log(`Não foi possível obter a soma das informações gerais`, error);
			return undefined;
		}
	}
}
