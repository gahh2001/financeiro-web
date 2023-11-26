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
import React, { useEffect, useState } from 'react';
import { TipoMovimentacaoEnum } from '../../enums/TipoMovimentacaoEnum';
import back from '../../http';
import { ICategoriaMovimentacao } from '../../interfaces/ICategoriaMovimentacao';
import { IMovimentacao } from '../../interfaces/IMovimentacao';
import { CategoriaMovimentacaoService } from '../../services/CategoriaMovimentacaoService';
import { ContaService } from '../../services/ContaService';
import { MovimentacaoService } from '../../services/MovimentacaoService';
import './InformacoesDoDia.scss';

interface InformacoesDoDiaProps {
	selectedDate: Date;
	modalAddRendimento: () => void;
	modalAddDespesa: () => void;
	modalApagaMovimentacao: (movimentacaoApagar: IMovimentacao) => void;
}

const InformacoesDoDia: React.FC<InformacoesDoDiaProps> = ({
	selectedDate, modalAddRendimento, modalAddDespesa, modalApagaMovimentacao }) => {

	const [movimentacoesDoDia, setMovimentacoesDoDia] = useState<IMovimentacao[]>([]);
	const [saldo, setSaldo] = useState<number>();
	const [categoriasMovimentacao, setCategoriasMovimentacao] = useState<ICategoriaMovimentacao[]>([]);
	const categoriaMovimentacaoService = new CategoriaMovimentacaoService(back);
	const movimentacaoService = new MovimentacaoService(back);

	useEffect(() => {
		const buscaCategoriasMovimentacao = async () => {
			try {
				const response = await categoriaMovimentacaoService.obtemCategoriasMovimentacaoPorIdConta(1);
				if (response?.data) {
					setCategoriasMovimentacao(response.data);
				}
			} catch (error) {
				console.error('Erro ao buscar categorias de movimentação:', error);
			}
		}
		buscaCategoriasMovimentacao();
	}, []);

	useEffect(() => {
		const buscaMovimentacoesDoDia = async () => {
			try {
				const movimentacaoService = new MovimentacaoService(back);
				const dia = selectedDate;
				const response = await movimentacaoService.getMovimentacao(1,
					dia.getTime(), dia.getTime());
				if (response?.data) {
					setMovimentacoesDoDia(response.data);
				}
			} catch (error) {
				console.error('Erro ao buscar movimentações:', error);
			}
		};
		buscaMovimentacoesDoDia();
	}, [selectedDate]);

	useEffect(() => {
		const atualizaSaldoConta = async () => {
			try {
				const contaService = new ContaService(back);
				const response = await contaService.listaContaPorId(1);
				if (response?.data) {
					setSaldo(response.data.saldoConta);
				}
			} catch (error) {
				console.error('Erro ao buscar saldo:', error);
			}
		};

		atualizaSaldoConta();
	}, [saldo]);

	return (
		<div className="informacoes-do-dia">
			<div className="card-resumo-dia">
				<div className="titulo">
					Resumo do dia {selectedDate.getDate()}/{selectedDate.getMonth() + 1}/{selectedDate.getFullYear()}
				</div>
				<div className="info-dia">
					<AddCircleOutlineRounded
						sx={{ color: "#44A81D" }}
						fontSize="large"
					>
					</AddCircleOutlineRounded>
					Total de rendimentos: $
					{somaDia(movimentacoesDoDia, TipoMovimentacaoEnum.POSITIVO).toFixed(2).replace('.', ',')}
				</div>
				<div className="info-dia">
					<RemoveCircleOutlineRounded
						color="error"
						fontSize="large"
					>
					</RemoveCircleOutlineRounded>
					Total de gastos: $
					{somaDia(movimentacoesDoDia, TipoMovimentacaoEnum.NEGATIVO).toFixed(2).replace('.', ',')}
				</div>
				<div className="buttons">
					<button
						style={{ marginRight: "40px" }}
						onClick={modalAddRendimento}
					>
						<AddCircleOutlineRounded
							sx={{ color: "#44A81D" }}
						>
						</AddCircleOutlineRounded><br/>
						Adicionar rendimento
					</button>
					<button onClick={modalAddDespesa}>
						<RemoveCircleOutlineRounded
							sx={{ color: "#B82121" }}
						>
						</RemoveCircleOutlineRounded><br />
						Adicionar despesa
					</button>
				</div>
				<div className="dica">
					<InfoOutlined
						fontSize="small"
					>
					</InfoOutlined>Selecione um dia do calendário para ver as movimentações.
				</div>
				<div className="saldo">
					<AssessmentOutlined
						sx={{ color: "#3451C7" }}
						fontSize="large"
					>
					</AssessmentOutlined>Saldo atual: ${saldo?.toFixed(2).replace('.', ',')}
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
					</div>
					<div className='movimentacoes-diarias'>
						{movimentacoes.map((movimentacao, index) => (
							<div key={index} className="movimentacao-dia">
								<div className="icon-movimentacao">
									{movimentacao.tipoMovimentacao.toUpperCase() == TipoMovimentacaoEnum.POSITIVO.toString()
										? (<AddCircleOutlineRounded sx={{ color: "#44A81D" }} />)
										: (<RemoveCircleOutlineRounded sx={{ color: "#B82121" }} />)}
								</div>
								<div className="descricao-movimentacao">
									{getDescricaoCategoriaPorId(movimentacao.idCategoriaMovimentacao)}
								</div>
								<div className="valor-movimentacao">
									${movimentacao.valor.toFixed(2).replace('.', ',')}
								</div>
								<div className='buttons'>
									<IconButton color="inherit">
										<ModeEdit />
									</IconButton>
									<button
										onClick={() => modalApagaMovimentacao(movimentacao)}
									>
										<DeleteForever sx={{ color: "#B82121" }} />
									</button>
									
								</div>
							</div>
						))}
					</div>
				</div>
			)
			: <div className='card-movimentacoes' style={{ display: "flex" }}>
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

	function getDescricaoCategoriaPorId(idCategoriaMovimentacao: number) {
		return categoriasMovimentacao.find(categoria =>
			categoria.idCategoriaMovimentacao === idCategoriaMovimentacao)?.nomeCategoria;
	}

	function apagaMovimentacao(idMovimentacao: number) {
		movimentacaoService.apagaMovimentacao(idMovimentacao);
	}
};

export default InformacoesDoDia;
