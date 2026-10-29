import { BarChart } from '@mui/x-charts/BarChart';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { useAtom } from 'jotai';
import { FC, useEffect, useState } from 'react';
import { analyticsFullYear, analyticsYear } from '../../atoms/atom';
import { TipoMovimentacaoEnum } from '../../enums/TipoMovimentacaoEnum';
import { ICategoriasVisaoGeralProps } from '../../interfaces/ICategoriasVisaoGeralProps';
import { CategoriaMovimentacaoService } from '../../services/CategoriaMovimentacaoService';
import { SomaCategoriasPorMes } from '../../types/SomaCategoriasPorMes';
import { amountBarLabel, chartLabelStyle } from '../../utils/ChartUtils';

const CategoriasVisaoGeral: FC<ICategoriasVisaoGeralProps> = (props: ICategoriasVisaoGeralProps) => {
	const color = props.tipoMovimentacao === TipoMovimentacaoEnum.NEGATIVO
		? "#AD4331" : "#42B84A"
	const comparisonColor = "#5482ff";
	const categoriaService = new CategoriaMovimentacaoService();
	const [ano] = useAtom(analyticsYear);
	const [fullYear] = useAtom(analyticsFullYear);
	const [comparisonYear, setComparisonYear] = useState<Dayjs | null>(null);
	const [comparisonSums, setComparisonSums] = useState<SomaCategoriasPorMes[]>([]);
	const isComparing = fullYear && Boolean(comparisonYear);
	const categoryNames = isComparing
		? Array.from(new Set([...props.nomeCategorias, ...comparisonSums.map((soma) => soma.nomeCategoria)]))
		: props.nomeCategorias;

	useEffect(() => {
		const fetchComparisonSums = async () => {
			if (!fullYear || !comparisonYear) {
				setComparisonSums([]);
				return;
			}
			const sums = await categoriaService.obtemSomaCategoriasEValores(
				comparisonYear.startOf('year').valueOf(), comparisonYear.endOf('year').valueOf(),
				props.tipoMovimentacao);
			setComparisonSums(sums?.data ?? []);
		};
		fetchComparisonSums();
	}, [comparisonYear, fullYear, props.tipoMovimentacao]);

	return (
		<div className='card'>
			<div className="titulo">
				Visão geral
			</div>
			{fullYear &&
				<div className="comparacao-ano">
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							label={"Comparar com ano"}
							value={comparisonYear}
							onChange={(newValue) => setComparisonYear(newValue)}
							views={['year']}
							slotProps={{ textField: { size: 'small' } }}
							format='YYYY'
						/>
					</LocalizationProvider>
				</div>
			}
			{montaGrafico()}
		</div>
	)

	function montaGrafico() {
		return categoryNames.length > 0
		? <div className='grafic'>
				<BarChart
					barLabel={amountBarLabel}
					sx={chartLabelStyle}
					xAxis={[
						{
						id: 'barCategories',
						data: categoryNames,
						scaleType: 'band',
						},
					]}
					series={montaSeries()}
					margin={{
						left: 50,
						right: 10,
						top: isComparing ? 50 : 20,
						bottom: 25,
					}}
				/>
			</div>
		: <div className='mensagem'>
			Nenhum registro para este período!
		</div>
	}

	function montaSeries() {
		const mainSeries = {
			data: categoryNames.map((nome) => props.somaCategorias[props.nomeCategorias.indexOf(nome)] ?? 0),
			color: color
		};
		if (!isComparing || !ano || !comparisonYear) {
			return [mainSeries];
		}
		return [
			{...mainSeries, label: ano.year().toString()},
			{
				data: categoryNames.map((nome) =>
					comparisonSums.find((soma) => soma.nomeCategoria === nome)?.somaMovimentacao ?? 0),
				color: comparisonColor,
				label: comparisonYear.year().toString()
			}
		];
	}
}

export default CategoriasVisaoGeral;