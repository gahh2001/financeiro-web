import { AddTaskOutlined } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import { FC, Fragment, useEffect, useState } from "react";
import { ICategoriasProps } from "../../../interfaces/ICategoriasProps";
import "./Categorias.scss";
import ConverteIcone from "./ConverteIcones";
import ModalCategoria from "./modalAdicionaCategoria/ModalCategoria";
import useModalCategoria from "./modalAdicionaCategoria/UseModalCategoria";

const Categorias: FC<ICategoriasProps> = (props: ICategoriasProps) => {

	const [edit, setEdit] = useState(false);
	const {isOpenModalAdd, closeModalCategoria} = useModalCategoria();
	const [nomeCategoria, setNomeCategoria] = useState("");
	const [iconeCategoria, setIconeCategoria] = useState("");
	const [corCategoria, setCorCategoria] = useState("");
	const [idCategoria, setIdCategoria] = useState<number | null>(null);

	const handleAddCategoria = () => {
		setEdit(false);
		closeModalCategoria();
	};

	const handleEditCategoria = (id: number | null, nome: string, icone: string, cor: string) => {
		setEdit(true);
		setIdCategoria(id);
		setNomeCategoria(nome);
		setIconeCategoria(icone);
		setCorCategoria(cor);
		closeModalCategoria();
	};

	useEffect(() => {
		if (!isOpenModalAdd) {
			props.handleAddCategoria();
		}
	}, [isOpenModalAdd]);

	return (
		<Fragment>
			<div className="categorias">
				<div className="adicionar">
					<div className="text">
						As categorias servem para classificar suas movimentações. <br /><br />
						Você pode clicar para editar ou criar categorias personalidas para identificar suas movimentações!
					</div> <br />
					<button
						onClick={handleAddCategoria}
					>
						<AddTaskOutlined
							sx={{ color: "#44A81D" }}
						/> <br />
						Criar nova
					</button>
				</div>
				<Divider orientation="horizontal"/>
				{montaCategoriasMovimentacao()}
			</div>
			<ModalCategoria
				closeModal={closeModalCategoria}
				isOpen={isOpenModalAdd}
				edit={edit}
				nome={nomeCategoria}
				icone={iconeCategoria}
				corIcone={corCategoria}
				idCategoria={idCategoria}
				handleEditCategoria={handleEditCategoria}
			/>
		</Fragment>
	);

	function montaCategoriasMovimentacao() {
		return props.categorias && props.categorias.length > 0
			? (<div className="list">
				<div className="headers">
					<p>Tipo</p>
					<p>Nome</p>
					<p>Ícone</p>
				</div>
				<div className="listagem">
					<div className="itens">
						{props.categorias.map((categoria, index) => (
							<Button
								key={categoria.id}
								onClick={() => handleEditCategoria(categoria.id, categoria.nomeCategoria,
									categoria.icone, categoria.corIcone)}
							>
								<p className={categoria.tipoMovimentacao} id="nome-categoria">
									{categoria.tipoMovimentacao === "POSITIVO" ? "Rendimentos" : "Gastos"}
								</p>
								<p>{categoria.nomeCategoria}</p>
								<ConverteIcone icone={categoria.icone} corIcone={categoria.corIcone}/>
							</Button>
						))}
					</div>
				</div>
			</div>
			)
			: <div className="lista-vazia">
				Nenhuma categoria foi cadastrada ainda!
			</div>
	}
};

export default Categorias;
