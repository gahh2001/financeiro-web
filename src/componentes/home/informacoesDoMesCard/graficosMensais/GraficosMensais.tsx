import { Divider } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { useAtom } from 'jotai';
import { FC } from 'react';
import { movimentacoesMes } from '../../../../atoms/atom';
import { TipoMovimentacaoEnum } from '../../../../enums/TipoMovimentacaoEnum';
import { Movimentacao } from '../../../../types/Movimentacao';
import './GraficosMensais.scss';

type SomaPorCategoria = {
	nomes: string[];
	somas: number[];
};

const GraficosMensais: FC = () => {
	const [movimentacoesDoMes] = useAtom(movimentacoesMes);
	const positivas = somaPorCategoria(movimentacoesDoMes, TipoMovimentacaoEnum.POSITIVO);
	const negativas = somaPorCategoria(movimentacoesDoMes, TipoMovimentacaoEnum.NEGATIVO);

	return (
		<div className="graficos">
			{obtemGraficoRendimentos()}
			<Divider orientation='vertical'/>
			{obtemGraficoDespesas()}
		</div>
	);

	function somaPorCategoria(movimentacoes: Movimentacao[],
			tipo: TipoMovimentacaoEnum): SomaPorCategoria {
		const somaPorNome = new Map<string, number>();
		movimentacoes
			.filter((movimentacao) => movimentacao.tipoMovimentacao.toUpperCase() === tipo.toString())
			.forEach((movimentacao) => {
				const nome = movimentacao.nomeCategoriaMovimentacao
					? movimentacao.nomeCategoriaMovimentacao : "Sem categoria";
				somaPorNome.set(nome, (somaPorNome.get(nome) ?? 0) + movimentacao.valor);
			});
		const ordenadas = Array.from(somaPorNome.entries()).sort((uma, outra) => outra[1] - uma[1]);
		return {
			nomes: ordenadas.map((categoria) => categoria[0]),
			somas: ordenadas.map((categoria) => categoria[1])
		};
	}

	function obtemGraficoRendimentos() {
		return positivas.nomes.length > 0
		? <div className="card-graficos" style={{ marginRight: "0.5%" }}>
				<div className="titulo">Rendimentos</div>
				<div className='grafic'>
					<BarChart
						xAxis={[
							{
							id: 'barCategories',
							data: positivas.nomes,
							scaleType: 'band',
							},
						]}
						series={[
							{
							data: positivas.somas,
							color: "#42B84A"
							},
						]}
						margin={{
							left: 50,
							right: 1,
							top: 20,
							bottom: 20,
						}}
					/>
				</div>
			</div>
		:
			<div className="card-graficos" style={{ marginRight: "0.5%" }}>
				<div className="titulo">Gráfico de rendimentos</div>
				<div className='nenhum-conteudo'>
					Nenhum registro de rendimento para este mês!
				</div>
			</div>
	}

	function obtemGraficoDespesas() {
		return negativas.nomes.length > 0
	? (
		<>
			<div className="card-graficos">
				<div className="titulo">Gastos</div>
				<div className='grafic'>
					<BarChart
						xAxis={[
							{
							id: 'barCategories',
							data: negativas.nomes,
							scaleType: 'band',
							},
						]}
						series={[
							{
							data: negativas.somas,
							color: "#AD4331"
							},
						]}
						margin={{
							left: 50,
							right: 1,
							top: 20,
							bottom: 20,
						}}
					/>
				</div>
			</div>
		</>
	)
	:<div className="card-graficos">
		<div className="titulo">Gráfico de gastos</div>
		<div className='nenhum-conteudo'>
			Nenhum registro de despesa para este mês!
		</div>
	</div>;
	}
};

export default GraficosMensais;
