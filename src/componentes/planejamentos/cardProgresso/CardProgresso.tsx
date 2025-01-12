import { InfoOutlined } from '@mui/icons-material';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { FC, Fragment, useState } from "react";
import { TipoMovimentacaoEnum } from '../../../enums/TipoMovimentacaoEnum';
import './CardProgresso.scss';

const CardProgresso: FC = () => {
	const [periodo, setPeriodo] = useState<string>("MES");

	const mudarPeriodo = (event: SelectChangeEvent) => {
		const newValue = event.target.value;
		setPeriodo(newValue);
	};

	return (
		<Fragment>
			<div className="filtro-periodo-progresso">
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
							key={"MES"}
							value={"MES"}
						>
							No mês
						</MenuItem>
						<MenuItem
							key={"ANO"}
							value={"ANO"}
						>
							No ano
						</MenuItem>
						<MenuItem
							key={"TODO"}
							value={"TODO"}
						>
							todo período
						</MenuItem>
					</Select>
				</FormControl>
			</div>
			<div className="card-progresso">
				<Gauge
					value={1075.8}
					valueMax={2000}
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
			<div className="dica-progresso">
				<Typography>
					<InfoOutlined fontSize="small"/> Seu progresso este mês está relativamente bem encaminhado
				</Typography>
			</div>
		</Fragment>
	);
}

export default CardProgresso;