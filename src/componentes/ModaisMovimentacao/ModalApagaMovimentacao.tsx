import { DeleteForever } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import { green } from "@mui/material/colors";
import { ReactNode, useEffect, useRef, useState } from "react";
import { TipoMovimentacaoEnum } from "../../enums/TipoMovimentacaoEnum";
import back from '../../http';
import { IMovimentacao } from "../../interfaces/IMovimentacao";
import { CategoriaMovimentacaoService } from "../../services/CategoriaMovimentacaoService";
import { MovimentacaoService } from "../../services/MovimentacaoService";
import "./ModalApagaMovimentacao.scss";

interface ModalType {
	children?: ReactNode;
	isOpen: boolean;
	tipo: TipoMovimentacaoEnum;
	closeModalRemove: () => void;
	movimentacao: IMovimentacao | null;
}

export default function ModalApagaMovimentacao(props: ModalType) {
	const movimentacaoService = new MovimentacaoService(back);
	const categoriaMovimentacaoService = new CategoriaMovimentacaoService(back);
	const [categoriaMovimentacao, setCategoriaMovimentacao] = useState<string>();
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const tipoMovimentacao = props.tipo === TipoMovimentacaoEnum.POSITIVO ? 'rendimento' : 'despesa';
	const timer = useRef<number>();
	const possuiMovimentacaoEData = props?.movimentacao != undefined
		&& props.movimentacao?.dataMovimentacao != undefined;

	const buttonSx = {
		...(success && {
			bgcolor: green[500],
			'&:hover': {
				bgcolor: green[700],
			},
		}),
	};

	const handleButtonClick = () => {
		if (!loading) {
			setSuccess(false);
			setLoading(true);
			timer.current = window.setTimeout(() => {
				setSuccess(true);
				setLoading(false);
			}, 2000);
		}
	};
	

	let date = undefined;
	let id = 0;
	let idCategoria = 0;
	let valor = 0;
	if (possuiMovimentacaoEData) {
		const dateString = props.movimentacao?.dataMovimentacao as string | undefined;
		date = dateString ? new Date(dateString) : undefined;
		id = props.movimentacao ? props.movimentacao.id : 0
		idCategoria = props.movimentacao ? props.movimentacao.idCategoriaMovimentacao : 0;
		valor = props.movimentacao ? props.movimentacao.valor : 0
	}

	useEffect(() => {
		return () => {
		  clearTimeout(timer.current);
		};
	}, []);

	useEffect(() => {
		return () => {
			setSuccess(false);
		}
	}, [props.closeModalRemove])

	useEffect(() => {
		const fetchData = async () => {
			const descricao = await getDescricaoCategoriaPorId(idCategoria);
			setCategoriaMovimentacao(descricao);
		};
		fetchData();
	}, [idCategoria]);

	return (
		<>
			{props.isOpen && possuiMovimentacaoEData && !!date &&(
				<div className="modal-overlay">
					<div className="modal-box">
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
								{categoriaMovimentacao}
							</div>
							<div className="info">
								{valor.toFixed(2).replace('.', ',')}
							</div>
						</div>
						<div className="buttons">
							<button onClick={props.closeModalRemove}>
								Cancelar
							</button>
							<div className='apagar'>
								<button
									onClick={() => apagaMovimentacao(id)}
								>
									{success 
										? <CheckIcon sx={{fontSize: "50px", color: "green"}}/>
										: <DeleteForever sx={{ fontSize: "50px", color: "#B82121" }} />}
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
		const response = await movimentacaoService.apagaMovimentacao(id);
		if (response) {
			handleButtonClick();
		}
		//props.closeModalRemove();
	}

	async function getDescricaoCategoriaPorId(idCategoriaMovimentacao: number) {
		try {
			const categoria = await categoriaMovimentacaoService
				.obtemCategoriaMovimentacaoPorId(idCategoriaMovimentacao);
			if (categoria) {
				return categoria.nomeCategoria
			}
			console.log("Erro ao obter a categoria id: ", idCategoriaMovimentacao)
		} catch (error) {
			return "Erro ao obter a categoria"
		}
		
	}
}
