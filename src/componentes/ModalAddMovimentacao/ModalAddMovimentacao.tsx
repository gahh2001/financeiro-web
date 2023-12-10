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
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en-gb';
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
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
	const [data, setData] = useState<Dayjs | null>(dayjs());
	const [categoria, setCategoria] = useState('');
	const [valor, setValor] = useState('');
	const [descricao, setDescricao] = useState("");
	const [emptyForm, setEmptyForm] = useState(false);

	const handleChangeCategoria = (event: SelectChangeEvent) => {
		const newValue = event.target.value;
		setCategoria(typeof newValue === 'string' ? newValue : '');
	};

	const handleChangeDescricao = (event: ChangeEvent<HTMLInputElement>) => {
		setDescricao(event.target.value);
	}

	const convertInputValor = (event: any) => {
		let value = event.target.value;
		value = value.replace(/[^0-9]/g, '');
		let numberValue = parseFloat(value) / 100;
		setValor(numberValue.toFixed(2));
	};

	useEffect( () => {
		setValor("");
		setCategoria("");
		setEmptyForm(false);
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
						<form>
							<div className="titulo">Adicionar {tipoMovimentacao}</div>
								<ThemeProvider theme={darkTheme}>
									<div className='inputs'>
										<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
											<DemoContainer components={['DatePicker']}>
												<DatePicker
													sx={{ m: 1, width: "25vh" }}
													label="Data"
													value={data}
													onChange={(newValue) => setData(newValue)}
												/>
											</DemoContainer>
										</LocalizationProvider>
										<div className='space'></div>
										<FormControl
											required
											sx={{ m: 1, width: "20vh" }}
											error={emptyForm}
										>
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
												required={true}
											>
											{obtemSelectCategorias(categoriasCarregadas)}
											</Select>
										</FormControl>
										<TextField
											required
											error={emptyForm}
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
											<TextField
												fullWidth
												label="Escreva alguma observação sobre a movimentação"
												id="fullWidth"
												onChange={handleChangeDescricao}
											/>
										</Box>
									</div>
								</ThemeProvider>
							<div className="buttons">
								<button onClick={props.closeModal}>
									Cancelar
								</button>
								<button
									onClick={() => teste()}
									type="submit"
								>
									Salvar
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);

	function teste() {
		const emptyFields = data === undefined
			|| categoria === undefined || categoria === ""
			|| valor === undefined || valor === ""
			|| descricao === undefined || descricao === ""
		if (emptyFields) {
			setEmptyForm(true)
		}
		console.log(data);
		console.log(categoria);
		console.log(valor);
		console.log(descricao);
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
