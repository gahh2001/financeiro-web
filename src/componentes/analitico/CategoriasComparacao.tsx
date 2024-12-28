import { BarChart } from '@mui/x-charts/BarChart';
import { FC } from 'react';
import { ICategoriasComparacaoProps } from '../../interfaces/ICategoriasComparacaoProps';

const CategoriasComparacao: FC<ICategoriasComparacaoProps> = (props: ICategoriasComparacaoProps) => {
	const highlightScope = {
		highlighted: 'series',
		faded: 'global',
	} as const;

	const series = props.comparacoes?.map((s) => ({ ...s, highlightScope }));

	return (
		<div className='card'>
			<div className="titulo">
				Comparações
			</div>
			{montaGrafico()}
		</div>
	);

	function montaGrafico() {
		return series && props.comparacoes && props.comparacoes.length
		? <div className="grafic">
			<BarChart
				xAxis={[
					{
					id: 'barCategories',
					data: props.agrupamentosMes,
					scaleType: 'band',
					},
				]}
				series={series}
				margin={{
					left: 45,
					right: 10,
					top: 100,
					bottom: 25,
				}}
			/>
		</div>
		: <div className='mensagem'>
			Nenhum registro para este período!
		</div>
	}
}

export default CategoriasComparacao;