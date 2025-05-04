import { AxiosInstance } from "axios";
import { ILoginId } from "../interfaces/ILoginId";
import { useBack } from "../http";

export class LoginService {
	constructor() {}
	axiosInstance = useBack();

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