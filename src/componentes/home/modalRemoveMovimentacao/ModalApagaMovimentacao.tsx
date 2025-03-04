import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { FC, useEffect, useState } from "react";
import { modalRemoveMovimentacao } from '../../../atoms/atom';
import { TipoMovimentacaoEnum } from '../../../enums/TipoMovimentacaoEnum';
import { useBack } from '../../../http';
import { IModalApagar } from '../../../interfaces/IModalApagar';
import { MovimentacaoService } from '../../../services/MovimentacaoService';
import { useAlert } from '../../contextProviders/AlertProvider';
import "./ModalApagaMovimentacao.scss";

const ModalApagaMovimentacao: FC<IModalApagar> = (props: IModalApagar) => {
	const movimentacaoService = new MovimentacaoService(useBack());
	const [success, setSuccess] = useState(false);
	const { showAlert, showError } = useAlert();
	const [open, setOpen] = useAtom(modalRemoveMovimentacao);
	const tipoMovimentacao = props.tipo === TipoMovimentacaoEnum.POSITIVO ? 'rendimento' : 'despesa';
	const possuiMovimentacaoEData = props?.movimentacao !== undefined
		&& props.movimentacao?.dataMovimentacao !== undefined;

	let date = undefined;
	let id = 0;
	let valor = 0;

	if (possuiMovimentacaoEData) {
		const dateString = props.movimentacao?.dataMovimentacao as string | undefined;
		date = dateString ? new Date(dateString) : undefined;
		id = props.movimentacao?.id ? props.movimentacao.id : 0
		valor = props.movimentacao ? props.movimentacao.valor : 0;
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
							{props.movimentacao?.nomeCategoriaMovimentacao}
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