import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useAtom } from 'jotai';
import { FC, useEffect, useState } from "react";
import { modalCategorias } from '../../../../atoms/atom';
import { IModalCategoriaProps } from "../../../../interfaces/IModalCategoriaProps";
import { CategoriaMovimentacaoService } from "../../../../services/CategoriaMovimentacaoService";
import { CategoriaMovimentacao } from "../../../../types/CategoriaMovimentacao";
import { useAlert } from "../../../contextProviders/AlertProvider";
import { useDialog } from '../../../contextProviders/DialogContext';
import listaSelectCores from "./ListaSelectsCores";
import listaSelectIcones from "./ListaSelectsIcones";
import "./ModalCategoria.scss";

const ModalCategoria: FC<IModalCategoriaProps> = (props: IModalCategoriaProps) => {
	const [nome, setNome] = useState("");
	const [nomeVazio, setNomeVazio] = useState(false);
	const [tipo, setTipo] = useState("");
	const [tipoVazio, setTipoVazio] = useState(false);
	const [icone, setIcone] = useState("");
	const [iconeVazio, setIconeVazio] = useState(false);
	const [cor, setCor] = useState("");
	const [valorPadrao, setValorPadrao] = useState("");
	const [corVazio, setCorVazio] = useState(false);
	const [padraoVazio, setPadraoVazio] = useState(false);
	const [success, setSuccess] = useState(false);
	const [primeiroClique, setPrimeiroClique] = useState(false);
	const [open, setOpen] = useAtom(modalCategorias);
	const categoriaService = new CategoriaMovimentacaoService();
	const { showAlert, showError } = useAlert();
	const { showDialog } = useDialog();
	const labelTipo = props.edit ? "Você não pode editar o tipo de uma categoria 😬" : "Tipo";
	const [temValor, setTemValor] = useState(!!valorPadrao);

	const convertInputValor = (event: any) => {
		let value = event.target.value;
		value = value.replace(/[^0-9]/g, "");
		let numberValue = parseFloat(value) / 100;
		setValorPadrao(numberValue.toFixed(2));
	};

	useEffect(() => {
		if (props.edit) {
			setNome(props.nome);
			setIcone(props.icone);
			setCor(props.corIcone);
			setValorPadrao(props.valorPadrao);
			setTemValor(!!props.valorPadrao);
		} else {
			setNome("");
			setTipo("");
			setIcone("");
			setCor("");
			setValorPadrao("");
			setNomeVazio(false);
			setTipoVazio(false);
			setIconeVazio(false);
			setCorVazio(false);
			setPadraoVazio(false);
			setPrimeiroClique(false);
			setTemValor(false);
		}
	}, [open]);

	useEffect(() => {
		if (primeiroClique) {
			validaCamposCategoria();
		}
	},[nome, tipo, icone, cor]);

	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
		>
			<DialogContent>
				<div className="modal">
					<div className="titulo-add-categoria">
						Adicionar categoria de movimentação
					</div>
					<div className="linha">
						<TextField
							label="Nome da categoria"
							size="small"
							sx={{ m: 1, width: "100%" }}
							value={nome}
							error={nomeVazio}
							onChange={(e) => setNome(e.target.value)}
							required
						/>
					</div>
					<div className="linha">
						<FormControl
							required
							sx={{ m: 1, width: "47%" }}
							size="small"
							error={iconeVazio}
						>
							<InputLabel
								id="icone"
							>
								Ícone
							</InputLabel>
							<Select
								id="select-icone"
								value={icone}
								label="Ícone"
								onChange={(e) => setIcone(e.target.value)}
								required={true}
							>
								{listaSelectIcones()}
							</Select>
						</FormControl>
						<FormControl
							required
							sx={{ m: 1, width: "47%" }}
							size="small"
							error={corVazio}
						>
							<InputLabel
								id="cor"
							>
								Cor
							</InputLabel>
							<Select
								id="select-cor"
								value={cor}
								label="Cor"
								onChange={(e) => setCor(e.target.value)}
								required={true}
							>
								{listaSelectCores()}
							</Select>
						</FormControl>
					</div>
					<div className="linha">
						<FormControl
							className="form-tipo"
							required
							sx={{ m: 1 }}
							size="small"
							error={!props.edit && tipoVazio}
							disabled={props.edit}
						>
							<InputLabel
								id="demo-simple-select-helper-label"
							>
								{labelTipo}
							</InputLabel>
							<Select
								id="select-tipo"
								value={tipo}
								label="Tipo"
								onChange={(e) => setTipo(e.target.value)}
								required
							>
								<MenuItem
									key={"positivo"}
									value={"POSITIVO"}
								>
									Rendimentos
								</MenuItem>
								<MenuItem
									key={"negativo"}
									value={"NEGATIVO"}
								>
									Gastos
								</MenuItem>
							</Select>
						</FormControl>
						<div className="dica-tipo">
							<IconButton
								onClick={() => showDialog("Categorias Positivas categorizam entrada de valores, enquanto as Negativas indicam gastos.")}
							>
								<HelpOutlineIcon/>
							</IconButton>
						</div>
					</div>
					<div className="linha">
						<FormControlLabel
							control={<Checkbox checked={temValor} onChange={() => setTemValor(!temValor)}/>}
							label="Definir valor padrão"
							sx={{m: 0}}
						/>
						<div className="dica-tipo">
							<IconButton
								onClick={() => showDialog("Ao definir um valor padrão para esta categoria, o valor será preenchido automaticamente sempre que inserida uma movimentação para esta categoria. Você poderá mudar o valor da movimentação se quiser.")}
							>
								<HelpOutlineIcon/>
							</IconButton>
						</div>
					</div>
					<div className="linha">
						{temValor &&
						<TextField
							required
							error={padraoVazio}
							value={valorPadrao}
							onChange={convertInputValor}
							inputProps={{ type: 'number', step: "0.5"}}
							sx={{
								m: 1,
								width: "100%",
							}}
							size="small"
							label= "Valor padrão"
						/>}
					</div>
				</div>
			</DialogContent>
			<DialogActions className='modal-planejamento-butons'>
				<Button onClick={() => setOpen(false)}>
					{success ? "Fechar" : "Cancelar"}
				</Button>
				<Button
					onClick={() => salvarCategoria()}
				>
					Salvar
				</Button>
			</DialogActions>
		</Dialog>
	)

	async function salvarCategoria() {
		setPrimeiroClique(true);
		const inputsValidados = validaCamposCategoria();
		let response = undefined;
		if (inputsValidados) {
			setSuccess(false);
			const novaCategoria: Partial<CategoriaMovimentacao> = {
				nomeCategoria: nome,
				tipoMovimentacao: tipo,
				icone: icone,
				corIcone: cor,
				valorPadrao: temValor ? Number(valorPadrao) : null,
			}
			if (props.edit) {
				novaCategoria.id = props.idCategoria;
				response = await categoriaService.atualizaCategoria(novaCategoria);
			} else {
				response = await categoriaService.adicionaCategoria(novaCategoria);
			}
			setSuccess(true);
			setOpen(false);
			if (response?.status === 200) {
				showAlert("Categoria salva com sucesso", "success");
			} else {
				showError();
			}
		}
	}

	function validaCamposCategoria() {
		const nomeVazio = nome.trim() === "";
		const tipoVazio = !props.edit && tipo.trim() === "";
		const iconeVazio = icone.trim() === "";
		const corVazio = cor.trim() === "";
		setNomeVazio(nomeVazio);
		setTipoVazio(tipoVazio);
		setIconeVazio(iconeVazio);
		setCorVazio(corVazio);
		return !nomeVazio && !tipoVazio && !iconeVazio && !corVazio;
	}
}

export default ModalCategoria;