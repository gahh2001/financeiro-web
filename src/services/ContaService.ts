import { AxiosInstance } from "axios";
import { IConta } from "../interfaces/IConta";

export class ContaService {
	constructor(private readonly axiosInstance: AxiosInstance){}

	async listaContaPorGoogleId(googleId: string | null) {
		const params = {
			googleId: googleId,
		}
		try {
			const response = await this.axiosInstance.get<IConta>('/conta', {params});
			return { ...response };
		} catch (error) {
			console.log(`Não foi possível obter a conta`, error);
			return undefined;
		}
		
	}
}