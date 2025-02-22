import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress } from "@mui/material";
import { useAtom } from "jotai";
import { FC, Fragment, useState } from "react";
import { modalTutoriais } from "../../../../atoms/atom";
import "../modalZerar/ModalZerar.scss";
import { useAlert } from "../../../alert/AlertProvider";

const ModalTutoriais: FC = () => {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [open, setOpen] = useAtom(modalTutoriais);
	const { showAlert } = useAlert();

	return (
		<Fragment>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				id='modal-saldo'
			>
				<DialogTitle>Mostrar tutoriais</DialogTitle>
				<DialogContent>
					<div className="modal-zerar">
						<div className="linha">
							Se você continuar, todas as dicas e tutoriais serão exibidos novamente para você.
						</div>
						<div className="linha">
							As dicas podema ajudar você a entender melhor cada funcionalidade da ferramenta
							MyWallet Pro, e foram exibidas para você no seu primeiro acesso.
						</div>
					</div>
				</DialogContent>
				<DialogActions className="modal-editar-saldo">
					<Button onClick={() => setOpen(false)}>
						{success ? "Fechar" : "Cancelar"}
					</Button>
					<Button
						onClick={() => mostrarTutoriais()}
						disabled={success}
					>
						{success ? "Pronto!" : "continuar"}
					</Button>
					<div className='progress'>
						{loading && (
							<Box sx={{ width: '100%' }}>
								<LinearProgress />
							</Box>
						)}
					</div>
				</DialogActions>
			</Dialog>
		</Fragment>
	)

	async function mostrarTutoriais() {
		setSuccess(true);
		localStorage.removeItem("dicaAndamento");
		localStorage.removeItem("dicaCalendario");
		localStorage.removeItem("dicaComparacao");
		localStorage.removeItem("dicaDesempenho");
		localStorage.removeItem("dicaDia");
		localStorage.removeItem("dicaGeral");
		localStorage.removeItem("dicaMes");
		localStorage.removeItem("dicaModalAdd");
		localStorage.removeItem("dicaMoviemtacaoPlano");
		localStorage.removeItem("dicaMovimentacao");
		localStorage.removeItem("dicaPlanejamento");
		setOpen(false);
		showAlert("Os tutoriais serão mostrados novamente", "success");
	}
}

export default ModalTutoriais;