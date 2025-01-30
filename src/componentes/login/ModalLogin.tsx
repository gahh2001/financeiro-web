import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAtom } from "jotai";
import { FC, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { googleIdAtom, modalLogin, pictureAtom } from "../../atoms/atom";
import back from "../../http";
import { LoginService } from "../../services/LoginService";
import './ModalLogin.scss';

const ModalLogin: FC = () => {
	const navigate = useNavigate();
	const [open, setOpen] = useAtom(modalLogin);
	const [, setGoogleId] = useAtom(googleIdAtom);
	const [, setPicture] = useAtom(pictureAtom);

	useEffect(() => {
		if (!open) return;
		setTimeout(() => {
			const buttonDiv = document.getElementById("buttonDiv");
			if (buttonDiv && window.google?.accounts) {
				google.accounts.id.initialize({
					client_id: "536894210778-998102hp7nml43ape8dtkpviiuvaj4ds.apps.googleusercontent.com",
					callback: handleCredentialResponse,
				});
				google.accounts.id.renderButton(buttonDiv, {
					type: "standard",
					theme: "filled_black",
					size: "large",
					shape: "circle",
				});
				google.accounts.id.prompt();
			}
		}, 100);
	}, [open]);

	async function handleCredentialResponse(response: any) {
		const service = new LoginService(back);
		const resposta = await service.autentica(response.credential);
		if (resposta && resposta.data && resposta.data.credential && resposta.data.picture) {
			localStorage.setItem('googleId', resposta.data.credential);
			localStorage.setItem('urlPicture', resposta.data.picture);
			setGoogleId(resposta.data.credential);
			setPicture(resposta.data.picture);
			navigate("/home");
		}
	}

	return (
		<Fragment>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				id='modal-login-dialog'
			>
				<DialogTitle id="titulo-modal-paper-root" >Login</DialogTitle>
				<DialogContent>
					<div className='card-login'>
						<div className="texto">
							Entre com sua conta do Google para acessar o MyWallet Pro.
						</div>
						<div className="google">
							<div id="buttonDiv"></div>
						</div>
						<div className="texto">
							Se você já possui cadastro, é só continuar com a conta Google também. Prático, não? 🙂
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</Fragment>
	);
}

export default ModalLogin;