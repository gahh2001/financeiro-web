import { AddCircleOutlineRounded, AddTaskOutlined } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import { FC, Fragment, useEffect, useState } from "react";
import AppBar from "../../componentes/AppBar/AppBar";
import back from '../../http';
import { ICategoriaMovimentacao } from "../../interfaces/ICategoriaMovimentacao";
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import { CategoriaMovimentacaoService } from "../../services/CategoriaMovimentacaoService";
import "./Configuracoes.scss";

const Configuracoes: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
	const categoriaMovimentacaoService = new CategoriaMovimentacaoService(back);
	const [categorias, setCategorias] = useState<ICategoriaMovimentacao[]>([]);
	const [aba, setAba] = useState<string>("Categorias")

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
	},[aba])

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
						{montaCategoriasMovimentacao()}
					</div>
				</div>
			</div>
		</Fragment>
	);

	function montaCategoriasMovimentacao() {
		return (
			<div className="categorias">
				<div className="list">
					<div className="headers">
						<p>Tipo</p>
						<p>Nome</p>
						<p>Ícone</p>
					</div>
					<div className="listagem">
						<Divider/>
						<div className="itens">
							{categorias.map((categoria, index) => (
								<Button key={categoria.id}>
									<p className={categoria.tipoMovimentacao}>
										{categoria.tipoMovimentacao === "POSITIVO" ? "Positiva" : "Negativa"}
									</p>
									<p>{categoria.nomeCategoria}</p>
									<AddCircleOutlineRounded sx={{color: categoria.corSimbolo}}/>
								</Button>
							))}
						</div>
					</div>
				</div>
				<div className="adicionar">
					<button
						//style={{ marginRight: "40px" }}
						//onClick={props.modalAddRendimento}
					>
						<AddTaskOutlined
							sx={{ color: "#44A81D" }}
						/> <br />
						Criar nova
					</button>
				</div>
			</div>
		)
	}
}

export default Configuracoes