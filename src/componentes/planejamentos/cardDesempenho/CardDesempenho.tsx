import { SelectChangeEvent } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { FC, Fragment, useState } from "react";
import './CardDesempenho.scss';

const CardDesempenho: FC = () => {
	const [periodo, setPeriodo] = useState<string>("TRES")
	const uData = [null, null, 5000, 4700, 6000, 5100, 4000]; //se os meses anteriores não tiverem dados, null não quebra
	const pData = [5000, 5000, 5000, 5000, 5000, 5000, 5000];
	const xLabels = [
		'1º B',
		'2º B',
		'3º B',
		'4º B',
		'5º B',
		'6º B',
		'7º B',
	];

	const mudarPeriodo = (event: SelectChangeEvent) => {
			const newValue = event.target.value;
			setPeriodo(newValue);
		};

	return (
		<Fragment>
			<div className="card-desempenho">
				<LineChart
					xAxis={[
						{ scaleType: 'band', data: xLabels, id: 'barCategories', }
					]}
					series={[
						{ data: pData, label: 'pv' },
						{ data: uData, label: 'uv' },
					]}
					margin={{
						left: 50,
						right: 10,
						top: 50,
						bottom: 25,
					}}
				/>
			</div>
		</Fragment>
	);
}

export default CardDesempenho;