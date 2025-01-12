import { AxiosInstance } from "axios";
import { Conta } from "../types/Conta";

export class ContaService {
	constructor(private readonly axiosInstance: AxiosInstance){}

	async listaContaPorGoogleId(googleId: string | null) {
		const params = {
			googleId: googleId,
		}
		try {
			const response = await this.axiosInstance.get<Conta>('/conta', {params});
			return { ...response };
		} catch (error) {
			console.log(`Não foi possível obter a conta`, error);
			return undefined;
		}
		
	}

	async editarSaldo(googleId: string | null | undefined, valor: string) {
		const params = {
			googleId: googleId,
		}
		const body = {
			saldoConta: valor
		}
		try {
			const response = await this.axiosInstance
				.post('/conta/editar-saldo', body, {params});
			return { ...response };
		} catch (error) {
			console.log(`Não foi possível zerar o saldo`, error);
			return undefined;
		}
		
	}
}