import { AddCircleOutlineRounded } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import { Box, LinearProgress, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
import { IMovimentacao } from '../../interfaces/IMovimentacao';
import { CategoriaMovimentacaoService } from '../../services/CategoriaMovimentacaoService';
import { MovimentacaoService } from '../../services/MovimentacaoService';
import "./ModalAddMovimentacao.scss";

interface ModalType {
	children?: ReactNode;
	isOpen: boolean;
	tipo: TipoMovimentacaoEnum;
	closeModal: () => void;
	edit: boolean;
	idMovimentacao: number | undefined;
	date: Date;
	categoria: string;
	valor: string;
	descricao: string;
}

export default function ModalAddMovimentacao(props: ModalType) {
	const categoriaMovimentacaoService = new CategoriaMovimentacaoService(back);
	const movimentacaoService = new MovimentacaoService(back);
	const verboTitulo = props.edit
		? "Editar " : "Adicionar "
	const tipoMovimentacao = props.tipo === TipoMovimentacaoEnum.POSITIVO
		? 'rendimento' : 'despesa'
	const [categoriasCarregadas, setCategoriasCarregadas] = useState<ICategoriaMovimentacao[]>([]);
	const [data, setData] = useState<Dayjs | null>(dayjs());
	const [categoria, setCategoria] = useState("");
	const [valor, setValor] = useState("");
	const [descricao, setDescricao] = useState("");
	const [emptyCategoria, setEmptyCategoria] = useState(false);
	const [emptyValor, setEmptyValor] = useState(false);
	const [primeiroClique, setPrimeiroClique] = useState(false);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const corBotaoAdd = props.tipo === TipoMovimentacaoEnum.POSITIVO
		? "#44A81D" : "#B82121";

	useEffect(() => {
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
		if (props.edit) {
			setData(dayjs(props.date));
			setCategoria(props.categoria);
			setValor(props.valor);
			setDescricao(props.descricao);
		} else {
			setValor("");
			setCategoria("");
			setData(dayjs());
			setDescricao("");
			setEmptyCategoria(false);
			setEmptyValor(false);
			setPrimeiroClique(false);
		}
	}, [props.closeModal])

	const handleChangeCategoria = (event: SelectChangeEvent) => {
		const newValue = event.target.value;
		setCategoria(typeof newValue === 'string' ? newValue : "");
	};

	const handleChangeDescricao = (event: ChangeEvent<HTMLInputElement>) => {
		setDescricao(event.target.value);
	}

	const convertInputValor = (event: any) => {
		let value = event.target.value;
		value = value.replace(/[^0-9]/g, "");
		let numberValue = parseFloat(value) / 100;
		setValor(numberValue.toFixed(2));
	};

	useEffect(() => {
		if (primeiroClique) {
			validaInputsMovimentacao();
		}
	},[categoria, valor]);

	useEffect(() => {
		setSuccess(false);
	}, [props.closeModal]);

	return (
		<>
			{props.isOpen && (
				<div className="modal-overlay-adiciona">
					<div className="modal-adiciona">
						<div className="titulo">{verboTitulo} {tipoMovimentacao}</div>
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
									error={emptyCategoria}
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
									error={emptyValor}
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
										value={descricao}
										onChange={handleChangeDescricao}
									/>
								</Box>
							</div>
						<div className="buttons">
							<button onClick={props.closeModal}>
								{success ? "Fechar" : "Cancelar"}
							</button>
							<div className='adicionar'>
								<button
									onClick={() => salvarMovimentacao()}
									disabled={success}
								>
								{success
									? <CheckIcon sx={{color: "green"}}/>
									: <AddCircleOutlineRounded sx={{ color: corBotaoAdd }} />
								}
							</button>
							</div>
						</div>
						<div className='progress'>
							{loading && (
								<Box sx={{ width: '100%' }}>
									<LinearProgress />
								</Box>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);

	async function salvarMovimentacao() {
		setPrimeiroClique(true);
		const inputsValidados = validaInputsMovimentacao();
		let response = undefined;
		if (inputsValidados) {
			setLoading(true);
			setSuccess(false);
			const novaMovimentacao: IMovimentacao = {
				idConta: 1,
				valor: parseFloat(valor),
				dataMovimentacao: data?.toDate() ? data?.toDate() : new Date(),
				tipoMovimentacao: props.tipo.toString(),
				idCategoriaMovimentacao: parseInt(categoria),
				descricaoMovimentacao: descricao
			}
			if (props.edit) {
				novaMovimentacao.id = props.idMovimentacao;
				response = await movimentacaoService.atualizaMovimentacao(novaMovimentacao);
			} else {
				response = await movimentacaoService.adicionaMovimentacao(novaMovimentacao);
			}
			if (response?.status && response.status === 200) {
				setLoading(false);
				setSuccess(true);
			}
		}
	}

	function validaInputsMovimentacao() {
		const emptyFieldCategoria = categoria.trim() === "";
		const emptyFieldValor = valor.trim() === "" || parseInt(valor) <= 0;
		setEmptyCategoria(emptyFieldCategoria ? true : false);
		setEmptyValor(emptyFieldValor ? true : false);
		return !emptyFieldCategoria && !emptyFieldValor;
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
