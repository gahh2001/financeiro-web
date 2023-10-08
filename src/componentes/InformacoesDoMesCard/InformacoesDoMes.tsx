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

interface InformacoesDoMesProps {
	selectedDate: Date;
}

const InformacoesDoMes: React.FC<InformacoesDoMesProps> = ({ selectedDate }) => {
	const [movimentacoesDoMes, setMovimentacoesDoMes] = useState<IMovimentacao[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const movimentacaoService = new MovimentacaoService(back);
				const primeiroDiaMes = new Date(selectedDate);
				primeiroDiaMes.setDate(1);
				const ultimoDiaMes = new Date(selectedDate);
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
	}, [selectedDate]);

	return (
		<div className="informacoes-do-mes">
			<div className="card-resumo-mes" style={{ marginRight: "0.5%" }}>
				<div className="titulo">
					Resumo de {obtemNomeMes(selectedDate.getMonth())}
				</div>
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
					Você gastou: {calculaPorcentagemTotal(movimentacoesDoMes)}% dos rendimentos.
				</div>
			</div>
			<div className="card-resumo-mes" style={{ marginRight: "0.5%" }}>
				<div className="titulo">Gráfico de rendimentos</div>
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

	function obtemNomeMes(mes: number) {
		switch(mes) {
			case 0: 
				return "Janeiro";
			case 1: 
				return "Fevereiro";
			case 2: 
				return "Março";
			case 3: 
				return "Abril";
			case 4: 
				return "Maio";
			case 5: 
				return "Junho";
			case 6: 
				return "Julho";
			case 7: 
				return "Agosto";
			case 8: 
				return "Setembro";
			case 9: 
				return "Outubro";
			case 10: 
				return "Novembro";
			case 11: 
				return "Dezembro";
			
		}
	}
};

export default InformacoesDoMes;
