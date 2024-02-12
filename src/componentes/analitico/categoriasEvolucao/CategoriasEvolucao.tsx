import { LineChart } from '@mui/x-charts/LineChart';
import { FC, useState } from 'react';
import '../../../paginas/analitico/Analitico.scss';
import './CategoriasEvolucao.scss';

const CategoriasEvolucao: FC = () => {
	const [nomeCategorias, setNomeCategorias] = useState<string[]>(["teste", "teste1", "teste3", "teste4", "teste2"]);

	return (
		<div className='card-categorias-evolucao'>
			<div className="titulo">
				Evolução
			</div>
			<div className="grafic">
				<LineChart
					xAxis={[
						{
						id: 'barCategories',
						data: nomeCategorias,
						scaleType: 'band',
						},
					]}
					series={[
						{
							data: [15, 23, 18, 19, 13],
							label: 'Example',
							color: '#4e79a7',
						},
					]}
					margin={{
						left: 45,
						right: 20,
						top: 50,
						bottom: 25,
					}}
				/>
			</div>
		</div>
	)
}

export default CategoriasEvolucao;
