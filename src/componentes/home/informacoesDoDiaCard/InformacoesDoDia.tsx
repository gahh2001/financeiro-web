import {
	AddCircleOutlineRounded,
	AssessmentOutlined,
	DeleteForever,
	ErrorOutline,
	InfoOutlined,
	ModeEdit,
	RemoveCircleOutlineRounded
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { FC, useEffect, useState } from 'react';
import { TipoMovimentacaoEnum } from '../../../enums/TipoMovimentacaoEnum';
import back from '../../../http';
import { IMovimentacao } from '../../../interfaces/IMovimentacao';
import { ContaService } from '../../../services/ContaService';
import { MovimentacaoService } from '../../../services/MovimentacaoService';
import './InformacoesDoDia.scss';
import { IInformacoesDoDiaProps } from '../../../interfaces/IInformacoesDoDiaProps';

const InformacoesDoDia: FC<IInformacoesDoDiaProps> = (props: IInformacoesDoDiaProps) => {

	const [movimentacoesDoDia, setMovimentacoesDoDia] = useState<IMovimentacao[]>([]);
	const [saldo, setSaldo] = useState<number>();
	const movimentacaoService = new MovimentacaoService(back);

	useEffect(() => {
		const buscaMovimentacoesDoDia = async () => {
			try {
				const dia = props.selectedDate;
				const response = await movimentacaoService.getMovimentacao(props.googleId,
					dia.getTime(), dia.getTime());
				if (response?.data) {
					setMovimentacoesDoDia(response.data);
				}
			} catch (error) {
				console.error('Erro ao buscar movimentações:', error);
			}
		};
		buscaMovimentacoesDoDia();
	}, [props.selectedDate, props.modalAddDespesa,
		props.modalAddRendimento, props.modalApagaMovimentacao
	]);

	useEffect(() => {
		const atualizaSaldoConta = async () => {
			try {
				const contaService = new ContaService(back);
				const response = await contaService.listaContaPorGoogleId(props.googleId);
				if (response?.data) {
					setSaldo(response.data.saldoConta);
				}
			} catch (error) {
				console.error('Erro ao buscar saldo:', error);
			}
		};

		atualizaSaldoConta();
	}, [saldo, props.modalAddDespesa, props.modalAddRendimento, props.modalApagaMovimentacao]);

	return (
		<div className="informacoes-do-dia">
			<div className="card-resumo-dia">
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
								color="error"
								fontSize="large"
							/>
						</div>
						Total de gastos: $
						{somaDia(movimentacoesDoDia, TipoMovimentacaoEnum.NEGATIVO).toFixed(2).replace('.', ',')}
					</div>
				</div>
				
				<div className="buttons">
					<button
						style={{ marginRight: "40px" }}
						onClick={props.modalAddRendimento}
					>
						<AddCircleOutlineRounded
							sx={{ color: "#44A81D" }}
						/> <br/>
						Adicionar rendimento
					</button>
					<button onClick={props.modalAddDespesa}>
						<RemoveCircleOutlineRounded
							sx={{ color: "#B82121" }}
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
				<div className="saldo">
					<AssessmentOutlined
						sx={{ color: "#3451C7" }}
						fontSize="large"
					/>
					Saldo atual: ${saldo?.toFixed(2).replace('.', ',')}
				</div>
			</div>
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
						<div className="header-categoria">Categoria:</div>
						<div className="header-valor">Valor:</div>
						<div className='header-acoes'>Ações</div>	
					</div>
					<div className='movimentacoes-diarias'>
						{movimentacoes.map((movimentacao, index) => (
							<div key={index} className="movimentacao-dia">
								<div className="icon-movimentacao">
									{movimentacao.tipoMovimentacao.toUpperCase() === TipoMovimentacaoEnum.POSITIVO.toString()
										? (
											<Tooltip
												title="Movimentação positiva"
												placement="left"
											>
												<AddCircleOutlineRounded sx={{ color: "#44A81D" }} />
											</Tooltip>)
										: (
											<Tooltip
												title="Movimentação negativa"
												placement="left"
											>
												<RemoveCircleOutlineRounded sx={{ color: "#B82121" }} />
											</Tooltip>)}
								</div>
								<div className="descricao-movimentacao">
									{movimentacao.nomeCategoriaMovimentacao}
								</div>
								<div className="valor-movimentacao">
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
												sx={{ color: "#3451C7" }}
											/>
										</IconButton>
									</Tooltip>
									<Tooltip
										title="Editar movimentação"
										placement="top"
									>
										<IconButton
											color="inherit"
											onClick={() => props.handleEditMovimentacao(movimentacao.id, movimentacao.dataMovimentacao,
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
											<DeleteForever sx={{ color: "#B82121" }}
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
					sx={{ color: "#B82121" }}
					fontSize='large'
				/> <br />
				Não há movimentações para este dia. <br />
				Selecione um dia para visualizar as movimentações.
			</div>
		</div>
	}
};

export default InformacoesDoDia;
