import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { FC, useState } from 'react';
import '../../../paginas/analitico/Analitico.scss';
import './CategoriasVisaoGeral.scss';

const CategoriasVisaoGeral: FC = () => {
	const [nomeCategorias, setNomeCategorias] = useState<string[]>(["teste", "teste1", "teste3", "teste4", "teste2"]);
	const [somaCategorias, setSomaCategorias] = useState<number[]>([2, 4, 3, 4, 3.5]);
	const [periodo, setPeriodo] = useState("Mês");

	const handleChangePeriodo = (event: SelectChangeEvent) => {
		const newValue = event.target.value;
		setPeriodo(typeof newValue === 'string' ? newValue : "");
	};

	return (
		<div className='card-visao-geral'>
			<div className="titulo">
				Visão geral
			</div>
			<div className="filter">
				<FormControl
					sx={{ width: "20vh", height: "4%" }}
				>
					<InputLabel
						id="demo-simple-select-helper-label"
					>
						Período
					</InputLabel>
					<Select
						id="select-periodo"
						value={periodo}
						onChange={handleChangePeriodo}
						required={true}
					>
						<MenuItem
							key={"mes"}
							value="MES"
						>
							Mês
						</MenuItem>
					</Select>
				</FormControl>
			</div>
			<div className='grafic'>
				<BarChart
					xAxis={[
						{
						id: 'barCategories',
						data: nomeCategorias,
						scaleType: 'band',
						},
					]}
					series={[
						{
						data: somaCategorias,
						color: "#00B165"
						},
					]}
					margin={{
						left: 45,
						right: 20,
						top: 20,
						bottom: 25,
					}}
				/>
			</div>
		</div>
	)
}

export default CategoriasVisaoGeral;