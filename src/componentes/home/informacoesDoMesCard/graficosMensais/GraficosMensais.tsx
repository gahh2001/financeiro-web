import { Divider } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { useAtom } from 'jotai';
import { FC, useEffect, useState } from 'react';
import { accessToken } from '../../../../atoms/atom';
import { useBack } from '../../../../http';
import { InformacoesDoMesProps } from '../../../../interfaces/IInformacoesDoMesProps';
import { CategoriaMovimentacaoService } from '../../../../services/CategoriaMovimentacaoService';
import { SomaCategoriasPorMes } from '../../../../types/SomaCategoriasPorMes';
import './GraficosMensais.scss';

const GraficosMensais: FC<InformacoesDoMesProps> = (props: InformacoesDoMesProps) => {
	const [nomeCategoriasPositivas, setNomeCategoriasPositivas] = useState<string[]>([]);
	const [somaCategoriasPositivas, setSomaCategoriasPositivas] = useState<number[]>([]);
	const [nomeCategoriasNegativas, setNomeCategoriasNegativas] = useState<string[]>([]);
	const [somaCategoriasNegativas, setSomaCategoriasNegativas] = useState<number[]>([]);
	const categoriaMovimentacaoService = new CategoriaMovimentacaoService();
	const [accessTokenAtom] = useAtom(accessToken);

	useEffect(() => {
		const buscaSomaCategorias = async () => {
			try {
				if (accessTokenAtom !== "") {
					const dataInicio = new Date(props.selectedDate);
					dataInicio.setDate(1);
					const dataFim = new Date(props.selectedDate);
					dataFim.setMonth(dataFim.getMonth() + 1);
					dataFim.setDate(0);
					const somaPositivas = await categoriaMovimentacaoService
						.obtemSomaCategoriasEValores(dataInicio.getTime(), dataFim.getTime(), "POSITIVO");
					const somaNegativas = await categoriaMovimentacaoService
						.obtemSomaCategoriasEValores(dataInicio.getTime(), dataFim.getTime(), "NEGATIVO");
					if (somaPositivas?.data) {
						extractSomaCategoriasPositivas(somaPositivas.data)
					}
					if (somaNegativas?.data) {
						extractSomaCategoriasNegativas(somaNegativas.data)
					}
				}
			} catch (error) {
				console.log("Erro ao atualizar soma das categorias")
			}
		};
		buscaSomaCategorias();
	}, [props.movimentacoesMes]);

	return (
		<div className="graficos">
			{obtemGraficoRendimentos()}
			<Divider orientation='vertical'/>
			{obtemGraficoDespesas()}
		</div>
	);

	function extractSomaCategoriasPositivas(somaCategorias: SomaCategoriasPorMes[]) {
		const nomesPositivos: string[] = [];
		const somasPositivas: number[] = [];
		somaCategorias.forEach((result) => {
			nomesPositivos.push(result.nomeCategoria);
			somasPositivas.push(result.somaMovimentacao);
		});
		setNomeCategoriasPositivas(nomesPositivos);
		setSomaCategoriasPositivas(somasPositivas);
	}

	function extractSomaCategoriasNegativas(somaCategorias: SomaCategoriasPorMes[]) {
		const nomesNegativos: string[] = [];
		const somasNegativas: number[] = [];
		somaCategorias.forEach((result) => {
			nomesNegativos.push(result.nomeCategoria);
			somasNegativas.push(result.somaMovimentacao);
		});
		setNomeCategoriasNegativas(nomesNegativos);
		setSomaCategoriasNegativas(somasNegativas);
	}

	function obtemGraficoRendimentos() {
		return nomeCategoriasPositivas.length > 0
			&& somaCategoriasPositivas.length > 0
		? <div className="card-graficos" style={{ marginRight: "0.5%" }}>
				<div className="titulo">Rendimentos</div>
				<div className='grafic'>
					<BarChart
						xAxis={[
							{
							id: 'barCategories',
							data: nomeCategoriasPositivas,
							scaleType: 'band',
							},
						]}
						series={[
							{
							data: somaCategoriasPositivas,
							color: "#42B84A"
							},
						]}
						margin={{
							left: 40,
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
		return nomeCategoriasNegativas.length > 0
			&& somaCategoriasNegativas.length > 0
	? (
		<>
			<div className="card-graficos">
				<div className="titulo">Gastos</div>
				<div className='grafic'>
					<BarChart
						xAxis={[
							{
							id: 'barCategories',
							data: nomeCategoriasNegativas,
							scaleType: 'band',
							},
						]}
						series={[
							{
							data: somaCategoriasNegativas,
							color: "#AD4331"
							},
						]}
						margin={{
							left: 40,
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