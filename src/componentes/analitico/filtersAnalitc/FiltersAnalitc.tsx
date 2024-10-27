import { FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent, Switch } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Dayjs } from "dayjs";
import { ChangeEvent, FC } from "react";
import { TipoComparacaoEnum } from "../../../enums/TipoComparacaoEnum";
import { TipoMovimentacaoEnum } from "../../../enums/TipoMovimentacaoEnum";
import { IFiltersAnaliticProps } from "../../../interfaces/IFiltersAnaliticProps";
import './FiltersAnalitic.scss';

const FiltersAnalitic: FC<IFiltersAnaliticProps> = (props: IFiltersAnaliticProps) => {

	const handleChangeMovimentacao = (event: SelectChangeEvent) => {
		const newValue = event.target.value;
		props.setTipoMovimentacao(newValue);
	};
	const handleChangeComparacao = (event: SelectChangeEvent) => {
		const newValue = event.target.value;
		props.setTipoComparacao(newValue);
	};
	const handleChangeFullYear = (event: ChangeEvent<HTMLInputElement>) => {
		props.setFullYear(event.target.checked);
	};
	const handleChangeMes = (data: Dayjs | null) => {
		props.setMes(data);
	}
	const handleChangeAno = (data: Dayjs | null) => {
		props.setAno(data);
	}

	return (
		<div className="card-filters">
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DemoContainer components={['DatePicker']} sx={{justifyContent: 'center'}}>
					<div className="filter">
						<DatePicker
							label={"Ano"}
							value={props.ano}
							defaultValue={props.ano}
							onChange={(newValue) => handleChangeAno(newValue)}
							views={['year']}
							slotProps={{ textField: { size: 'small' } }}
							format='YYYY'
						/>
					</div>
				</DemoContainer>
			</LocalizationProvider>
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
				<DemoContainer components={['DatePicker']} sx={{justifyContent: 'center'}}>
					<div className="filter">
						<DatePicker
							label={"Mês"}
							value={props.mes}
							defaultValue={props.mes}
							onChange={(newValue) => handleChangeMes(newValue)}
							views={['month']}
							slotProps={{ textField: { size: 'small' } }}
							format='MM'
							disabled={props.fullYear}
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
						value={props.tipoMovimentacao}
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
						value={props.tipoComparacao}
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