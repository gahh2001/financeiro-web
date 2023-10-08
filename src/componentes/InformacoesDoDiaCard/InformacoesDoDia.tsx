import React, { useEffect, useState } from 'react';
import './InformacoesDoDia.scss';
import {
	AddCircleOutlineRounded,
	InfoOutlined,
	AssessmentOutlined,
	RemoveCircleOutlineRounded,
	ErrorOutline
} from '@mui/icons-material';
import { MovimentacaoService } from '../../services/MovimentacaoService';
import back from '../../http';
import { IMovimentacao } from '../../interfaces/IMovimentacao';
import { ContaService } from '../../services/ContaService';
import { ICategoriaMovimentacao } from '../../interfaces/ICategoriaMovimentacao';
import { CategoriaMovimentacaoService } from '../../services/CategoriaMovimentacaoService';

interface InformacoesDoDiaProps {
	selectedDate: Date;
	modal: () => void;
	tipo: string;
}

const InformacoesDoDia: React.FC<InformacoesDoDiaProps> = ({ selectedDate, modal, tipo }) => {

	const [movimentacoesDoDia, setMovimentacoesDoDia] = useState<IMovimentacao[]>([]);
	const [saldo, setSaldo] = useState<number>();
	const [categoriasMovimentacao, setCategoriasMovimentacao] = useState<ICategoriaMovimentacao[]>([]);

	useEffect(() => {
		const buscaCategoriasMovimentacao = async () => {
			try {
				const categoriaMovimentacaoService = new CategoriaMovimentacaoService(back);
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
					Total de rendimentos: ${somaDia(movimentacoesDoDia, "POSITIVO").toFixed(2).replace('.', ',')}
				</div>
				<div className="info-dia">
					<RemoveCircleOutlineRounded
						color="error"
						fontSize="large"
					>
					</RemoveCircleOutlineRounded>
					Total de gastos: ${somaDia(movimentacoesDoDia, "NEGATIVO").toFixed(2).replace('.', ',')}
				</div>
				<div className="buttons">
					<button 
						style={{ marginRight: "40px" }}
						onClick={modal}
					>
						<AddCircleOutlineRounded
							sx={{ color: "#44A81D" }}
						>
						</AddCircleOutlineRounded><br />
						Adicionar rendimento
					</button>
					<button>
						<RemoveCircleOutlineRounded
							sx={{ color: "#B82121" }}
						>
						</RemoveCircleOutlineRounded><br />
						Adicionar gasto
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

	function somaDia(movimentacoes: IMovimentacao[], tipoMovimentacao: string) {
		let soma = 0;
		for (const movimentacao of movimentacoes) {
			if (movimentacao.tipoMovimentacao.toUpperCase() === tipoMovimentacao) {
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
									{movimentacao.tipoMovimentacao === "positivo"
										? (
											<AddCircleOutlineRounded sx={{ color: "#44A81D" }} />
										)
										: (
											<RemoveCircleOutlineRounded sx={{ color: "#B82121" }} />
										)}
								</div>
								<div className="descricao-movimentacao">
									{getDescricaoCategoriaPorId(movimentacao.idCategoriaMovimentacao)}
								</div>
								<div className="valor-movimentacao">{movimentacao.valor.toFixed(2).replace('.', ',')}</div>
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

};

export default InformacoesDoDia;
