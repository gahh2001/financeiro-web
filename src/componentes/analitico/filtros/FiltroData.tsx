import { FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent, Switch } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Dayjs } from "dayjs";
import { ChangeEvent, FC } from "react";
import { TipoMovimentacaoEnum } from "../../../enums/TipoMovimentacaoEnum";
import { IFiltroDataProps } from "../../../interfaces/IFiltroDataProps";
import './FiltroData.scss';

const FiltroData: FC<IFiltroDataProps> = (props: IFiltroDataProps) => {

	const handleChangeFullYear = (event: ChangeEvent<HTMLInputElement>) => {
		props.setFullYear(event.target.checked);
	};
	const handleChangeMes = (data: Dayjs | null) => {
		props.setMes(data);
	}
	const handleChangeAno = (data: Dayjs | null) => {
		props.setAno(data);
	}
	const handleChangeMovimentacao = (event: SelectChangeEvent) => {
		const newValue = event.target.value;
		props.setTipoMovimentacao(newValue);
	};

	return (
		<div className="card-filters-data">
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DemoContainer components={['DatePicker']} sx={{justifyContent: 'center'}}>
					<div className="filter-data">
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
					<div className="filter-data">
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
			<div className="filter-year-data">
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
			<div className="filter-data">
				<FormControl
					sx={{width: '23vh'}}
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
		</div>
	)
}

export default FiltroData;