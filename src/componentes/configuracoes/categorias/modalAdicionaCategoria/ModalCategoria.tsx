import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Button, Dialog, DialogActions, DialogContent, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useBack } from "../../../../http";
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
	const [corVazio, setCorVazio] = useState(false);
	const [success, setSuccess] = useState(false);
	const [primeiroClique, setPrimeiroClique] = useState(false);
	const categoriaService = new CategoriaMovimentacaoService(useBack());
	const { showAlert, showError } = useAlert();
	const { showDialog } = useDialog();
	const labelTipo = props.edit ? "Você não pode editar o tipo de uma categoria 😬" : "Tipo";

	useEffect(() => {
		if (props.edit) {
			setNome(props.nome);
			setIcone(props.icone);
			setCor(props.corIcone);
		} else {
			setNome("");
			setTipo("");
			setIcone("");
			setCor("");
			setNomeVazio(false);
			setTipoVazio(false);
			setIconeVazio(false);
			setCorVazio(false);
			setPrimeiroClique(false);
		}
		setSuccess(false);
	}, [props.closeModal]);

	useEffect(() => {
		if (primeiroClique) {
			validaCamposCategoria();
		}
	},[nome, tipo, icone, cor]);

	return (
		<Dialog
			open={props.isOpen}
			onClose={props.closeModal}
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
							sx={{ m: 1, width: "44vh" }}
							value={nome}
							error={nomeVazio}
							onChange={(e) => setNome(e.target.value)}
						/>
					</div>
					<div className="linha">
						<FormControl
							required
							sx={{ m: 1, width: "44vh" }}
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
								label="tipo"
								onChange={(e) => setTipo(e.target.value)}
								required={true}
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
						<FormControl
							required
							sx={{ m: 1, width: "21vh" }}
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
								label="icone"
								onChange={(e) => setIcone(e.target.value)}
								required={true}
							>
								{listaSelectIcones()}
							</Select>
						</FormControl>
						<FormControl
							required
							sx={{ m: 1, width: "21vh" }}
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
								label="cor"
								onChange={(e) => setCor(e.target.value)}
								required={true}
							>
								{listaSelectCores()}
							</Select>
						</FormControl>
					</div>
				</div>
			</DialogContent>
			<DialogActions className='modal-planejamento-butons'>
				<Button onClick={props.closeModal}>
					{success ? "Fechar" : "Cancelar"}
				</Button>
				<Button
					onClick={() => salvarCategoria()}
					disabled={success}
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
			}
			if (props.edit) {
				novaCategoria.id = props.idCategoria;
				response = await categoriaService.atualizaCategoria(novaCategoria);
			} else {
				response = await categoriaService.adicionaCategoria(novaCategoria);
			}
			setSuccess(true);
			props.closeModal();
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