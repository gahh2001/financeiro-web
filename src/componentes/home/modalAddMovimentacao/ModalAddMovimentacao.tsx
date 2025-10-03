import { InfoOutlined } from '@mui/icons-material';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, FormControlLabel, IconButton, TextField } from '@mui/material';
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
import { accessToken, modalAddMovimentacao, modalMovimentacao } from '../../../atoms/atom';
import { IModalAddMovimentacao } from '../../../interfaces/IModalAddMovimentacao';
import { CategoriaMovimentacaoService } from '../../../services/CategoriaMovimentacaoService';
import { MovimentacaoService } from '../../../services/MovimentacaoService';
import { CategoriaMovimentacao } from '../../../types/CategoriaMovimentacao';
import { Movimentacao } from '../../../types/Movimentacao';
import { useAlert } from '../../contextProviders/AlertProvider';
import { useDialog } from '../../contextProviders/DialogContext';
import Dica from '../../dicas/Dica';
import "./ModalAddMovimentacao.scss";

const ModalAddMovimentacao: FC<IModalAddMovimentacao> = (props: IModalAddMovimentacao) => {
	const [accessTokenAtom] = useAtom(accessToken);
	const [open, setOpen] = useAtom(modalAddMovimentacao);
	const [tipo] = useAtom(modalMovimentacao);
	const { showAlert, showError } = useAlert();
	const { showDialog } = useDialog();
	const categoriaMovimentacaoService = new CategoriaMovimentacaoService();
	const movimentacaoService = new MovimentacaoService();
	const verboTitulo = props.edit
		? "Editar " : "Adicionar "
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
	const [openDicaModalAdd, setOpenDicaModalAdd] = useState(localStorage.getItem('dicaModalAdd') !== "ok");

	useEffect(() => {
		const buscaCategorias = async () => {
			if (open) {
				try {
					if (accessTokenAtom !== "") {
						const categorias = await categoriaMovimentacaoService
							.obtemCategoriasPorTipoMovimentacaoEConta(tipo);
						if (categorias?.data) {
							setCategoriasCarregadas(categorias.data);
						}
					}
				} catch (error) {
					console.log("erro ao carregar categorias do tipo ", tipo);
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
	}, [open]);

	const handleChangeCategoria = (event: SelectChangeEvent) => {
		setCategoria(event.target.value);
		const selecionada = categoriasCarregadas.find(item =>
			item.id === parseInt(event.target.value));
		if (selecionada && selecionada.valorPadrao) {
			setValor(selecionada.valorPadrao.toString());
		}
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
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			id='modal-add-moviemntacao'
			onKeyDown={handleKeyDown}
			disableEnforceFocus
		>
			<DialogContent>
				<div className="modal-adiciona">
					<div className="titulo">{verboTitulo} movimentação</div>
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
									className='data-add-movimentacao'
									label="Data"
									value={data}
									defaultValue={data ? data : dayjs(props.selectedDate)}
									onChange={(newValue) => setData(newValue)}
									sx={{width: { xs: "213px", sm: "160px", md: "160px"}}}
								/>
							</DemoContainer>
						</LocalizationProvider>
						<FormControl
							required
							sx={{width: { xs: "213px", sm: "160px", md: "160px"}}}
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
								label="Categoria"
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
							label= "Valor"
							sx={{width: { xs: "213px", sm: "160px", md: "160px"}}}
						/>
					</div>
					<div className='input-descricao'>
						<Box>
							<TextField
								sx={{width: { xs: "213px", sm: "100%", md: "100%"}}}
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
							label="Alterar o meu saldo"
							sx={{marginRight: '0 !important'}}
						/>
						<IconButton
							onClick={() => showDialog("Se você desativar esta opção, sua movimentação não irá alterar o seu saldo atual. Você pode alterar isto novamente mais tarde.")}
						>
							<InfoOutlined
								sx={{ color: "#0085FF" }}
							/>
						</IconButton>
					</div>
				</div>
			</DialogContent>
			<DialogActions className='modal-planejamento-butons'>
				<Button onClick={() => setOpen(false)}>
					{success ? "Fechar" : "Cancelar"}
				</Button>
				<Button
					onClick={() => salvarMovimentacao()}
					disabled={success}
				>
					Salvar
				</Button>
			</DialogActions>
		</Dialog>
	);

	async function salvarMovimentacao() {
		setPrimeiroClique(true);
		const inputsValidados = validaInputsMovimentacao();
		const dataFormatada = data?.hour(12); //evitar problema de TimeZone
		if (inputsValidados) {
			setSuccess(false);
			const novaMovimentacao: Partial<Movimentacao> = {
				valor: parseFloat(valor),
				dataMovimentacao: dataFormatada?.toDate() ? dataFormatada?.toDate() : new Date(),
				tipoMovimentacao: tipo.toString(),
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
			setSuccess(true);
			setOpen(false);
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