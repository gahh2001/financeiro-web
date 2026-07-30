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
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useAtom } from 'jotai';
import { ChangeEvent, FC, useEffect, useState } from "react";
import { accessToken, modalAddMovimentacao, modalMovimentacao, movimentacaoAtom } from '../../../atoms/atom';
import { CategoriaMovimentacaoService } from '../../../services/CategoriaMovimentacaoService';
import { MovimentacaoService } from '../../../services/MovimentacaoService';
import { CategoriaMovimentacao } from '../../../types/CategoriaMovimentacao';
import { Movimentacao } from '../../../types/Movimentacao';
import { formataValorInput } from '../../../utils/MovimentacaoUtils';
import { useAlert } from '../../contextProviders/AlertProvider';
import { useDialog } from '../../contextProviders/DialogContext';
import Dica from '../../dicas/Dica';
import "./ModalAddMovimentacao.scss";

const ModalAddMovimentacao: FC = () => {
	const [accessTokenAtom] = useAtom(accessToken);
	const [open, setOpen] = useAtom(modalAddMovimentacao);
	const [tipo] = useAtom(modalMovimentacao);
	const [movimentacao, setMovimentacao] = useAtom(movimentacaoAtom);
	const { showAlert, showError } = useAlert();
	const { showDialog } = useDialog();
	const categoriaMovimentacaoService = new CategoriaMovimentacaoService();
	const movimentacaoService = new MovimentacaoService();
	const edit = Boolean(movimentacao.id);
	const verboTitulo = edit ? "Editar " : "Adicionar "
	const [categoriasCarregadas, setCategoriasCarregadas] = useState<CategoriaMovimentacao[]>([]);
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
		setEmptyCategoria(false);
		setEmptyValor(false);
		setPrimeiroClique(false);
		setSuccess(false);
	}, [open]);

	useEffect(() => {
		if (primeiroClique) {
			validaInputsMovimentacao();
		}
	},[movimentacao.idCategoriaMovimentacao, movimentacao.valor]);

	const alteraMovimentacao = (campos: Partial<Movimentacao>) => {
		setMovimentacao({ ...movimentacao, ...campos });
	};

	const handleChangeCategoria = (event: SelectChangeEvent) => {
		const idCategoria = parseInt(event.target.value, 10);
		const selecionada = categoriasCarregadas.find(item => item.id === idCategoria);
		alteraMovimentacao({
			idCategoriaMovimentacao: idCategoria,
			...(selecionada?.valorPadrao ? { valor: selecionada.valorPadrao } : {})
		});
	};

	const handleChangeDescricao = (event: ChangeEvent<HTMLInputElement>) => {
		alteraMovimentacao({ descricaoMovimentacao: event.target.value });
	}

	const convertInputValor = (event: ChangeEvent<HTMLInputElement>) => {
		const digitos = event.target.value.replace(/[^0-9]/g, "");
		alteraMovimentacao({ valor: digitos === "" ? 0 : parseInt(digitos, 10) / 100 });
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			salvarMovimentacao();
		}
	};

	const handleChangeAlteraSaldo = () => {
		alteraMovimentacao({ alteraSaldo: !movimentacao.alteraSaldo });
	};

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
									value={dayjs(movimentacao.dataMovimentacao)}
									onChange={(newValue) => alteraMovimentacao({
										dataMovimentacao: newValue ? newValue.toDate() : new Date()
									})}
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
								value={movimentacao.idCategoriaMovimentacao
									? movimentacao.idCategoriaMovimentacao.toString() : ""}
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
							value={formataValorInput(movimentacao.valor)}
							onChange={convertInputValor}
							inputProps={{ type: 'text', inputMode: 'decimal', pattern: '[0-9]*' }}
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
								value={movimentacao.descricaoMovimentacao}
								onChange={handleChangeDescricao}
							/>
						</Box>
					</div>
					<div className="altera-saldo">
						<FormControlLabel
							control={<Checkbox checked={movimentacao.alteraSaldo} onChange={handleChangeAlteraSaldo}/>}
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
		if (inputsValidados) {
			setSuccess(false);
			const movimentacaoSalvar: Partial<Movimentacao> = {
				id: movimentacao.id,
				valor: movimentacao.valor,
				//hora 12 evita problema de TimeZone
				dataMovimentacao: dayjs(movimentacao.dataMovimentacao).hour(12).toDate(),
				tipoMovimentacao: movimentacao.tipoMovimentacao
					? movimentacao.tipoMovimentacao : tipo.toString(),
				idCategoriaMovimentacao: movimentacao.idCategoriaMovimentacao,
				descricaoMovimentacao: movimentacao.descricaoMovimentacao,
				alteraSaldo: movimentacao.alteraSaldo
			}
			const response = edit
				? await movimentacaoService.atualizaMovimentacao(movimentacaoSalvar)
				: await movimentacaoService.adicionaMovimentacao(movimentacaoSalvar);
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
		const emptyFieldCategoria = !movimentacao.idCategoriaMovimentacao;
		const emptyFieldValor = !movimentacao.valor || movimentacao.valor <= 0;
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
