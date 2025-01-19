import back from '../../http';
import './login.scss';

import { Divider } from '@mui/material';
import { useAtom } from 'jotai';
import { FC, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { googleIdAtom } from '../../atoms/atom';
import { IGoogleIdProps } from '../../interfaces/IGoogleIdProps';
import { LoginService } from '../../services/LoginService';

const Login: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
	const [googleId] = useAtom(googleIdAtom);
	const navigate = useNavigate();

	useEffect(() => {
		if (googleId && googleId !== "") {
			navigate("/home");
		}
	}, [googleId]);

	useEffect(() => {
		const buttonDiv = document.getElementById('buttonDiv');
		if (buttonDiv && window.google && window.google.accounts) {
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
		if (resposta && resposta.data && resposta.data.credential && resposta.data.picture) {
			localStorage.setItem('googleId', resposta.data.credential);
			localStorage.setItem('urlPicture', resposta.data.picture);
			props.setId(resposta.data.credential);
			props.setPicture(resposta.data.picture);
			navigate("/home");
		}
	}
	
	return (
		<div className='login'>
			<div className="nome-site">
				Carteira Online
			</div>
			<div className='card-login'>
				<div className="titulo">Login</div>
				<Divider variant="middle" />
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