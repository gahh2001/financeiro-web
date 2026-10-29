import {
	AddCircleOutlineRounded,
	AddTaskOutlined,
	AssessmentOutlined,
	DeleteForever,
	ErrorOutline,
	InfoOutlined,
	ModeEdit,
	PlaylistRemove,
	RemoveCircleOutlineRounded,
	RemoveRedEye,
	VisibilityOff
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useAtom } from 'jotai';
import { FC, Fragment, useEffect } from 'react';
import {
	accessToken,
	dataSelecionada,
	modalAddMovimentacao,
	modalMovimentacao,
	modalRemoveMovimentacao,
	movimentacaoApagar,
	movimentacaoAtom,
	movimentacoesMes,
	saldo,
	valoresVisiveis
} from '../../../atoms/atom';
import { TipoMovimentacaoEnum } from '../../../enums/TipoMovimentacaoEnum';
import { ContaService } from '../../../services/ContaService';
import { Movimentacao } from '../../../types/Movimentacao';
import ConverteIcone from '../../../utils/ConverteIcones';
import { criaMovimentacaoVazia, getMovementType } from '../../../utils/MovimentacaoUtils';
import { useDialog } from '../../contextProviders/DialogContext';
import './InformacoesDoDia.scss';

const InformacoesDoDia: FC = () => {
	const [accessTokenAtom] = useAtom(accessToken);
	const [saldoAtual, setSaldo] = useAtom(saldo);
	const [movimentacoesDoMes] = useAtom(movimentacoesMes);
	const [diaSelecionado] = useAtom(dataSelecionada);
	const [visivel, setVisivel] = useAtom(valoresVisiveis);
	const [, setMovimentacao] = useAtom(movimentacaoAtom);
	const [, setMovimentacaoApagar] = useAtom(movimentacaoApagar);
	const contaService = new ContaService();
	const [openModalAdd, setOpenModalApp] = useAtom(modalAddMovimentacao);
	const [openModalRemove, setOpenModalRemove] = useAtom(modalRemoveMovimentacao);
	const [, setModalMovimentacao] = useAtom(modalMovimentacao);
	const modalAberto = openModalAdd || openModalRemove;
	const { showDialog } = useDialog();

	const movimentacoesDoDia = movimentacoesDoMes.filter((movimentacao) =>
		new Date(movimentacao.dataMovimentacao).getUTCDate() === diaSelecionado.getDate());

	useEffect(() => {
		const atualizaSaldoConta = async () => {
			try {
				if (accessTokenAtom !== "") {
					const response = await contaService.obtemConta();
					if (response?.data) {
						setSaldo(response.data.saldoConta);
					}
				}
			} catch (error) {
				console.error('Erro ao buscar saldo:', error);
			}
		};
		if (!modalAberto) {
			atualizaSaldoConta();
		}
	}, [modalAberto]);

	const abreModalMovimentacao = (tipo: TipoMovimentacaoEnum, movimentacaoEditar?: Movimentacao) => {
		setModalMovimentacao(tipo);
		setMovimentacao(movimentacaoEditar
			? { ...movimentacaoEditar, dataMovimentacao: diaSelecionado }
			: criaMovimentacaoVazia(tipo, diaSelecionado));
		setOpenModalApp(true);
	};

	const abreModalApagar = (movimentacao: Movimentacao) => {
		setMovimentacaoApagar(movimentacao);
		setOpenModalRemove(true);
	};

	return (
		<div className="informacoes-do-dia">
			<div className="card-resumo-dia">
				<div className="topo">
					<AssessmentOutlined
						sx={{ color: "#3451C7" }}
						fontSize="large"
					/>
					<div className="saldo">
						Saldo atual: ${visivel ? saldoAtual.toFixed(2).replace('.', ',') : "***"}
					</div>
					<Tooltip
						title={visivel ? "Ocultar valores" : "Mostrar valores"}
						placement="top"
					>
						<IconButton
							onClick={() => setVisivel(!visivel)}
						>
							{visivel
								? <RemoveRedEye color='action' />
								: <VisibilityOff color='action' />
							}
						</IconButton>
					</Tooltip>
				</div>

				<div className="titulo">
					Resumo do dia {diaSelecionado.getDate().toString().padStart(2,"0")}
					/{diaSelecionado.getMonth() + 1}
					/{diaSelecionado.getFullYear()}
				</div>
				<div className="infos">
					<div className="info-dia">
						<div className="total">
							Total de rendimentos
						</div> <br />
						<AddCircleOutlineRounded
							sx={{ color: "#44A81D" }}
							fontSize="large"
						/>
						${somaDia(movimentacoesDoDia, TipoMovimentacaoEnum.POSITIVO)}
					</div>
					<div className="info-dia">
						<div className="total">
							Total de gastos
						</div> <br />
						<RemoveCircleOutlineRounded
							sx={{color: "#e15734db"}}
							fontSize="large"
						/>
						${somaDia(movimentacoesDoDia, TipoMovimentacaoEnum.NEGATIVO)}
					</div>
				</div>
				<div className="buttons">
					<button
						onClick={() => abreModalMovimentacao(TipoMovimentacaoEnum.POSITIVO)}
					>
						<AddTaskOutlined
							sx={{ color: "#44A81D" }}
						/> <br/>
						Adicionar rendimento
					</button>
					<button onClick={() => abreModalMovimentacao(TipoMovimentacaoEnum.NEGATIVO)}>
						<PlaylistRemove
							sx={{ color: "#e15734db" }}
						/> <br />
						Adicionar despesa
					</button>
				</div>
			</div>
			<div className="divider"></div>
			{listaMovimentacoesDoDia(movimentacoesDoDia)}
		</div>
	);

	function somaDia(movimentacoes: Movimentacao[], tipoMovimentacao: TipoMovimentacaoEnum) {
		let soma = 0;
		for (const movimentacao of movimentacoes) {
			if (movimentacao.tipoMovimentacao.toUpperCase() === tipoMovimentacao.toString()) {
				soma += movimentacao.valor;
			}
		}
		return visivel ? soma.toFixed(2).replace('.', ',') : "***"
	}

	function listaMovimentacoesDoDia(movimentacoes: Movimentacao[]) {
		return (
				<div className='card-movimentacoes'>
					<div className="titulo">Movimentações</div>
					<div className="dica">
						<InfoOutlined
							fontSize="small"
						/>
						Selecione um dia do calendário para ver as movimentações.
					</div>
					{movimentacoes && movimentacoes.length > 0
			? (<Fragment>
				<div className="header">
						<p>Categoria:</p>
						<p>Valor:</p>
						<p>Ações</p>
					</div>
					<div className='movimentacoes-diarias'>
						{movimentacoes.map((movimentacao, index) => (
							<div key={index} className="movimentacao-dia">
								<div className="icon-movimentacao">
									<ConverteIcone icone={movimentacao.icone} corIcone={movimentacao.corIcone} />
								</div>
								<div className="descricao-movimentacao">
									{movimentacao.nomeCategoriaMovimentacao}
								</div>
								<div className={movimentacao.tipoMovimentacao}>
									${movimentacao.valor.toFixed(2).replace('.', ',')}
								</div>
								<div className='buttons'>
									<Tooltip
										title="Ver descrição da movimentação"
										placement="top"
									>
										<IconButton
											onClick={() => showDialog(movimentacao.descricaoMovimentacao)}
										>
											<InfoOutlined
												sx={{ color: "#0085FF" }}
											/>
										</IconButton>
									</Tooltip>
									<Tooltip
										title="Editar movimentação"
										placement="top"
									>
										<IconButton
											color="inherit"
											onClick={() => abreModalMovimentacao(getMovementType(movimentacao), movimentacao)}
										>
											<ModeEdit />
										</IconButton>
									</Tooltip>
									<Tooltip
										title="Apagar movimentação"
										placement="left"
									>
										<IconButton
											onClick={() => abreModalApagar(movimentacao)}
										>
											<DeleteForever sx={{ color: "#e15734db" }}
										/>
										</IconButton>
									</Tooltip>
								</div>
							</div>
						))}
					</div> </Fragment>)
					: (<Fragment>
						<div className='nenhum'>
							<ErrorOutline
								sx={{ color: "#e15734db" }}
								fontSize='large'
							/>
							Não há movimentações para este dia
						</div>
					</Fragment>)}
				</div>
			)
	}
};

export default InformacoesDoDia;
