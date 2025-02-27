import { DeleteForever } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import { FC, useEffect, useState } from "react";
import { TipoMovimentacaoEnum } from '../../../enums/TipoMovimentacaoEnum';
import { useBack } from '../../../http';
import { IModalApagar } from '../../../interfaces/IModalApagar';
import { MovimentacaoService } from '../../../services/MovimentacaoService';
import { useAlert } from '../../contextProviders/AlertProvider';
import "./ModalApagaMovimentacao.scss";

const ModalApagaMovimentacao: FC<IModalApagar> = (props: IModalApagar) => {
	const movimentacaoService = new MovimentacaoService(useBack());
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const { showAlert, showError } = useAlert();
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
	}, [props.closeModalRemove])

	return (
		<>
			{props.isOpen && possuiMovimentacaoEData && !!date &&(
				<div className="modal-overlay-apaga">
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
								/{date.getMonth() + 1}
								/{date?.getFullYear()}
							</div>
							<div className="info">
								{props.movimentacao?.descricaoMovimentacao}
							</div>
							<div className="info">
								{valor.toFixed(2).replace('.', ',')}
							</div>
						</div>
						<div className="buttons">
							<button onClick={props.closeModalRemove}>
								{success ? "Fechar" : "Cancelar"}
							</button>
							<div className='apagar'>
								<button
									onKeyDown={handleKeyDown}
									onClick={() => apagaMovimentacao(id)}
									disabled={success}
								>
									{success 
										? <CheckIcon sx={{color: "green"}}/>
										: <DeleteForever sx={{color: "#B82121"}} />}
								</button>
							</div>
							
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
		</>
	);

	async function apagaMovimentacao(id: number) {
		setLoading(true);
		setSuccess(false);
		const response = await movimentacaoService.apagaMovimentacao(id);
		setLoading(false);
		setSuccess(true);
		props.closeModalRemove();
		if (response?.status === 200) {
			showAlert("Movimentação apagada com sucesso", "success");
		} else {
			showError();
		}
	}
}

export default ModalApagaMovimentacao;