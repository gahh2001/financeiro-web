import { Box, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import 'dayjs/locale/en-gb';
import { ReactNode, useState } from "react";
import { TipoMovimentacaoEnum } from "../../enums/TipoMovimentacaoEnum";
import "./ModalAddMovimentacao.scss";


interface ModalType {
	children?: ReactNode;
	isOpen: boolean;
	tipo: TipoMovimentacaoEnum;
	closeModal: () => void;
	date: Date;
}

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

export default function ModalAddMovimentacao(props: ModalType) {
	const [selectedDate, setSelectedDate] = useState<any>();
	const tipoMovimentacao = props.tipo === TipoMovimentacaoEnum.POSITIVO
		? 'rendimento' : 'despesa'
	const [age, setAge] = useState('');
	const [inputValue, setInputValue] = useState('');

	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value);
	};

	const handleInputChange = (event: any) => {
		// Obtém o valor do input
		let value = event.target.value;
	
		// Remove caracteres não numéricos
		value = value.replace(/[^0-9]/g, '');
	
		// Converte para número
		let numberValue = parseFloat(value) / 100; // Divide por 100 para obter duas casas decimais
	
		// Atualiza o estado com o valor formatado
		setInputValue(numberValue.toFixed(2));
	  };

	return (
		<>
			{props.isOpen && (
				<div className="modal-overlay-adiciona">
					<div className="modal-adiciona">
						<div className="titulo">Adicionar {tipoMovimentacao}</div>
							<ThemeProvider theme={darkTheme}>
								<div className='inputs'>
									<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
										<DemoContainer components={['DatePicker']}>
											<DatePicker
												sx={{ m: 1, width: "25vh" }}
												label="Data"
												onChange={(value) => setSelectedDate(value)}
											/>
										</DemoContainer>
									</LocalizationProvider>
									<div className='space'></div>
									<FormControl sx={{ m: 1, width: "20vh" }}>
										<InputLabel
											id="demo-simple-select-helper-label"
										>
											Categoria
										</InputLabel>
										<Select
											labelId="demo-simple-select-helper-label"
											id="demo-simple-select-helper"
											value={age}
											label="Age"
											onChange={handleChange}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value={10}>Ten</MenuItem>
											<MenuItem value={20}>Twenty</MenuItem>
											<MenuItem value={30}>Thirty</MenuItem>
										</Select>
									</FormControl>
									<TextField
										value={inputValue}
										onChange={handleInputChange}
										inputProps={{ type: 'number', step: "0.5"}}
										sx={{ m: 1, width: "18vh" }}
										label= "Valor"
									/>
								</div>
								<div className='input-descricao'>
									<Box
										sx={{width: "98.5%"}}
									>
										<TextField fullWidth label="Descrição" id="fullWidth" />
									</Box>
								</div>
							</ThemeProvider>
						<div className="buttons">
							<button onClick={props.closeModal}>
								Cancelar
							</button>
							<button onClick={() => teste()}>
								Salvar
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);

	function teste() {
		console.log(selectedDate);
	}
}
