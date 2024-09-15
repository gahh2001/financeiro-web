import {
	AddCircleOutlineRounded,
	AssessmentOutlined,
	RemoveCircleOutlineRounded
} from '@mui/icons-material';
import { Divider } from '@mui/material';
import { FC } from 'react';
import { TipoMovimentacaoEnum } from '../../../enums/TipoMovimentacaoEnum';
import { InformacoesDoMesProps } from '../../../interfaces/IInformacoesDoMesProps';
import { IMovimentacao } from '../../../interfaces/IMovimentacao';
import './InformacoesDoMes.scss';
import GraficosMensais from './graficosMensais/GraficosMensais';

const InformacoesDoMes: FC<InformacoesDoMesProps> = (props: InformacoesDoMesProps) => {

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
					{somaTotalMes(props.movimentacoesMes, TipoMovimentacaoEnum.POSITIVO).toFixed(2).replace('.', ',')}
				</div>
				<div className="info-mes">
					<div className='simbol'>
						<RemoveCircleOutlineRounded
							sx={{ color: "#e15734db" }}
						/>
					</div>
					Total de gastos do mês: R$
					{somaTotalMes(props.movimentacoesMes, TipoMovimentacaoEnum.NEGATIVO).toFixed(2).replace('.', ',')}
				</div>
				<div className="info-mes">
					<div className='simbol'>
						<AssessmentOutlined
							sx={{ color: "#0085FF" }}
						/>
					</div>
					Você gastou: {calculaPorcentagemTotal(props.movimentacoesMes)}% dos rendimentos.
				</div>
			</div>
			<Divider orientation='vertical'/>
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
