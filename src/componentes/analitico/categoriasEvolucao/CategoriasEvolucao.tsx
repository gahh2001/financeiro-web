import { LineChart } from '@mui/x-charts/LineChart';
import { FC } from 'react';
import { ICategoriasComparacaoProps } from '../../../interfaces/ICategoriasComparacaoProps';
import '../../../paginas/analitico/Analitico.scss';
import './CategoriasEvolucao.scss';

const CategoriasEvolucao: FC<ICategoriasComparacaoProps> = (props: ICategoriasComparacaoProps) => {
	return (
		<div className='card-categorias-evolucao'>
			<div className="titulo">
				Evolução
			</div>
			{montaGrafico()}
		</div>
	);

	function montaGrafico() {
		return props.evolucao && props.evolucao.length && props.agrupamentosMes
			&& props.agrupamentosMes.length && props.agrupamentosMes.length === props.evolucao[0].data.length
		? <div className="grafic">
			<LineChart
				xAxis={[
					{
					id: 'barCategories',
					data: props.agrupamentosMes,
					scaleType: 'band',
					},
				]}
				series={props.evolucao}
				margin={{
					left: 50,
					right: 10,
					top: 50,
					bottom: 25,
				}}
			/>
		</div>
		: <div className='mensagem'>
			Nenhum registro para este período!
		</div>
	}
}

export default CategoriasEvolucao;
