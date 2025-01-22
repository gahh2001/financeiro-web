import axios from "axios";

const back = axios.create({
	baseURL: 'https://mywalletpro.com.br/api'
});

export default back