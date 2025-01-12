import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { FC, Fragment, useState } from "react";
import { TipoMovimentacaoEnum } from '../../../enums/TipoMovimentacaoEnum';
import './CardDesempenho.scss';

const CardDesempenho: FC = () => {
	const [periodo, setPeriodo] = useState<string>("TRES")
	const uData = [null, null, 5000, 4700, 6000, 5100, 4000]; //se os meses anteriores não tiverem dados, null não quebra
	const pData = [5000, 5000, 5000, 5000, 5000, 5000, 5000];
	const xLabels = [
		'Page A',
		'Page B',
		'Page C',
		'Page D',
		'Page E',
		'Page F',
		'Page G',
	];

	const mudarPeriodo = (event: SelectChangeEvent) => {
			const newValue = event.target.value;
			setPeriodo(newValue);
		};

	return (
		<Fragment>
			<div className="filtro-periodo-desempenho">
				<FormControl
					sx={{width: '23vh'}}
					size="small"
				>
					<InputLabel
						id="movimentacoes"
					>
						Ver progresso
					</InputLabel>
					<Select
						id="select-movimentacoes"
						value={periodo}
						onChange={mudarPeriodo}
						defaultValue={TipoMovimentacaoEnum.POSITIVO.toString()}
					>
						<MenuItem
							key={"TRES"}
							value={"TRES"}
						>
							3 meses
						</MenuItem>
						<MenuItem
							key={"SEIS"}
							value={"SEIS"}
						>
							6 meses
						</MenuItem>
						<MenuItem
							key={"DOZE"}
							value={"DOZE"}
						>
							12 meses
						</MenuItem>
					</Select>
				</FormControl>
			</div>
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