import { AddTaskOutlined } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import { FC, Fragment, useEffect, useState } from "react";
import AppBar from "../../componentes/AppBar/AppBar";
import back from '../../http';
import { ICategoriaMovimentacao } from "../../interfaces/ICategoriaMovimentacao";
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import { CategoriaMovimentacaoService } from "../../services/CategoriaMovimentacaoService";
import "./Configuracoes.scss";
import ConverteIcone from "./ConverteIcones";
import ModalCategoria from "./modalAdicionaCategoria/ModalCategoria";
import useModalCategoria from "./modalAdicionaCategoria/UseModalCategoria";

const Configuracoes: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
	const categoriaMovimentacaoService = new CategoriaMovimentacaoService(back);
	const [categorias, setCategorias] = useState<ICategoriaMovimentacao[]>([]);
	const {isOpenModalAdd, closeModalCategoria} = useModalCategoria();
	const [aba, setAba] = useState<string>("Categorias");
	const [edit, setEdit] = useState(false);
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
		const carregaCategorias = async () => {
			if (aba === "Categorias") {
				const categorias = await categoriaMovimentacaoService
					.obtemCategoriasMovimentacaoPorConta(props.googleId);
				if (categorias) {
					setCategorias(categorias?.data);
				}
			}
		}
		carregaCategorias();
	},[aba, isOpenModalAdd])

	return (
		<Fragment>
			<AppBar
				modulo="Configurações"
				urlPicture={props.urlPicture}
				setId={props.setId}
				setPicture={props.setPicture}
			/>
			<div className="configuracoes">
				<div className="card">
					<div className="card-menus">
						<Divider variant="fullWidth"/>
						<Button>Categorias de movimentação</Button>
						<Divider variant="fullWidth"/>
						<Button>Teste</Button>
						<Divider variant="fullWidth"/>
						<Button>Configuração</Button>
						<Divider variant="fullWidth"/>
					</div>
					<Divider orientation="vertical" variant="fullWidth"/>
					<div className="config">
						<div className="titulo">
							{aba}
						</div>
						<Divider orientation="horizontal"/>
						<div className="categorias">
							{montaCategoriasMovimentacao()}
							<Divider orientation="vertical"/>
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
						</div>
					</div>
				</div>
			</div>
			<ModalCategoria
				closeModal={closeModalCategoria}
				isOpen={isOpenModalAdd}
				edit={edit}
				nome={nomeCategoria}
				icone={iconeCategoria}
				corIcone={corCategoria}
				idCategoria={idCategoria}
				googleId={props.googleId}
				handleEditCategoria={handleEditCategoria}
			/>
		</Fragment>
	);

	function montaCategoriasMovimentacao() {
		return categorias && categorias.length > 0
			? ( <div className="list">
				<div className="headers">
					<p>Tipo</p>
					<p>Nome</p>
					<p>Ícone</p>
				</div>
				<div className="listagem">
					<div className="itens">
						{categorias.map((categoria, index) => (
							<Button
								key={categoria.id}
								onClick={() => handleEditCategoria(categoria.id, categoria.nomeCategoria,
									categoria.icone, categoria.corIcone)}
							>
								<p className={categoria.tipoMovimentacao}>
									{categoria.tipoMovimentacao === "POSITIVO" ? "Positiva" : "Negativa"}
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
}

export default Configuracoes