import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { FC, useEffect, useState } from "react";
import { modalRemoveMovimentacao, movimentacaoApagar } from '../../../atoms/atom';
import { TipoMovimentacaoEnum } from '../../../enums/TipoMovimentacaoEnum';
import { MovimentacaoService } from '../../../services/MovimentacaoService';
import { useAlert } from '../../contextProviders/AlertProvider';
import "./ModalApagaMovimentacao.scss";

const ModalApagaMovimentacao: FC = () => {
	const movimentacaoService = new MovimentacaoService();
	const [success, setSuccess] = useState(false);
	const { showAlert, showError } = useAlert();
	const [open, setOpen] = useAtom(modalRemoveMovimentacao);
	const [movimentacao] = useAtom(movimentacaoApagar);
	const tipoMovimentacao = movimentacao?.tipoMovimentacao.toUpperCase()
		=== TipoMovimentacaoEnum.POSITIVO.toString() ? 'rendimento' : 'despesa';

	let date = undefined;
	let id = 0;
	let valor = 0;

	if (movimentacao?.dataMovimentacao !== undefined) {
		const dateString = movimentacao.dataMovimentacao as unknown as string | undefined;
		date = dateString ? new Date(dateString) : undefined;
		id = movimentacao.id ? movimentacao.id : 0
		valor = movimentacao.valor;
	}

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			apagaMovimentacao(id);
		}
	};

	useEffect(() => {
		return () => {
			setSuccess(false);
		}
	}, [open])

	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
		>
			<DialogContent>
				<div className="modal-apaga">
					<div className="titulo">Apagar {tipoMovimentacao}</div>
					<div className="aviso">
						Deseja mesmo apagar a seguinte movimentação:
					</div>
					<div className="headers">
						<p>Data</p>
						<p>Categoria</p>
						<p>Valor</p>
					</div>
					<div className="movimentacao">
						<div className="info">
							{date?.getDate().toString().padStart(2,"0")}
							/{date && date?.getMonth() + 1}
							/{date?.getFullYear()}
						</div>
						<div className="info">
							{movimentacao?.nomeCategoriaMovimentacao}
						</div>
						<div className="info">
							{valor.toFixed(2).replace('.', ',')}
						</div>
					</div>
				</div>
			</DialogContent>
			<DialogActions className='modal-planejamento-butons'>
				<Button onClick={() => setOpen(false)}>
					{success ? "Fechar" : "Cancelar"}
				</Button>
				<Button
					onKeyDown={handleKeyDown}
					onClick={() => apagaMovimentacao(id)}
					disabled={success}
				>
					Apagar
				</Button>
			</DialogActions>
		</Dialog>
	);

	async function apagaMovimentacao(id: number) {
		setSuccess(false);
		const response = await movimentacaoService.apagaMovimentacao(id);
		setSuccess(true);
		setOpen(false);
		if (response?.status === 200) {
			showAlert("Movimentação apagada com sucesso", "success");
		} else {
			showError();
		}
	}
}

export default ModalApagaMovimentacao;