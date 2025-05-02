import { TipoMovimentacaoEnum } from "../enums/TipoMovimentacaoEnum";
import { useBack } from "../http";
import { IMediasAnalitico } from "../interfaces/IMediasAnalitico";
import { CategoriaMovimentacao } from "../types/CategoriaMovimentacao";
import { SomaCategoriasPorMes } from "../types/SomaCategoriasPorMes";

export class CategoriaMovimentacaoService {
	constructor() {}

	axiosInstance = useBack();
	urlDefault = "/categoria-movimentacao";

	async adicionaCategoria(categoria: Partial<CategoriaMovimentacao>) {
		try {
			const response = await this.axiosInstance
				.post(this.urlDefault, categoria)
			return {...response}
		} catch (error) {
			console.log("Erro ao salvar categoria")
			return undefined;
		}
	}

	async atualizaCategoria(categoria: Partial<CategoriaMovimentacao>) {
		try {
			const response = await this.axiosInstance
				.patch(this.urlDefault, categoria)
			return {...response}
		} catch (error) {
			console.log("Erro ao atualizar categoria")
			return undefined;
		}
	}

	async obtemCategoriasMovimentacaoPorConta() {
		try {
			const response = await this.axiosInstance
				.get<CategoriaMovimentacao[]>(this.urlDefault);
			return { ...response };
		} catch (error) {
			console.log(`Não foi possível obter as categorias de movimentações`, error);
			return undefined;
		}
	}

	async obtemCategoriaMovimentacaoPorId(id: number) {
		const url = `${this.urlDefault}/${id}`;
		try {
			const response = await this.axiosInstance
				.get<CategoriaMovimentacao>(url)
			return {...response.data}
		} catch (error) {
			console.log(`Não foi possível obter a categoria de movimentação`, error);
			return undefined
		}
	}

	async obtemCategoriasPorTipoMovimentacaoEConta(tipoMovimentacao: TipoMovimentacaoEnum | null) {
		const params = {
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

	async obtemSomaCategoriasEValores(dataInicio: number,
			dataFim: number, tipoMovimentacao: string) {
		const params = {
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

	async obtemSomaCategoriasEValoresPorMeses(dataInicio: number,
			dataFim: number, categorias: string[]) {
		const params = {
			dataInicio: dataInicio,
			dataFim: dataFim,
			categoria: categorias
		};
		try {
			const response = await this.axiosInstance
				.get<SomaCategoriasPorMes[]>(`${this.urlDefault}/soma-categorias-meses`, { params,});
			return {...response};
		} catch (error) {
			console.log(`Não foi possível obter a comparação da soma de categorias`, error);
			return undefined;
		}
	}

	async obtemSomaCategoriasEvolucao(dataInicio: number, dataFim: number) {
		const params = {
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

	async obtemInformacoesgerais(dataInicio: number, dataFim: number) {
		const params = {
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
