import { AxiosInstance } from "axios";

export class LoginService {
	constructor(private readonly axiosInstance: AxiosInstance){}

	async autentica(token: string) {
		const url = '/login';
		const dto = {
			credential: token
		}
		try {
			const response = await this.axiosInstance.post(url, dto);
			return { ...response };
		} catch (error) {
			console.log(`Não foi possível obter a conta`, error);
			return undefined;
		}
		
	}
}