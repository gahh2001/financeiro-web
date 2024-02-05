import { LineChart } from '@mui/x-charts/LineChart';
import { FC } from 'react';
import '../../../paginas/analitico/Analitico.scss';
import './CategoriasEvolucao.scss';

const CategoriasEvolucao: FC = () => {
	const chartsParams = {
		margin: { bottom: 20, left: 25, right: 5 },
		height: 300,
	};

	return (
		<div className='card-categorias-evolucao'>
			<div className="titulo">
				Evolução
			</div>
			<div className="grafic">
				<LineChart
					{...chartsParams}
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

function useState(arg0: string): [any, any] {
	throw new Error('Function not implemented.');
}
