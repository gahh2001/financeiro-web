import { AxiosInstance } from "axios";
import { Movimentacao } from "../types/Movimentacao";

export class MovimentacaoService {
	constructor(private readonly axiosInstance: AxiosInstance){}
	urlDefault = "/movimentacao";

	async getMovimentacao(dataInicio: number, dataFim: number) {
		const params = {
			dataInicio: dataInicio,
			dataFim: dataFim
		}
		try {
			const response = await this.axiosInstance
				.get<Movimentacao[]>(this.urlDefault, {params});
			return {...response };
		} catch (error) {
			console.log(`Não foi possível obter as movimentações`, error);
			return undefined;
		}
	}

	async obtemPorParametros(dataInicio: number | undefined,
			dataFim: number | undefined, tipo: string | undefined, categorias: string[] | undefined) {
		const params = {
			dataInicio: dataInicio,
			dataFim: dataFim,
			tipoMovimentacao: tipo,
			categorias: categorias?.join(',')
		}
		try {
			const response = await this.axiosInstance
				.get<Movimentacao[]>(`${this.urlDefault}/parametros`, {params});
			return {...response };
		} catch (error) {
			console.log(`Não foi possível obter as movimentações`, error);
			return undefined;
		}
	}

	async apagaMovimentacao(idMovimentacao: number) {
		const url = `${this.urlDefault}/${idMovimentacao}`;
		try {
			const response = await this.axiosInstance
				.delete(url);
			return response;
		} catch (error) {
			console.log(`Não foi possível obter as movimentações`, error);
			return undefined;
		}
	}

	async adicionaMovimentacao(movimentacao: Partial<Movimentacao>) {
		try {
			const response = await this.axiosInstance
				.post(this.urlDefault, movimentacao)
			return {...response}
		} catch (error) {
			console.log("Erro ao salvar movimentação")
			return undefined;
		}
	}

	async atualizaMovimentacao(movimentacao: Partial<Movimentacao>) {
		try {
			const response = await this.axiosInstance
				.patch(this.urlDefault, movimentacao)
			return {...response}
		} catch (error) {
			console.log("Erro ao atualizar movimentação")
			return undefined;
		}
	}
}