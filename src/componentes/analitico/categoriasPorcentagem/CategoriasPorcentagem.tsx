import { PieChart } from '@mui/x-charts/PieChart';
import { FC } from 'react';
import { ICategoriasPorcentagemProps } from '../../../interfaces/ICategoriasPorcentagemProps';
import './CategoriasPorcentagem.scss';

const CategoriasPorcentagem: FC<ICategoriasPorcentagemProps> = (props: ICategoriasPorcentagemProps) => {
	const data = props.fatias;

	return (
		<div className='card-porcentagem'>
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
				series={[
					{
					data,
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