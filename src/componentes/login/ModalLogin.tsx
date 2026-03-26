import { CircularProgress, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAtom } from "jotai";
import { FC, Fragment, useEffect, useState } from "react";
import { accessToken, modalLogin, pictureAtom } from "../../atoms/atom";
import { LoginService } from "../../services/LoginService";
import './ModalLogin.scss';

const ModalLogin: FC = () => {
	const [open, setOpen] = useAtom(modalLogin);
	const [, setAccessToken] = useAtom(accessToken);
	const [, setPicture] = useAtom(pictureAtom);
	const [loading, setLoading] = useState(false);
	const service = new LoginService();

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
		setLoading(true);
		const resposta = await service.autentica(response.credential);
		if (resposta && resposta.data && resposta.data.accessToken && resposta.data.urlPicture) {
			setAccessToken(resposta.data.credential);
			setPicture(resposta.data.urlPicture);
			localStorage.setItem('accessToken', resposta.data.accessToken);
			localStorage.setItem('urlPicture', resposta.data.urlPicture);
			window.location.reload(); //isso não tá legal. tive que fazer isso pq a home não renderiza a tempo, ou algo do tipo
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
						{loading
							? <CircularProgress sx={{color: "#48a7dbff"}} size={'35px'}/>
							: <div className="google">
								<div id="buttonDiv"></div>
							</div>
						}
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