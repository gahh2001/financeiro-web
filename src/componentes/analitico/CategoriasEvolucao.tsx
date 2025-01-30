import { LineChart } from '@mui/x-charts/LineChart';
import { FC } from 'react';
import { ICategoriasComparacaoProps } from '../../interfaces/ICategoriasComparacaoProps';

const CategoriasEvolucao: FC<ICategoriasComparacaoProps> = (props: ICategoriasComparacaoProps) => {
	return (
		<div className='card'>
			<div className="titulo">
				Evolução taxa Selic
			</div>
			{montaGrafico()}
		</div>
	);

	function montaGrafico() {
		return <div className="grafic">
			<LineChart
				xAxis={[
					{
						id: 'barCategories',
						data: ["11/2024", "12/2024", "01/2025"],
						scaleType: 'band',
					},
				]}
				series={[{ data: [11, 11.5, 13], label: 'Selic' }]}
				margin={{
					left: 50,
					right: 10,
					top: 50,
					bottom: 25,
				}}
			/>
		</div>
	}
}

export default CategoriasEvolucao;
