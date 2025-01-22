import axios from "axios";

const back = axios.create({
	baseURL: 'http://localhost:8080/api'
});

export default back