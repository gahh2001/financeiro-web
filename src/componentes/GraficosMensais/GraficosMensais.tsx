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
	const [nomeCategoriasPositivas] = useState<string[]>([]);
	const [somaCategoriasPositivas] = useState<number[]>([]);
	const [nomeCategoriasNegativas] = useState<string[]>([]);
	const [somaCategoriasNegativas] = useState<number[]>([]);

	useEffect(() => {
		let isMounted = true;
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
		return () => {
			isMounted = false;
		};
	}, [props.dataMes]);

	return nomeCategoriasPositivas.length > 1
			&& somaCategoriasPositivas.length > 1
			&& nomeCategoriasNegativas.length > 1
			&& somaCategoriasNegativas.length > 1
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
		somaCategorias.forEach((result) => {
			if (result.tipoMovimentacao === TipoMovimentacaoEnum.POSITIVO.toString()) {
				nomeCategoriasPositivas.push(result.nomeCategoria);
				somaCategoriasPositivas.push(result.somaMovimentacao);
			} else {
				nomeCategoriasNegativas.push(result.nomeCategoria);
				somaCategoriasNegativas.push(result.somaMovimentacao);
			}
		});
	}
};

export default GraficosMensais;