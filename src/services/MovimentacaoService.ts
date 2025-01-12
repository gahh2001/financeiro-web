import { AxiosInstance } from "axios";
import { Movimentacao } from "../types/Movimentacao";

export class MovimentacaoService {
	constructor(private readonly axiosInstance: AxiosInstance){}
	urlDefault = "/movimentacao";

	async getMovimentacao(googleId: string | null, dataInicio: number, dataFim: number) {
		const params = {
			googleId: googleId,
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

	async obtemPorParametros(googleId: string | null | undefined, dataInicio: number | undefined,
			dataFim: number | undefined, tipo: string | undefined, categorias: string[] | undefined) {
		const params = {
			googleId: googleId,
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

	async apagaMovimentacao(googleId: string | null, idMovimentacao: number) {
		const url = `${this.urlDefault}/${idMovimentacao}`;
		const params = {
			googleId: googleId,
		}
		try {
			const response = await this.axiosInstance
				.delete(url, {params});
			return response;
		} catch (error) {
			console.log(`Não foi possível obter as movimentações`, error);
			return undefined;
		}
	}

	async adicionaMovimentacao(googleId : string | null, movimentacao: Partial<Movimentacao>) {
		const params = {
			googleId: googleId,
		}
		try {
			const response = await this.axiosInstance
				.post(this.urlDefault, movimentacao, {params})
			return {...response}
		} catch (error) {
			console.log("Erro ao salvar movimentação")
			return undefined;
		}
	}

	async atualizaMovimentacao(googleId : string | null, movimentacao: Partial<Movimentacao>) {
		const params = {
			googleId: googleId,
		}
		try {
			const response = await this.axiosInstance
				.patch(this.urlDefault, movimentacao, {params})
			return {...response}
		} catch (error) {
			console.log("Erro ao atualizar movimentação")
			return undefined;
		}
	}
}