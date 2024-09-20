import { BarChart } from '@mui/x-charts/BarChart';
import { FC } from 'react';
import { TipoMovimentacaoEnum } from '../../../enums/TipoMovimentacaoEnum';
import { ICategoriasVisaoGeralProps } from '../../../interfaces/ICategoriasVisaoGeralProps';
import '../../../paginas/analitico/Analitico.scss';
import './CategoriasVisaoGeral.scss';

const CategoriasVisaoGeral: FC<ICategoriasVisaoGeralProps> = (props: ICategoriasVisaoGeralProps) => {
	const color = props.tipoMovimentacao === TipoMovimentacaoEnum.NEGATIVO
		? "#AD4331" : "#42B84A"

	return (
		<div className='card-visao-geral'>
			<div className="titulo">
				Visão geral
			</div>
			{montaGrafico()}
		</div>
	)

	function montaGrafico() {
		return props.nomeCategorias.length > 0
			&& props.somaCategorias.length > 0
		? <div className='grafic'>
				<BarChart
					xAxis={[
						{
						id: 'barCategories',
						data: props.nomeCategorias,
						scaleType: 'band',
						},
					]}
					series={[
						{
						data: props.somaCategorias,
						color: color
						},
					]}
					margin={{
						left: 50,
						right: 10,
						top: 20,
						bottom: 25,
					}}
				/>
			</div>
		: <div className='mensagem'>
			Nenhum registro para este período!
		</div>
	}
}

export default CategoriasVisaoGeral;