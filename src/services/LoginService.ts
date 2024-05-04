import { AxiosInstance } from "axios";
import { ILoginId } from "../interfaces/ILoginId";

export class LoginService {
	constructor(private readonly axiosInstance: AxiosInstance){}

	async autentica(token: string) {
		const url = '/login';
		const dto = {
			credential: token
		}
		try {
			const response = await this.axiosInstance.post<ILoginId>(url, dto);
			return { ...response };
		} catch (error) {
			console.log(`Não foi possível obter a conta`, error);
			return undefined;
		}
	}
}