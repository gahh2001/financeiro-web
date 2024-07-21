import { BarChart } from '@mui/x-charts/BarChart';
import { FC } from 'react';
import { ICategoriasComparacaoProps } from '../../../interfaces/ICategoriasComparacaoProps';
import '../../../paginas/analitico/Analitico.scss';
import './CategoriasComparacao.scss';

const CategoriasComparacao: FC<ICategoriasComparacaoProps> = (props: ICategoriasComparacaoProps) => {
	const highlightScope = {
		highlighted: 'series',
		faded: 'global',
	} as const;

	const series = props.comparacoes?.map((s) => ({ ...s, highlightScope }));

	return series && props.agrupamentosMes ? (
		<div className='card-categorias-comparacao'>
			<div className="titulo">
				Comparações
			</div>
			<div className="grafic">
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
					top: 70,
					bottom: 25,
				}}
			/>
			</div>
		</div>
	) : <></>
}

export default CategoriasComparacao;