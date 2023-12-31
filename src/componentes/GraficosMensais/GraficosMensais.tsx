import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import { TipoMovimentacaoEnum } from '../../enums/TipoMovimentacaoEnum';
import back from '../../http';
import { SomaCategoriasPorMes } from '../../interfaces/SomaCategoriasPorMes';
import { CategoriaMovimentacaoService } from '../../services/CategoriaMovimentacaoService';
import './GraficosMensais.scss';

interface GraficosMensaisProps {
	dataMes: Date
}

const GraficosMensais: React.FC<GraficosMensaisProps> = (props: GraficosMensaisProps) => {
	const [nomeCategoriasPositivas, setNomeCategoriasPositivas] = useState<string[]>([]);
	const [somaCategoriasPositivas, setSomaCategoriasPositivas] = useState<number[]>([]);
	const [nomeCategoriasNegativas, setNomeCategoriasNegativas] = useState<string[]>([]);
	const [somaCategoriasNegativas, setSomaCategoriasNegativas] = useState<number[]>([]);

	useEffect(() => {
		const buscaSomaCategorias = async () => {
			try {
				const categoriaMovimentacaoService = new CategoriaMovimentacaoService(back);
				const response = await categoriaMovimentacaoService
					.obtemSomaCategoriasEValores(1, props.dataMes.getTime());
				if (response?.data) {
					extractSomaCategorias(response.data)
				}
			} catch (error) {
				console.log("Erro ao atualizar soma das categorias")
			}
		};
		buscaSomaCategorias();
	}, [props.dataMes]);

	return nomeCategoriasPositivas.length > 0
			&& somaCategoriasPositivas.length > 0
			&& nomeCategoriasNegativas.length > 0
			&& somaCategoriasNegativas.length > 0
	? (
		<>
			<div className="card-graficos" style={{ marginRight: "0.5%" }}>
				<div className="titulo">Gráfico de rendimentos</div>
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
							left: 30,
							right: 20,
							top: 20,
							bottom: 20,
						}}
					/>
				</div>
			</div>
			<div className="card-graficos">
				<div className="titulo">Gráfico de gastos</div>
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
							left: 30,
							right: 20,
							top: 20,
							bottom: 20,
						}}
					/>
				</div>
			</div>
		</>
	) : <></>;

	function extractSomaCategorias(somaCategorias: SomaCategoriasPorMes[]) {
		
		const nomesPositivos: string[] = [];
		const somasPositivas: number[] = [];
		const nomesNegativos: string[] = [];
		const somasNegativas: number[] = [];

		somaCategorias.forEach((result) => {
		if (result.tipoMovimentacao === TipoMovimentacaoEnum.POSITIVO.toString()) {
			nomesPositivos.push(result.nomeCategoria);
			somasPositivas.push(result.somaMovimentacao);
		} else {
			nomesNegativos.push(result.nomeCategoria);
			somasNegativas.push(result.somaMovimentacao);
		}
		});

		setNomeCategoriasPositivas(nomesPositivos);
		setSomaCategoriasPositivas(somasPositivas);
		setNomeCategoriasNegativas(nomesNegativos);
		setSomaCategoriasNegativas(somasNegativas);
		console.log(nomeCategoriasPositivas);
		console.log(somaCategoriasPositivas);
		console.log(nomeCategoriasNegativas);
		console.log(somaCategoriasNegativas);
	}
};

export default GraficosMensais;