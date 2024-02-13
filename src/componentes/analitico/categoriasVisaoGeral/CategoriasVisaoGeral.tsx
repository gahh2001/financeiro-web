import { FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent, Switch } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import { ChangeEvent, FC, useState } from 'react';
import { TipoMovimentacaoEnum } from '../../../enums/TipoMovimentacaoEnum';
import '../../../paginas/analitico/Analitico.scss';
import './CategoriasVisaoGeral.scss';

const CategoriasVisaoGeral: FC = () => {
	const [nomeCategorias, setNomeCategorias] = useState<string[]>(["teste", "teste1", "teste3", "teste4", "teste2"]);
	const [somaCategorias, setSomaCategorias] = useState<number[]>([2, 4, 3, 4, 3.5]);
	const [ano, setAno] = useState<Dayjs | null>(dayjs());
	const [categoria, setCategoria] = useState("");
	const [fullYear, setFullYear] = useState(false);

	const handleChangeCategoria = (event: SelectChangeEvent) => {
		const newValue = event.target.value;
		setCategoria(typeof newValue === 'string' ? newValue : "");
	};

	const handleChangeFullYear = (event: ChangeEvent<HTMLInputElement>) => {
		setFullYear(event.target.checked);
	};

	return (
		<div className='card-visao-geral'>
			<div className="titulo">
				Visão geral
			</div>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DemoContainer components={['DatePicker']}>
					<div className="filter">
						<DatePicker
							label={"Ano"}
							views={['year']}
							sx={{m: 1, width: "17vh"}}
							slotProps={{ textField: { size: 'small' } }}
							format='YYYY'
						/>
					</div>
					<div className="filter">
						<DatePicker
							label={"Mês"}
							views={['month']}
							sx={{m: 1, width: "15vh"}}
							slotProps={{ textField: { size: 'small' } }}
							format='MM'
							disabled={fullYear}
						/>
						<FormGroup>
							<FormControlLabel
								control={<Switch color='primary' onChange={handleChangeFullYear}/>}
								label="Ano inteiro"
							/>
						</FormGroup>
					</div>
					<div className="filter">
						<FormControl
							sx={{ m: 1, width: "20vh" }}
							size='small'
						>
							<InputLabel
								id="demo-simple-select-helper-label"
							>
								Categorias
							</InputLabel>
							<Select
								id="select-categoria"
								value={categoria}
								label="Age"
								onChange={handleChangeCategoria}
								required={true}
							>
								<MenuItem
									key={"POSITIVAS"}
									value={TipoMovimentacaoEnum.POSITIVO}
								>
									Rendimentos
								</MenuItem>
								<MenuItem
									key={"NEGATIVAS"}
									value={TipoMovimentacaoEnum.NEGATIVO}
								>
									Despesas
								</MenuItem>
							</Select>
						</FormControl>
					</div>
				</DemoContainer>
			</LocalizationProvider>
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
						top: 10,
						bottom: 35,
					}}
				/>
			</div>
		</div>
	)
}

export default CategoriasVisaoGeral;