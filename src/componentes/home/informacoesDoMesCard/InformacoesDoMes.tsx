import {
	AddCircleOutlineRounded,
	AssessmentOutlined,
	RemoveCircleOutlineRounded
} from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';
import { TipoMovimentacaoEnum } from '../../enums/TipoMovimentacaoEnum';
import back from '../../http';
import { InformacoesDoMesProps } from '../../interfaces/IInformacoesDoMesProps';
import { IMovimentacao } from '../../interfaces/IMovimentacao';
import { MovimentacaoService } from '../../services/MovimentacaoService';
import GraficosMensais from '../GraficosMensais/GraficosMensais';
import './InformacoesDoMes.scss';

const InformacoesDoMes: FC<InformacoesDoMesProps> = (props: InformacoesDoMesProps) => {
	const [movimentacoesDoMes, setMovimentacoesDoMes] = useState<IMovimentacao[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const movimentacaoService = new MovimentacaoService(back);
				const primeiroDiaMes = new Date(props.selectedDate);
				primeiroDiaMes.setDate(1);
				const ultimoDiaMes = new Date(props.selectedDate);
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
	}, [props.selectedDate, props.modalAddDespesa, props.modalAddRendimento, props.modalApagaMovimentacao]);

	return (
		<div className="informacoes-do-mes">
			<div className="card-resumo-mes" style={{ marginRight: "0.5%" }}>
				<div className="titulo">
					Resumo de {obtemNomeMes(props.selectedDate.getMonth())}
				</div>
				<div className="info-mes">
					<div className='simbol'>
						<AddCircleOutlineRounded
						sx={{ color: "#44A81D" }}
					/>
					</div>
					Total recebido no mês: R$
					{somaTotalMes(movimentacoesDoMes, TipoMovimentacaoEnum.POSITIVO).toFixed(2).replace('.', ',')}
				</div>
				<div className="info-mes">
					<div className='simbol'>
						<RemoveCircleOutlineRounded
							sx={{ color: "#B82121" }}
						/>
					</div>
					Total de gastos do mês: R$
					{somaTotalMes(movimentacoesDoMes, TipoMovimentacaoEnum.NEGATIVO).toFixed(2).replace('.', ',')}
				</div>
				<div className="info-mes">
					<div className='simbol'>
						<AssessmentOutlined
							sx={{ color: "#3451C7" }}
						/>
					</div>
					Você gastou: {calculaPorcentagemTotal(movimentacoesDoMes)}% dos rendimentos.
				</div>
			</div>
			<GraficosMensais
				{...props}
			/>
		</div>
	);

	function somaTotalMes(movimentacoes: IMovimentacao[], tipo: TipoMovimentacaoEnum) {
		let soma = 0;
		for (const movimentacao of movimentacoes) {
			if (movimentacao.tipoMovimentacao.toUpperCase() === tipo.toString()) {
				soma += movimentacao.valor;
			}
		}
		return soma;
	}

	function calculaPorcentagemTotal(movimentacoes: IMovimentacao[]) {
		const ganhos = somaTotalMes(movimentacoes, TipoMovimentacaoEnum.POSITIVO);
		const gastos = somaTotalMes(movimentacoes, TipoMovimentacaoEnum.NEGATIVO);
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
