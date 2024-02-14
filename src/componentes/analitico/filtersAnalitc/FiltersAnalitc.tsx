import { FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent, Switch } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Dayjs } from "dayjs";
import { ChangeEvent, FC, useState } from "react";
import { TipoComparacaoEnum } from "../../../enums/TipoComparacaoEnum";
import { TipoMovimentacaoEnum } from "../../../enums/TipoMovimentacaoEnum";
import { IFiltersAnaliticProps } from "../../../interfaces/IFiltersAnaliticProps";
import './FiltersAnalitic.scss';

const FiltersAnalitic: FC<IFiltersAnaliticProps> = (props: IFiltersAnaliticProps) => {
	const [ano, setAno] = useState<Dayjs | null>(props.ano);
	const [mes, setMes] = useState<Dayjs | null>(props.mes);
	const [tipoMovimentacao, setTipomovimentacao] = useState(props.tipoMovimentacao);
	const [tipoComparacao, setTipoComparacao] = useState(props.tipoComparacao)
	const [fullYear, setFullYear] = useState(props.fullYear);

	const handleChangeMovimentacao = (event: SelectChangeEvent) => {
		const newValue = event.target.value;
		setTipomovimentacao(newValue);
	};

	const handleChangeComparacao = (event: SelectChangeEvent) => {
		const newValue = event.target.value;
		setTipoComparacao(newValue);
	};

	const handleChangeFullYear = (event: ChangeEvent<HTMLInputElement>) => {
		setFullYear(event.target.checked);
	};

	return (
		<div className="card-filters">
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DemoContainer components={['DatePicker']} sx={{justifyContent: 'center'}}>
					<div className="filter">
						<DatePicker
							label={"Ano"}
							value={ano}
							defaultValue={ano}
							onChange={(newValue) => setAno(newValue)}
							views={['year']}
							slotProps={{ textField: { size: 'small' } }}
							format='YYYY'
						/>
					</div>
				</DemoContainer>
			</LocalizationProvider>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DemoContainer components={['DatePicker']} sx={{justifyContent: 'center'}}>
					<div className="filter">
						<DatePicker
							label={"Mês"}
							value={mes}
							defaultValue={mes}
							onChange={(newValue) => setMes(newValue)}
							views={['month']}
							slotProps={{ textField: { size: 'small' } }}
							format='MM'
							disabled={fullYear}
						/>
					</div>
				</DemoContainer>
			</LocalizationProvider>
			<div className="filter-year">
				<FormGroup>
					<FormControlLabel
						control={
							<Switch
								color='primary'
								onChange={handleChangeFullYear}
							/>
						}
						label="Ano inteiro"
					/>
				</FormGroup>
			</div>
			<div className="filter">
				<FormControl
					sx={{m: 1, width: '23vh'}}
					size="small"
				>
					<InputLabel
						id="movimentacoes"
					>
						Movimentações
					</InputLabel>
					<Select
						id="select-movimentacoes"
						value={tipoMovimentacao}
						onChange={handleChangeMovimentacao}
						defaultValue={TipoMovimentacaoEnum.POSITIVO.toString()}
					>
						<MenuItem
							key={"POSITIVAS"}
							value={TipoMovimentacaoEnum.POSITIVO.toString()}
						>
							Rendimentos
						</MenuItem>
						<MenuItem
							key={"NEGATIVAS"}
							value={TipoMovimentacaoEnum.NEGATIVO.toString()}
						>
							Despesas
						</MenuItem>
					</Select>
				</FormControl>
			</div>
			<div className="filter">
				<FormControl
					sx={{m: 1, width: '23vh'}}
					size="small"
				>
					<InputLabel
						id="comparacao"
					>
						Comparação
					</InputLabel>
					<Select
						id="select-comparacao"
						value={tipoComparacao}
						onChange={handleChangeComparacao}
						defaultValue={TipoComparacaoEnum.TRESMESES.toString()}
					>
						<MenuItem
							key={"3"}
							value={TipoComparacaoEnum.TRESMESES.toString()}
						>
							Ùltimos 3 meses
						</MenuItem>
						<MenuItem
							key={"6"}
							value={TipoComparacaoEnum.SEISMESES.toString()}
						>
							Ùltimos 6 meses
						</MenuItem>
						<MenuItem
							key={"12"}
							value={TipoComparacaoEnum.UMANO.toString()}
						>
							Ùltimos 12 meses
						</MenuItem>
					</Select>
				</FormControl>
			</div>
		</div>
	)
}

export default FiltersAnalitic;