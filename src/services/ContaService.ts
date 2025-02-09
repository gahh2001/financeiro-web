import { AxiosInstance } from "axios";
import { Conta } from "../types/Conta";

export class ContaService {
	constructor(private readonly axiosInstance: AxiosInstance){}

	async obtemConta() {
		try {
			const response = await this.axiosInstance.get<Conta>('/conta');
			return { ...response };
		} catch (error) {
			console.log(`Não foi possível obter a conta`, error);
			return undefined;
		}
		
	}

	async editarSaldo(valor: string) {
		const body = {
			saldoConta: valor
		}
		try {
			const response = await this.axiosInstance
				.post('/conta/editar-saldo', body);
			return { ...response };
		} catch (error) {
			console.log(`Não foi possível zerar o saldo`, error);
			return undefined;
		}
		
	}
}