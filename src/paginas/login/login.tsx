import back from '../../http';
import './login.scss';

import { Divider } from '@mui/material';
import { useEffect } from "react";
import { LoginService } from '../../services/LoginService';

export const Login = () => {

	useEffect(() => {
		const buttonDiv = document.getElementById('buttonDiv');
		if (buttonDiv) {
			google.accounts.id.initialize({
				client_id: "536894210778-998102hp7nml43ape8dtkpviiuvaj4ds.apps.googleusercontent.com",
				callback: handleCredentialResponse
			});
			google.accounts.id.renderButton(buttonDiv,
				{ type: 'standard', theme: 'filled_black', size: 'large', shape: 'circle' });
			google.accounts.id.prompt();
		}
	}, []);
	
	async function handleCredentialResponse(response: any) {
		const service = new LoginService(back);
		const resposta = await service.autentica(response.credential);
	}
	
	return (
		<div className='login'>
			<div className='card'>
				<div className="titulo">Login</div>
				<Divider variant="middle" />
				<br />
				<div className="texto">
					Entre com sua conta do Google para acessar a Carteira Digital.
				</div>
				<div className="google">
					<div id="buttonDiv"></div>
				</div>
				<div className="texto">
					Se você já possui cadastro, é só continuar com a conta Google também. Prático, não? 🙂
				</div>
			</div>
		</div>
	);
}

export default Login;