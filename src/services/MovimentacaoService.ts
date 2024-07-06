import { AxiosInstance } from "axios";
import { IMovimentacao } from "../interfaces/IMovimentacao";

export class MovimentacaoService {
	constructor(private readonly axiosInstance: AxiosInstance){}
	

	async getMovimentacao(googleId: string | null, dataInicio: number, dataFim: number) {
		const params = {
			googleId: googleId,
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

	async apagaMovimentacao(googleId: string | null, idMovimentacao: number) {
		const url = `/movimentacao/${idMovimentacao}`;
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

	async adicionaMovimentacao(googleId : string | null, movimentacao: Partial<IMovimentacao>) {
		const params = {
			googleId: googleId,
		}
		try {
			const response = await this.axiosInstance
				.post('/movimentacao', movimentacao, {params})
			return {...response}
		} catch (error) {
			console.log("Erro ao salvar movimentação")
			return undefined;
		}
	}

	async atualizaMovimentacao(googleId : string | null, movimentacao: Partial<IMovimentacao>) {
		const params = {
			googleId: googleId,
		}
		try {
			const response = await this.axiosInstance
				.patch('/movimentacao', movimentacao, {params})
			return {...response}
		} catch (error) {
			console.log("Erro ao atualizar movimentação")
			return undefined;
		}
	}
}