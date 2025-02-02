import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, TextField } from "@mui/material";
import { useAtom } from "jotai";
import { FC, Fragment, useEffect, useState } from "react";
import { googleIdAtom, modalEditSaldo, saldo } from "../../../../atoms/atom";
import back from "../../../../http";
import { ContaService } from "../../../../services/ContaService";
import "./ModalZerar.scss";

const ModalZerar: FC = () => {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [open, setOpen] = useAtom(modalEditSaldo);
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
	}, [open]);

	return (
		<Fragment>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				id='modal-saldo'
			>
				<DialogTitle>Editar saldo</DialogTitle>
				<DialogContent>
					<div className="modal-zerar">
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
					</div>
				</DialogContent>
				<DialogActions className="modal-editar-saldo">
					<Button onClick={() => setOpen(false)}>
						{success ? "Fechar" : "Cancelar"}
					</Button>
					<Button
						onClick={() => editarSaldo()}
						disabled={success}
					>
						{success ? "Pronto!" : "Editar"}
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