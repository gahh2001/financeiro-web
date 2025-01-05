import { ModeEdit } from "@mui/icons-material";
import CheckIcon from '@mui/icons-material/Check';
import { Box, LinearProgress, TextField } from "@mui/material";
import { useAtom } from "jotai";
import { FC, Fragment, useEffect, useState } from "react";
import { googleIdAtom, saldo } from "../../../../atoms/atom";
import back from "../../../../http";
import { IModalCategoriaProps } from "../../../../interfaces/IModalCategoriaProps";
import { ContaService } from "../../../../services/ContaService";
import "./ModalZerar.scss";

const ModalZerar: FC<Partial<IModalCategoriaProps>> = (props: Partial<IModalCategoriaProps>) => {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const contaService = new ContaService(back);
	const [googleId] = useAtom(googleIdAtom);
	const [saldoAtual, setSaldoAtual] = useAtom(saldo);
	const [emptyValor, setEmptyValor] = useState(false);
	const [valor, setValor] = useState("");
	const [, setPrimeiroClique] = useState(false);

	const convertInputValor = (event: any) => {
		let value = event.target.value;
		value = value.replace(/[^0-9]/g, "");
		let numberValue = parseFloat(value) / 100;
		setValor(numberValue.toFixed(2));
	};

	useEffect(() => {
		setSuccess(false);
		setValor("");
		const atualizarSaldo = async () => {
			if (saldoAtual === 0) {
				const response = await contaService.listaContaPorGoogleId(googleId);
				if (response?.data) {
					setSaldoAtual(response.data.saldoConta);
				}
			}
		}
		atualizarSaldo();
	}, [props.closeModal]);

	return (
		<Fragment>
			{ props.isOpen && ( 
				<div className="modal-overlay-zerar">
					<div className="modal-zerar">
						<div className="titulo-zerar">
							Editar saldo
						</div>
						<div className="linha">
							Se você continuar, o seu saldo será editado, sem afetar nenhuma movimentação.
						</div>
						<div className="linha">
							Saldo atual: {saldoAtual.toFixed(2).replace('.', ',')}
						</div>
						<div className="linha">
							<TextField
								required
								error={emptyValor}
								value={valor}
								onChange={convertInputValor}
								inputProps={{ type: 'number', step: "0.5"}}
								sx={{width: "200px" }}
								label= "Novo saldo"
							/>
						</div>
						<div className="linha">
							<button onClick={props.closeModal}>
								{success ? "Fechar" : "Cancelar"}
							</button>
							<button
								onClick={() => editarSaldo()}
								disabled={success}
							>
								{success
									? <CheckIcon sx={{color: "green"}}/>
									: <ModeEdit/>
								}
								{success ? "Pronto!" : "Editar"}
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

	async function editarSaldo() {
		setPrimeiroClique(true);
		if (valor === "") {
			setEmptyValor(true);
			return;
		}
		setLoading(true);
		setSuccess(false);
		await contaService.editarSaldo(googleId, valor);
		setLoading(false);
		setSuccess(true);
		setSaldoAtual(Number(valor));
	}
}

export default ModalZerar;