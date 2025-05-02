import axios from "axios";
import qs from "qs";

export const useBack = () => {

	const instance = axios.create({
		baseURL: 'https://mywalletpro.com.br/api',
		headers: {
			"Content-Type": "application/json",
		},
		paramsSerializer: {
			serialize: params => qs.stringify(params, { arrayFormat: "repeat" }),
		},
	});

	instance.interceptors.request.use(
		(config) => {
			const token = localStorage.getItem("accessToken"); 
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	return instance;
};
