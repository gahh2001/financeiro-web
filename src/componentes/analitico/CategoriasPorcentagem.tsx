import { PieChart } from '@mui/x-charts/PieChart';
import { FC } from 'react';
import { ICategoriasPorcentagemProps } from '../../interfaces/ICategoriasPorcentagemProps';
import { chartLabelStyle } from '../../utils/ChartUtils';

const CategoriasPorcentagem: FC<ICategoriasPorcentagemProps> = (props: ICategoriasPorcentagemProps) => {
	const data = props.fatias;
	const total = data.reduce((accumulated, slice) => accumulated + slice.value, 0);

	return (
		<div className='card'>
			<div className="titulo">
				Porcentagens
			</div>
			{montaGrafico()}
		</div>
	)

	function montaGrafico() {
		return props.fatias.length
		? <div className="grafic">
			<PieChart
				sx={chartLabelStyle}
				series={[
					{
					data,
					arcLabel: (item) => `${(item.value / total * 100).toFixed(0)}%`,
					arcLabelMinAngle: 20,
					highlightScope: { faded: 'global', highlighted: 'item' },
					faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
					},
				]}
				margin={{
					left: 10,
					right: 250,
					top: 20,
					bottom: 5,
				}}
			/>
		</div>
		: <div className='mensagem'>
			Nenhum registro para este período!
		</div>
	}
}

export default CategoriasPorcentagem;