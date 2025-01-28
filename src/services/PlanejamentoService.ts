import { AxiosInstance } from "axios";
import { Planejamento } from "../types/Planejamento";
import { Progressos } from "../types/Progressos";

export class PlanejamentoService {

	constructor(private readonly axiosInstance: AxiosInstance){}
	urlDefault = "/planejamento";

	async listaPlanejamentos(googleId: string | null) {
		const params = {
			googleId: googleId
		}
		try {
			const response = await this.axiosInstance
				.get<Planejamento[]>(this.urlDefault, {params});
			return {...response };
		} catch (error) {
			console.log(`Não foi possível obter os planejamentos`, error);
			return undefined;
		}
	}

	async criaPlanejamento(planejamento: Partial<Planejamento>) {
		try {
			const response = await this.axiosInstance
				.post(this.urlDefault, planejamento);
			return {...response };
		} catch (error) {
			console.log(`Não foi possível criar o planejamento`, error);
			return undefined;
		}
	}

	async atualizaPlanejamento(planejamento: Partial<Planejamento>) {
		try {
			const response = await this.axiosInstance
				.patch(this.urlDefault, planejamento);
			return {...response };
		} catch (error) {
			console.log(`Não foi possível atualizar o planejamento`, error);
			return undefined;
		}
	}

	async listaProgressos(id: number | undefined) {
		if (!id) {
			return undefined;
		}
		try {
			const response = await this.axiosInstance
				.get<Progressos>(`${this.urlDefault}/${id}/progressos`);
			return {...response };
		} catch (error) {
			console.log(`Não foi possível obter os progressos`, error);
			return undefined;
		}
	}
}