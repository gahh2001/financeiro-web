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
import { ReactNode, useEffect, useState } from "react";
import { TipoMovimentacaoEnum } from "../../enums/TipoMovimentacaoEnum";
import back from '../../http';
import { ICategoriaMovimentacao } from '../../interfaces/ICategoriaMovimentacao';
import { CategoriaMovimentacaoService } from '../../services/CategoriaMovimentacaoService';
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
	const categoriaMovimentacaoService = new CategoriaMovimentacaoService(back);
	const [selectedDate, setSelectedDate] = useState<any>();
	const tipoMovimentacao = props.tipo === TipoMovimentacaoEnum.POSITIVO
		? 'rendimento' : 'despesa'
	const [categoriasCarregadas, setCategoriasCarregadas] = useState<ICategoriaMovimentacao[]>([]);
	const [categoria, setCategoria] = useState('');
	const [valor, setValor] = useState('');
	const [data, setData] = useState<Date>();

	const handleChangeCategoria = (event: SelectChangeEvent) => {
		const newValue = event.target.value;
		setCategoria(typeof newValue === 'string' ? newValue : '');
	};

	const convertInputValor = (event: any) => {
		let value = event.target.value;
		value = value.replace(/[^0-9]/g, '');
		let numberValue = parseFloat(value) / 100;
		setValor(numberValue.toFixed(2));
	};

	useEffect( () => {
		setValor("");
		setCategoria("");
		const buscaCategorias = async () => {
			try {
				const categorias = await categoriaMovimentacaoService
					.obtemCategoriasPorTipoMovimentacaoEConta(1, props.tipo);
				if (categorias?.data) {
					setCategoriasCarregadas(categorias.data);
				}
			} catch (error) {
				console.log("erro ao carregar categorias do tipo ", props.tipo);
			}
		}
		buscaCategorias();
	}, [props.closeModal, props.isOpen])

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
											id="select-categoria"
											value={categoria}
											label="Age"
											onChange={handleChangeCategoria}
										>
										{obtemSelectCategorias(categoriasCarregadas)}
										</Select>
									</FormControl>
									<TextField
										value={valor}
										onChange={convertInputValor}
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

	function obtemSelectCategorias(categoriasReceived: ICategoriaMovimentacao[]) {
		return categoriasReceived.map((categ, index) => (
			<MenuItem
				key={index}
				value={categ.id.toString()}
			>
				{categ.nomeCategoria}
			</MenuItem>
		))
	}
}
