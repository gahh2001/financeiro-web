import { AxiosInstance } from "axios";
import { IConta } from "../interfaces/IConta";

export class ContaService {
	constructor(private readonly axiosInstance: AxiosInstance){}

	async listaContaPorId(idConta: number) {
		const url = `/conta/${idConta}`;
		try {
			const response = await this.axiosInstance.get<IConta>(url);
			return { ...response };
		} catch (error) {
			console.log(`Não foi possível obter a conta`, error);
			return undefined;
		}
		
	}
}