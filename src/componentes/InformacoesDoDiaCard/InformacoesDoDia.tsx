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

interface InformacoesDoDiaProps {
	selectedDate: Date;
}

const InformacoesDoDia: React.FC<InformacoesDoDiaProps> = ({ selectedDate }) => {

	const [movimentacoesDoDia, setMovimentacoesDoDia] = useState<IMovimentacao[]>([]);

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

	return (
		<div className="informacoes-do-dia">
			<div className="card-resumo-dia">
				<div className="titulo">
					Resumo do dia {selectedDate.getDate()}/{selectedDate.getMonth() +1}/{selectedDate.getFullYear() }
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
							fontSize="inherit"
						>
						</AddCircleOutlineRounded>
					</button>
					<button>
						<RemoveCircleOutlineRounded
							sx={{ color: "#B82121" }}
							fontSize="inherit"
						>
						</RemoveCircleOutlineRounded>
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
					</AssessmentOutlined>Saldo atual: $0,00
				</div>
			</div>
			<div className="card-movimentacoes">
				<div className="titulo">Movimentações:</div>
				<div className="header">
					<div className="header-vazio"></div>
					<div className="header-categoria">Categoria:</div>
					<div className="header-valor">Valor:</div>
				</div>

				<div className="movimentacao-dia">
					<div className="icon-movimentacao">
						<AddCircleOutlineRounded
							sx={{ color: "#44A81D" }}
							fontSize="large"
						>
						</AddCircleOutlineRounded>

					</div>
					<div className="descricao-movimentacao">Aluguel</div>
					<div className="valor-movimentacao">$500,00</div>
				</div>
				<div className="movimentacao-dia">
					<div className="icon-movimentacao">
						<RemoveCircleOutlineRounded
							sx={{ color: "#B82121" }}
							fontSize="large"
						>
						</RemoveCircleOutlineRounded>

					</div>
					<div className="descricao-movimentacao">Aluguel</div>
					<div className="valor-movimentacao">$500,00</div>
				</div>
				<div className="movimentacao-dia">
					<div className="icon-movimentacao">
						<AddCircleOutlineRounded
							sx={{ color: "#44A81D" }}
							fontSize="large"
						>
						</AddCircleOutlineRounded>

					</div>
					<div className="descricao-movimentacao">Aluguel</div>
					<div className="valor-movimentacao">$500,00</div>
				</div>
				<div className="movimentacao-dia">
					<div className="icon-movimentacao">
						<RemoveCircleOutlineRounded
							sx={{ color: "#B82121" }}
							fontSize="large"
						>
						</RemoveCircleOutlineRounded>

					</div>
					<div className="descricao-movimentacao">Aluguel</div>
					<div className="valor-movimentacao">$500,00</div>
				</div>
				<div className="movimentacao-dia">
					<div className="icon-movimentacao">
						<AddCircleOutlineRounded
							sx={{ color: "#44A81D" }}
							fontSize="large"
						>
						</AddCircleOutlineRounded>

					</div>
					<div className="descricao-movimentacao">Aluguel</div>
					<div className="valor-movimentacao">$500,00</div>
				</div>
				<div className="movimentacao-dia">
					<div className="icon-movimentacao">
						<RemoveCircleOutlineRounded
							sx={{ color: "#B82121" }}
							fontSize="large"
						>
						</RemoveCircleOutlineRounded>

					</div>
					<div className="descricao-movimentacao">Aluguel</div>
					<div className="valor-movimentacao">$500,00</div>
				</div>
				<div className="movimentacao-dia">
					<div className="icon-movimentacao">
						<AddCircleOutlineRounded
							sx={{ color: "#44A81D" }}
							fontSize="large"
						>
						</AddCircleOutlineRounded>

					</div>
					<div className="descricao-movimentacao">Aluguel</div>
					<div className="valor-movimentacao">$500,00</div>
				</div>
				<div className="movimentacao-dia">
					<div className="icon-movimentacao">
						<RemoveCircleOutlineRounded
							sx={{ color: "#B82121" }}
							fontSize="large"
						>
						</RemoveCircleOutlineRounded>

					</div>
					<div className="descricao-movimentacao">Aluguel</div>
					<div className="valor-movimentacao">$500,00</div>
				</div>
				<div className="movimentacao-dia">
					<div className="icon-movimentacao">
						<AddCircleOutlineRounded
							sx={{ color: "#44A81D" }}
							fontSize="large"
						>
						</AddCircleOutlineRounded>

					</div>
					<div className="descricao-movimentacao">Aluguel</div>
					<div className="valor-movimentacao">$500,00</div>
				</div>
				<div className="movimentacao-dia">
					<div className="icon-movimentacao">
						<RemoveCircleOutlineRounded
							sx={{ color: "#B82121" }}
							fontSize="large"
						>
						</RemoveCircleOutlineRounded>

					</div>
					<div className="descricao-movimentacao">Aluguel</div>
					<div className="valor-movimentacao">$500,00</div>
				</div>
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
};

export default InformacoesDoDia;
