import React, { useEffect, useState } from 'react';
import './InformacoesDoMes.scss';
import {
	AddCircleOutlineRounded,
	AssessmentOutlined,
	RemoveCircleOutlineRounded
} from '@mui/icons-material';
import { IMovimentacao } from '../../interfaces/IMovimentacao';
import { MovimentacaoService } from '../../services/MovimentacaoService';
import back from '../../http';

const InformacoesDoMes: React.FC = () => {
	const [movimentacoesDoMes, setMovimentacoesDoMes] = useState<IMovimentacao[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const movimentacaoService = new MovimentacaoService(back);
				const primeiroDiaMes = new Date();
				primeiroDiaMes.setDate(1);
				const ultimoDiaMes = new Date();
				ultimoDiaMes.setMonth(ultimoDiaMes.getMonth() + 1);
				ultimoDiaMes.setDate(0);
				const response = await movimentacaoService.getMovimentacao(1,
							primeiroDiaMes.getTime(), ultimoDiaMes.getTime());
				if (response?.data) {
					setMovimentacoesDoMes(response.data);
				}
			} catch (error) {
				console.error('Erro ao buscar movimentações:', error);
			}
		};

		fetchData();
	}, []);
	return (
		<div className="informacoes-do-mes">
			<div className="card-resumo-mes" style={{ marginRight: "0.5%" }}>
				<div className="titulo">Resumos do mês</div>
				<div className="info-mes">
					<AddCircleOutlineRounded
						sx={{ color: "#44A81D" }}
					>
					</AddCircleOutlineRounded>
					Total recebido no mês: R${somaTotalMes(movimentacoesDoMes, 'POSITIVO').toFixed(2).replace('.', ',')}
				</div>
				<div className="info-mes">
					<RemoveCircleOutlineRounded
						sx={{ color: "#B82121" }}
					>
					</RemoveCircleOutlineRounded>
					Total de gastos do mês: R${somaTotalMes(movimentacoesDoMes, 'NEGATIVO').toFixed(2).replace('.', ',')}
				</div>
				<div className="info-mes">
					<AssessmentOutlined
						sx={{ color: "#3451C7" }}
					>
					</AssessmentOutlined>
					Você gastou: {calculaPorcentagemTotal(movimentacoesDoMes)}% dos ganhos.
				</div>
			</div>
			<div className="card-resumo-mes" style={{ marginRight: "0.5%" }}>
				<div className="titulo">Gráfico de ganhos</div>
			</div>
			<div className="card-resumo-mes">
				<div className="titulo">Gráfico de gastos</div>
			</div>
		</div>
	);

	function somaTotalMes(movimentacoes: IMovimentacao[], tipo: string) {
		let soma = 0;
		for (const movimentacao of movimentacoes) {
			if (movimentacao.tipoMovimentacao.toUpperCase() === tipo) {
				soma += movimentacao.valor;
			}
		}
		return soma;
	}

	function calculaPorcentagemTotal(movimentacoes: IMovimentacao[]) {
		const ganhos = somaTotalMes(movimentacoes, 'POSITIVO');
		const gastos = somaTotalMes(movimentacoes, 'NEGATIVO');
		const porcentagemGasto = (gastos * 100) / ganhos
		return Math.round(porcentagemGasto? porcentagemGasto : 0);
	}
};

export default InformacoesDoMes;
