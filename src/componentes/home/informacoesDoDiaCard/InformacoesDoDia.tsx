import {
	AddCircleOutlineRounded,
	AddTaskOutlined,
	AssessmentOutlined,
	DeleteForever,
	ErrorOutline,
	InfoOutlined,
	ModeEdit,
	PlaylistRemove,
	RemoveCircleOutlineRounded
} from '@mui/icons-material';
import { Divider, IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { FC, useEffect, useState } from 'react';
import { TipoMovimentacaoEnum } from '../../../enums/TipoMovimentacaoEnum';
import back from '../../../http';
import { IInformacoesDoDiaProps } from '../../../interfaces/IInformacoesDoDiaProps';
import { IMovimentacao } from '../../../interfaces/IMovimentacao';
import ConverteIcone from '../../../paginas/configuracoes/ConverteIcones';
import { ContaService } from '../../../services/ContaService';
import './InformacoesDoDia.scss';

const InformacoesDoDia: FC<IInformacoesDoDiaProps> = (props: IInformacoesDoDiaProps) => {

	const [movimentacoesDoDia, setMovimentacoesDoDia] = useState<IMovimentacao[]>([]);
	const [saldo, setSaldo] = useState<number>();

	useEffect(() => {
		const buscaMovimentacoesDoDia = async () => {
			if ( props.movimentacoesMes.length ) {
				const teste = new Date(props.movimentacoesMes[0].dataMovimentacao).getUTCDate();
				debugger;
				const movimentacoes = props.movimentacoesMes
					.filter((movimentacao) =>
						new Date(movimentacao.dataMovimentacao).getUTCDate() === props.selectedDate.getDate()
					)
				setMovimentacoesDoDia(movimentacoes);
			}
		};
		buscaMovimentacoesDoDia();
	}, [props.selectedDate, props.modalAddRendimento, props.modalAddDespesa, props.modalApagaMovimentacao]);

	useEffect(() => {
		const atualizaSaldoConta = async () => {
			try {
				if (props.googleId !== "") {
					const contaService = new ContaService(back);
					const response = await contaService.listaContaPorGoogleId(props.googleId);
					if (response?.data) {
						setSaldo(response.data.saldoConta);
					}
				}
			} catch (error) {
				console.error('Erro ao buscar saldo:', error);
			}
		};
		atualizaSaldoConta();
	}, [props.modalAddRendimento, props.modalAddDespesa, props.modalApagaMovimentacao]);

	return (
		<div className="informacoes-do-dia">
			<div className="card-resumo-dia">
				<div className="saldo">
					<AssessmentOutlined
						sx={{ color: "#3451C7" }}
						fontSize="large"
					/>
					Saldo atual: ${saldo ? saldo.toFixed(2).replace('.', ',') : 0}
				</div>
				<Divider variant='middle'/>
				<div className="titulo">
					Resumo do dia {props.selectedDate.getDate().toString().padStart(2,"0")}
					/{props.selectedDate.getMonth() + 1}
					/{props.selectedDate.getFullYear()}
				</div>
				<div className="infos">
					<div className="info-dia">
						<div className='simbol'>
							<AddCircleOutlineRounded
								sx={{ color: "#44A81D" }}
								fontSize="large"
							/>
						</div>
						Total de rendimentos: $
						{somaDia(movimentacoesDoDia, TipoMovimentacaoEnum.POSITIVO).toFixed(2).replace('.', ',')}
					</div>
					<div className="info-dia">
						<div className='simbol'>
							<RemoveCircleOutlineRounded
								sx={{color: "#e15734db"}}
								fontSize="large"
							/>
						</div>
						Total de gastos: $
						{somaDia(movimentacoesDoDia, TipoMovimentacaoEnum.NEGATIVO).toFixed(2).replace('.', ',')}
					</div>
				</div>
				
				<div className="buttons">
					<button
						
						onClick={props.modalAddRendimento}
					>
						<AddTaskOutlined
							sx={{ color: "#44A81D" }}
						/> <br/>
						Adicionar rendimento
					</button>
					<button onClick={props.modalAddDespesa}>
						<PlaylistRemove
							sx={{ color: "#e15734db" }}
						/> <br />
						Adicionar despesa
					</button>
				</div>
				<div className="dica">
					<InfoOutlined
						fontSize="small"
					/>
					Selecione um dia do calendário para ver as movimentações.
				</div>
			</div>
			<Divider variant='middle'/>
			{listaMovimentacoesDoDia(movimentacoesDoDia)}
		</div>
	);

	function somaDia(movimentacoes: IMovimentacao[], tipoMovimentacao: TipoMovimentacaoEnum) {
		let soma = 0;
		for (const movimentacao of movimentacoes) {
			if (movimentacao.tipoMovimentacao.toUpperCase() === tipoMovimentacao.toString()) {
				soma += movimentacao.valor;
			}
		}
		return soma;
	}

	function listaMovimentacoesDoDia(movimentacoes: IMovimentacao[]) {
		return movimentacoes && movimentacoes.length > 0
			? (
				<div className='card-movimentacoes'>
					<div className="titulo">Movimentações:</div>
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
											onClick={() => props.dialogDescricao(movimentacao.descricaoMovimentacao)}
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
											onClick={() => props.handleEditMovimentacao(movimentacao.id, props.selectedDate,
												movimentacao.valor.toString(), movimentacao.idCategoriaMovimentacao
												? movimentacao.idCategoriaMovimentacao.toString() : "",
												movimentacao.descricaoMovimentacao,
												movimentacao.tipoMovimentacao === TipoMovimentacaoEnum.POSITIVO.toString()
												? TipoMovimentacaoEnum.POSITIVO : TipoMovimentacaoEnum.NEGATIVO)}
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
					</div>
				</div>
			)
		: <div className='card-movimentacoes'>
			<div className='titulo'>
				<ErrorOutline
					sx={{ color: "#e15734db" }}
					fontSize='large'
				/> <br />
				Não há movimentações para este dia. <br />
				Selecione um dia para visualizar as movimentações.
			</div>
		</div>
	}
};

export default InformacoesDoDia;
