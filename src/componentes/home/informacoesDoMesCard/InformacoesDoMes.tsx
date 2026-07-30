import {
	AddCircleOutlineRounded,
	AssessmentOutlined,
	RemoveCircleOutlineRounded
} from '@mui/icons-material';
import { useAtom } from 'jotai';
import { FC } from 'react';
import { dataSelecionada, movimentacoesMes, valoresVisiveis } from '../../../atoms/atom';
import { TipoMovimentacaoEnum } from '../../../enums/TipoMovimentacaoEnum';
import { Movimentacao } from '../../../types/Movimentacao';
import './InformacoesDoMes.scss';
import GraficosMensais from './graficosMensais/GraficosMensais';

const InformacoesDoMes: FC = () => {
	const [movimentacoesDoMes] = useAtom(movimentacoesMes);
	const [diaSelecionado] = useAtom(dataSelecionada);
	const [visivel] = useAtom(valoresVisiveis);

	return (
		<div className="informacoes-do-mes">
			<div className="card-resumo-mes">
				<div className="titulo">
					Resumo de {obtemNomeMes(diaSelecionado.getMonth())}
				</div>
				<div className="infos">
					<div className="info-mes">
						<div className='simbol'>
							<AddCircleOutlineRounded
							sx={{ color: "#44A81D" }}
						/>
						</div>
						Total recebido no mês: R$
						{visivel
							? somaTotalMes(movimentacoesDoMes, TipoMovimentacaoEnum.POSITIVO).toFixed(2).replace('.', ',')
							: "***"
						}
					</div>
					<div className="info-mes">
						<div className='simbol'>
							<RemoveCircleOutlineRounded
								sx={{ color: "#e15734db" }}
							/>
						</div>
						Total de gastos do mês: R$
						{visivel
							? somaTotalMes(movimentacoesDoMes, TipoMovimentacaoEnum.NEGATIVO).toFixed(2).replace('.', ',')
							: "***"
						}
					</div>
					<div className="info-mes">
						<div className='simbol'>
							<AssessmentOutlined
								sx={{ color: "#0085FF" }}
							/>
						</div>
						Você gastou: {calculaPorcentagemTotal(movimentacoesDoMes)}% dos rendimentos.
					</div>
				</div>
			</div>
			<GraficosMensais/>
		</div>
	);

	function somaTotalMes(movimentacoes: Movimentacao[], tipo: TipoMovimentacaoEnum) {
		let soma = 0;
		for (const movimentacao of movimentacoes) {
			if (movimentacao.tipoMovimentacao.toUpperCase() === tipo.toString()) {
				soma += movimentacao.valor;
			}
		}
		return soma;
	}

	function calculaPorcentagemTotal(movimentacoes: Movimentacao[]) {
		const ganhos = somaTotalMes(movimentacoes, TipoMovimentacaoEnum.POSITIVO);
		const gastos = somaTotalMes(movimentacoes, TipoMovimentacaoEnum.NEGATIVO);
		const porcentagemGasto = (gastos * 100) / ganhos;
		const resultado = Math.round(porcentagemGasto? porcentagemGasto : 0);
		return gastos > ganhos ? '+100' : resultado;
	}

	function obtemNomeMes(mes: number) {
		const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
			"Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
		return months[mes];
	}
};

export default InformacoesDoMes;
