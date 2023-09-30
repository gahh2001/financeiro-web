import React, { useEffect, useState } from 'react';
import './InformacoesDoDia.scss';
import {
	AddCircleOutlineRounded,
	InfoOutlined,
	AssessmentOutlined,
	RemoveCircleOutlineRounded
} from '@mui/icons-material';
import { MovimentacaoService } from '../../services/MovimentacaoService';
import back from '../../http';
import { IMovimentacao } from '../../interfaces/IMovimentacao';
import { ContaService } from '../../services/ContaService';

interface InformacoesDoDiaProps {
	selectedDate: Date;
}

const InformacoesDoDia: React.FC<InformacoesDoDiaProps> = ({ selectedDate }) => {

	const [movimentacoesDoDia, setMovimentacoesDoDia] = useState<IMovimentacao[]>([]);
	const [saldo, setSaldo] = useState<number>();

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
				console.error('Erro ao buscar movimentações:', error);
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
					Total de ganhos: ${somaDia(movimentacoesDoDia, "POSITIVO").toFixed(2).replace('.', ',')}
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
					<button style={{ marginRight: "40px" }}>
						<AddCircleOutlineRounded
							sx={{ color: "#44A81D" }}
						>
						</AddCircleOutlineRounded><br />
						Adicionar ganho
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
			<div className="card-movimentacoes">
				<div className="titulo">Movimentações:</div>
				<div className="header">
					<div className="header-categoria">Categoria:</div>
					<div className="header-valor">Valor:</div>
				</div>
				{listaMovimentacoesDoDia(movimentacoesDoDia)}
			</div>
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
		return (
			<div className='movimentacoes-diarias'>
				{movimentacoes.map((movimentacao, index) => (
					<div key={index} className="movimentacao-dia">
						<div className="icon-movimentacao">
							{movimentacao.tipoMovimentacao === "positivo" ? (
								<AddCircleOutlineRounded sx={{ color: "#44A81D" }} />
							) : (
								<RemoveCircleOutlineRounded sx={{ color: "#B82121" }} />
							)}
						</div>
						<div className="descricao-movimentacao">{movimentacao.idCategoriaMovimentacao}</div>
						<div className="valor-movimentacao">{movimentacao.valor.toFixed(2).replace('.', ',')}</div>
					</div>
				))}
			</div>
		)
	}
};

export default InformacoesDoDia;
