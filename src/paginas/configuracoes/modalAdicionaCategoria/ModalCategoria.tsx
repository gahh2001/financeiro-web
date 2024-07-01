import { AddCircleOutlineRounded } from "@mui/icons-material";
import CheckIcon from '@mui/icons-material/Check';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { IModalCategoriaProps } from "../../../interfaces/IModalCategoriaProps";
import "./ModalCategoria.scss";

const ModalCategoria: FC<IModalCategoriaProps> = (props: IModalCategoriaProps) => {
	const [nome, setNome] = useState("");
	const [tipo, setTipo] = useState("");
	const [icone, setIcone] = useState("");
	const [cor, setCor] = useState("");
	const [success, setSuccess] = useState(false);

	const handleChangeTipo = (event: SelectChangeEvent) => {
		const newValue = event.target.value;
		setTipo(typeof newValue === 'string' ? newValue : "");
	};

	return (
		<Fragment>
			{ props.isOpen && ( 
				<div className="modal-overlay">
					<div className="modal">
						<div className="titulo">
							Adicionar categoria de movimentação
						</div>
						<div className="linha">
							<TextField label="Nome da categoria" size="small" sx={{ m: 1, width: "44vh" }}/>
						</div>
						<div className="linha">
							<FormControl
								required
								sx={{ m: 1, width: "44vh" }}
								size="small"
								//error={emptyCategoria}
							>
								<InputLabel
									id="demo-simple-select-helper-label"
								>
									Tipo
								</InputLabel>
								<Select
									id="select-tipo"
									value={tipo}
									label="Age"
									onChange={handleChangeTipo}
									required={true}
								>
									<MenuItem
										key={"positivo"}
										value={"POSITIVO"}
									>
										Positiva
									</MenuItem>
									<MenuItem
										key={"negativo"}
										value={"NEGATIVO"}
									>
										Negativa
									</MenuItem>
								</Select>
							</FormControl>
						</div>
						<div className="linha">
							<FormControl
								required
								sx={{ m: 1, width: "21vh" }}
								size="small"
								//error={emptyCategoria}
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
									onChange={handleChangeTipo}
									required={true}
								>
									<MenuItem
										key={"positivo"}
										value={"POSITIVO"}
									>
										Positiva
									</MenuItem>
								</Select>
							</FormControl>
							<FormControl
								required
								sx={{ m: 1, width: "21vh" }}
								size="small"
								//error={emptyCategoria}
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
									onChange={handleChangeTipo}
									required={true}
								>
									<MenuItem
										key={"positivo"}
										value={"POSITIVO"}
									>
										Positiva
									</MenuItem>
								</Select>
							</FormControl>
						</div>
						<div className="linha">
							<button onClick={props.closeModal}>
								{success ? "Fechar" : "Cancelar"}
							</button>
							<button
								onClick={() => salvarCategoria()}
								disabled={success}
							>
								{success
									? <CheckIcon sx={{color: "green"}}/>
									: <AddCircleOutlineRounded sx={{ color: "#44A81D" }} />
								}
							</button>
						</div>
					</div>
				</div>
			)}
		</Fragment>
	)

	async function salvarCategoria() {
		
	}
}

export default ModalCategoria;