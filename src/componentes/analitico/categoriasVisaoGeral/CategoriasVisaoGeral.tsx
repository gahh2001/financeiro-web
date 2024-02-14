import { BarChart } from '@mui/x-charts/BarChart';
import { FC, useState } from 'react';
import '../../../paginas/analitico/Analitico.scss';
import './CategoriasVisaoGeral.scss';

const CategoriasVisaoGeral: FC = () => {
	const [nomeCategorias, setNomeCategorias] = useState<string[]>(["teste", "teste1", "teste3", "teste4", "teste2"]);
	const [somaCategorias, setSomaCategorias] = useState<number[]>([2, 4, 3, 4, 3.5]);

	return (
		<div className='card-visao-geral'>
			<div className="titulo">
				Visão geral
			</div>
			<div className='grafic'>
				<BarChart
					xAxis={[
						{
						id: 'barCategories',
						data: nomeCategorias,
						scaleType: 'band',
						},
					]}
					series={[
						{
						data: somaCategorias,
						color: "#00B165"
						},
					]}
					margin={{
						left: 35,
						right: 10,
						top: 20,
						bottom: 25,
					}}
				/>
			</div>
		</div>
	)
}

export default CategoriasVisaoGeral;