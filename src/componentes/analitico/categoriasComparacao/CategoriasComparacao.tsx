import { BarChart } from '@mui/x-charts/BarChart';
import { FC, useState } from 'react';
import '../../../paginas/analitico/Analitico.scss';
import './CategoriasComparacao.scss';

const CategoriasComparacao: FC = () => {
	const [nomeCategorias, setNomeCategorias] = useState<string[]>(["teste", "teste1", "teste2"]);
	const highlightScope = {
		highlighted: 'series',
		faded: 'global',
	} as const;

	const series = [
		{
			label: 'series 1',
			data: [2423, 2210, 764,],
		},
		{
			label: 'series 2',
			data: [2362, 2254, 1962,],
		},
		{
			label: 'series 3',
			data: [1145, 1214, 975,],
		},
		{
			label: 'series 4',
			data: [2361, 979, 2430,],
		},
		{
			label: 'series 5',
			data: [968, 1371, 1381,],
		},
		].map((s) => ({ ...s, highlightScope }));

	return (
		<div className='card-categorias-comparacao'>
			<div className="titulo">
				Comparações
			</div>
			<div className="grafic">
			<BarChart
				xAxis={[
					{
					id: 'barCategories',
					data: nomeCategorias,
					scaleType: 'band',
					},
				]}
				series={series}
				margin={{
					left: 55,
					right: 20,
					top: 50,
					bottom: 25,
				}}
			/>
			</div>
		</div>
	)
}

export default CategoriasComparacao;