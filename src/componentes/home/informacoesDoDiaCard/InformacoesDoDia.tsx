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
import { FC, Fragment, useEffect, useState } from 'react';
import { accessToken, modalAddMovimentacao, saldo } from '../../../atoms/atom';
import { TipoMovimentacaoEnum } from '../../../enums/TipoMovimentacaoEnum';
import { useBack } from '../../../http';
import { IInformacoesDoDiaProps } from '../../../interfaces/IInformacoesDoDiaProps';
import { ContaService } from '../../../services/ContaService';
import { Movimentacao } from '../../../types/Movimentacao';
import ConverteIcone from '../../configuracoes/categorias/ConverteIcones';
import { useDialog } from '../../contextProviders/DialogContext';
import './InformacoesDoDia.scss';

const InformacoesDoDia: FC<IInformacoesDoDiaProps> = (props: IInformacoesDoDiaProps) => {
	const [accessTokenAtom] = useAtom(accessToken);
	const [movimentacoesDoDia, setMovimentacoesDoDia] = useState<Movimentacao[]>([]);
	const [saldoAtual, setSaldo] = useAtom(saldo);
	const contaService = new ContaService(useBack());
	const [openModalAdd, setOpenModalApp] = useAtom(modalAddMovimentacao);
	const { showDialog } = useDialog();

	useEffect(() => {
		const buscaMovimentacoesDoDia = async () => {
			if (props.movimentacoesMes.length) {
				const movimentacoes = props.movimentacoesMes
					.filter((movimentacao) =>
						new Date(movimentacao.dataMovimentacao).getUTCDate() === props.selectedDate.getDate()
					)
				setMovimentacoesDoDia(movimentacoes);
			} else {
				setMovimentacoesDoDia([]);
			}
		};
		buscaMovimentacoesDoDia();
	}, [props.selectedDate, openModalAdd, props.modalAddDespesa, props.modalApagaMovimentacao]);

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
		atualizaSaldoConta();
	}, [openModalAdd, props.modalAddDespesa, props.modalApagaMovimentacao]);

	return (
		<div className="informacoes-do-dia">
			<div className="card-resumo-dia">
				<div className="topo">
					<AssessmentOutlined
						sx={{ color: "#3451C7" }}
						fontSize="large"
					/> 
					<div className="saldo">
						Saldo atual: ${props.visivel ? saldoAtual.toFixed(2).replace('.', ',') : "***"}
					</div>
					<Tooltip
						title={props.visivel ? "Ocultar valores" : "Mostrar valores"}
						placement="top"
					>
						<IconButton
							onClick={() => props.setVisible()}
						>
							{props.visivel
								? <RemoveRedEye color='action' />
								: <VisibilityOff color='action' />
							}
						</IconButton>
					</Tooltip>
				</div>
				
				<div className="titulo">
					Resumo do dia {props.selectedDate.getDate().toString().padStart(2,"0")}
					/{props.selectedDate.getMonth() + 1}
					/{props.selectedDate.getFullYear()}
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
						
						onClick={() => setOpenModalApp(true)}
					>
						<AddTaskOutlined
							sx={{ color: "#44A81D" }}
						/> <br/>
						Adicionar rendimento
					</button>
					<button onClick={() => setOpenModalApp(true)}>
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
		return props.visivel ? soma.toFixed(2).replace('.', ',') : "***"
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
											onClick={() => props.handleEditMovimentacao(
												movimentacao.id, props.selectedDate,
												movimentacao.valor.toString(), movimentacao.idCategoriaMovimentacao
												? movimentacao.idCategoriaMovimentacao.toString() : "",
												movimentacao.descricaoMovimentacao,
												movimentacao.tipoMovimentacao === TipoMovimentacaoEnum.POSITIVO.toString()
												? TipoMovimentacaoEnum.POSITIVO : TipoMovimentacaoEnum.NEGATIVO, movimentacao.alteraSaldo
											)}
										>
											<ModeEdit />
										</IconButton>
									</Tooltip>
									<Tooltip
										title="Apagar movimentação"
										placement="left"
									>
										<IconButton
											onClick={() =>
												props.modalApagaMovimentacao(movimentacao)}
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
