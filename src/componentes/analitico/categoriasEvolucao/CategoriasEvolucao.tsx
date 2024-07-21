import { LineChart } from '@mui/x-charts/LineChart';
import { FC } from 'react';
import { ICategoriasComparacaoProps } from '../../../interfaces/ICategoriasComparacaoProps';
import '../../../paginas/analitico/Analitico.scss';
import './CategoriasEvolucao.scss';

const CategoriasEvolucao: FC<ICategoriasComparacaoProps> = (props: ICategoriasComparacaoProps) => {
	if (props.agrupamentosMes && props.evolucao)
	console.log("+++", props.evolucao , props.agrupamentosMes);

	return props.evolucao ? (
		<div className='card-categorias-evolucao'>
			<div className="titulo">
				Evolução
			</div>
			<div className="grafic">
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
						left: 30,
						right: 10,
						top: 50,
						bottom: 25,
					}}
				/>
			</div>
		</div>
	) : <></>
}

export default CategoriasEvolucao;
