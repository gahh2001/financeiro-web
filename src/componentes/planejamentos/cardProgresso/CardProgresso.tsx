import { SelectChangeEvent } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { FC, Fragment, useState } from "react";
import './CardProgresso.scss';

const CardProgresso: FC = () => {
	const [periodo, setPeriodo] = useState<string>("MES");

	const mudarPeriodo = (event: SelectChangeEvent) => {
		const newValue = event.target.value;
		setPeriodo(newValue);
	};

	return (
		<Fragment>
			<div className="card-progresso">
				<Gauge
					value={102000}
					valueMax={150000}
					startAngle={-110}
					endAngle={110}
					sx={{
						[`& .${gaugeClasses.valueText}`]: {
						fontSize: 34,
						transform: 'translate(0px, 0px)',
						},
						[`& .${gaugeClasses.valueArc}`]: {
						fill: '#52b202', //aqui eu tenho que mudar a cor conforme o valor
						}
					}}
					text={
						({ value, valueMax }) => `${value} / ${valueMax}`
					}
				/>
			</div>
		</Fragment>
	);
}

export default CardProgresso;