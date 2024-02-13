import { PieChart } from '@mui/x-charts/PieChart';
import { FC } from 'react';
import './CategoriasPorcentagem.scss';

const CategoriasPorcentagem: FC = () => {
	const data = [
		{ id: 0, value: 10, label: 'teste A' },
		{ id: 1, value: 15, label: 'teste B' },
		{ id: 2, value: 20, label: 'teste C' },
		{ id: 3, value: 25, label: 'teste D' }
	];

	return (
		<div className='card-porcentagem'>
			<div className="titulo">
				Porcentagens
			</div>
			<div className="grafic">
			<PieChart
				series={[
					{
					data,
					highlightScope: { faded: 'global', highlighted: 'item' },
					faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
					},
				]}
				margin={{
					left: 1,
					right: 90,
					top: 20,
					bottom: 5,
				}}
			/>
			</div>
		</div>
	)
}

export default CategoriasPorcentagem;