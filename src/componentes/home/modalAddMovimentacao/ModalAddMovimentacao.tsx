import { AddCircleOutlineRounded, InfoOutlined } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import { Box, Checkbox, FormControlLabel, IconButton, LinearProgress, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import { useAtom } from 'jotai';
import { ChangeEvent, FC, useEffect, useState } from "react";
import { accessToken } from '../../../atoms/atom';
import { TipoMovimentacaoEnum } from '../../../enums/TipoMovimentacaoEnum';
import { useBack } from '../../../http';
import { IModalAddMovimentacao } from '../../../interfaces/IModalAddMovimentacao';
import { CategoriaMovimentacaoService } from '../../../services/CategoriaMovimentacaoService';
import { MovimentacaoService } from '../../../services/MovimentacaoService';
import { CategoriaMovimentacao } from '../../../types/CategoriaMovimentacao';
import { Movimentacao } from '../../../types/Movimentacao';
import { useAlert } from '../../alert/AlertProvider';
import Dica from '../../dicas/Dica';
import "./ModalAddMovimentacao.scss";

const ModalAddMovimentacao: FC<IModalAddMovimentacao> = (props: IModalAddMovimentacao) => {
	const [accessTokenAtom] = useAtom(accessToken);
	const { showAlert, showError } = useAlert();
	const categoriaMovimentacaoService = new CategoriaMovimentacaoService(useBack());
	const movimentacaoService = new MovimentacaoService(useBack());
	const verboTitulo = props.edit
		? "Editar " : "Adicionar "
	const tipoMovimentacao = props.tipo === TipoMovimentacaoEnum.POSITIVO
		? 'rendimento' : 'despesa'
	const [categoriasCarregadas, setCategoriasCarregadas] = useState<CategoriaMovimentacao[]>([]);
	const [data, setData] = useState<Dayjs | null>(dayjs());
	const [categoria, setCategoria] = useState("");
	const [valor, setValor] = useState("");
	const [descricao, setDescricao] = useState("");
	const [alterarSaldo, setAlteraSaldo] = useState(true);
	const [emptyCategoria, setEmptyCategoria] = useState(false);
	const [emptyValor, setEmptyValor] = useState(false);
	const [primeiroClique, setPrimeiroClique] = useState(false);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const corBotaoAdd = props.tipo === TipoMovimentacaoEnum.POSITIVO
		? "#44A81D" : "#B82121";
	const [openDicaModalAdd, setOpenDicaModalAdd] = useState(localStorage.getItem('dicaModalAdd') !== "ok");

	useEffect(() => {
		const buscaCategorias = async () => {
			if (props.isOpen) {
				try {
					if (accessTokenAtom !== "") {
						const categorias = await categoriaMovimentacaoService
							.obtemCategoriasPorTipoMovimentacaoEConta(props.tipo);
						if (categorias?.data) {
							setCategoriasCarregadas(categorias.data);
						}
					}
				} catch (error) {
					console.log("erro ao carregar categorias do tipo ", props.tipo);
				}
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
			setData(dayjs(props.selectedDate));
			setDescricao("");
			setAlteraSaldo(true);
			setEmptyCategoria(false);
			setEmptyValor(false);
			setPrimeiroClique(false);
		}
		setSuccess(false);
	}, [props.closeModal]);

	const handleChangeCategoria = (event: SelectChangeEvent) => {
		setCategoria(event.target.value);
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

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			salvarMovimentacao();
		}
	};

	const handleChangeAlteraSaldo = () => {
		setAlteraSaldo(!alterarSaldo);
	};

	useEffect(() => {
		if (primeiroClique) {
			validaInputsMovimentacao();
		}
	},[categoria, valor]);

	return (
		<>
			{props.isOpen && (
				<div className="modal-overlay-adiciona" onKeyDown={handleKeyDown}>
					<div className="modal-adiciona">
						<div className="titulo">{verboTitulo} {tipoMovimentacao}</div>
							<Dica
								frase="Você pode criar novas categorias para as suas movimentações em 'Configurações'"
								codigo="dicaModalAdd"
								open={openDicaModalAdd}
								setOpen={setOpenDicaModalAdd}
							/>
							<div className='inputs'>
								<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
									<DemoContainer components={['DatePicker']}>
										<DatePicker
											sx={{width: "250px" }}
											label="Data"
											value={data}
											defaultValue={data ? data : dayjs(props.selectedDate)}
											onChange={(newValue) => setData(newValue)}
										/>
									</DemoContainer>
								</LocalizationProvider>
								<FormControl
									required
									sx={{ width: "250px" }}
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
									sx={{width: "250px" }}
									label= "Valor"
								/>
							</div>
							<div className='input-descricao'>
								<Box>
									<TextField
										sx={{ width: "100%" }}
										label="Escreva alguma observação sobre a movimentação"
										id="fullWidth"
										value={descricao}
										onChange={handleChangeDescricao}
									/>
								</Box>
							</div>
							<div className="altera-saldo">
								<FormControlLabel
									control={<Checkbox checked={alterarSaldo} onChange={handleChangeAlteraSaldo}/>}
									label="Alterar o saldo da conta"
								/>
								<IconButton
									onClick={() => console.log}
								>
									<InfoOutlined
										sx={{ color: "#0085FF" }}
									/>
								</IconButton>
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
		if (inputsValidados) {
			setLoading(true);
			setSuccess(false);
			const novaMovimentacao: Partial<Movimentacao> = {
				valor: parseFloat(valor),
				dataMovimentacao: data?.toDate() ? data?.toDate() : new Date(),
				tipoMovimentacao: props.tipo.toString(),
				idCategoriaMovimentacao: parseInt(categoria),
				descricaoMovimentacao: descricao,
				alteraSaldo: alterarSaldo
			}
			let response;
			if (props.edit) {
				novaMovimentacao.id = props.idMovimentacao;
				response = await movimentacaoService.atualizaMovimentacao(novaMovimentacao);
			} else {
				response = await movimentacaoService.adicionaMovimentacao(novaMovimentacao);
			}
			setLoading(false);
			setSuccess(true);
			props.closeModal();
			if (response?.status === 200) {
				showAlert("Movimentação salva com sucesso", "success");
			} else {
				showError();
			}
		}
	}

	function validaInputsMovimentacao() {
		const emptyFieldCategoria = categoria.trim() === "";
		const emptyFieldValor = valor.trim() === "" || parseInt(valor) <= 0;
		setEmptyCategoria(emptyFieldCategoria);
		setEmptyValor(emptyFieldValor);
		return !emptyFieldCategoria && !emptyFieldValor;
	}

	function obtemSelectCategorias(categoriasReceived: CategoriaMovimentacao[]) {
		return categoriasReceived.map((categ, index) => (
			<MenuItem
				key={index}
				value={categ.id?.toString()}
			>
				{categ.nomeCategoria}
			</MenuItem>
		));
	}
}

export default ModalAddMovimentacao;