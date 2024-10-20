import { AddCircleOutlineRounded } from "@mui/icons-material";
import CheckIcon from '@mui/icons-material/Check';
import { Box, LinearProgress } from "@mui/material";
import { FC, Fragment, useEffect, useState } from "react";
import back from "../../../../http";
import { IModalCategoriaProps } from "../../../../interfaces/IModalCategoriaProps";
import { ContaService } from "../../../../services/ContaService";
import "./ModalZerar.scss";

const ModalZerar: FC<Partial<IModalCategoriaProps>> = (props: Partial<IModalCategoriaProps>) => {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const contaService = new ContaService(back);

	useEffect(() => {
		setSuccess(false);
	}, [props.closeModal]);

	return (
		<Fragment>
			{ props.isOpen && ( 
				<div className="modal-overlay-zerar">
					<div className="modal-zerar">
						<div className="titulo">
							Zerar saldo
						</div>
						<div className="linha">
							Se você continuar, o seu saldo será zerado, sem afetar nenhuma movimentação.
						</div>
						<br /><br />
						<div className="linha">
							Deseja continuar?
						</div>
						<div className="linha">
							<button onClick={props.closeModal}>
								{success ? "Fechar" : "Cancelar"}
							</button>
							<button
								onClick={() => zerarSaldo()}
								disabled={success}
							>
								{success
									? <CheckIcon sx={{color: "green"}}/>
									: <AddCircleOutlineRounded sx={{ color: "#44A81D" }} />
								}
								{success ? "Zerado" : "Zerar"}
							</button>
						</div>
						<div className='progress'>
							{loading && (
								<Box sx={{ width: '100%' }}>
									<LinearProgress />
								</Box>
							)}
						</div>
					</div>
				</div>
			)}
		</Fragment>
	)

	async function zerarSaldo() {
		let response = undefined;
		setLoading(true);
		setSuccess(false);
		response = await contaService.zeraSaldo(props.googleId);
		setLoading(false);
		setSuccess(true);
	}
}

export default ModalZerar;