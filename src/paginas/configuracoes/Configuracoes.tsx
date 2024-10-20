import { Button, Divider } from "@mui/material";
import { FC, Fragment, useEffect, useState } from "react";
import AppBar from "../../componentes/AppBar/AppBar";
import Categorias from "../../componentes/configuracoes/categorias/Categorias";
import Geral from "../../componentes/configuracoes/geral/Geral";
import back from '../../http';
import { ICategoriaMovimentacao } from "../../interfaces/ICategoriaMovimentacao";
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import { CategoriaMovimentacaoService } from "../../services/CategoriaMovimentacaoService";
import "./Configuracoes.scss";
import useModalCategoria from "../../componentes/configuracoes/categorias/modalAdicionaCategoria/UseModalCategoria";

const Configuracoes: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
	const categoriaMovimentacaoService = new CategoriaMovimentacaoService(back);
	const [categorias, setCategorias] = useState<ICategoriaMovimentacao[]>([]);
	const {isOpenModalAdd: isOpenModalAddCategoria, closeModalCategoria} = useModalCategoria();
	const [aba, setAba] = useState<string>("CATEGORIAS");

	const handleEditAba = (nome: string) => {
		setAba(nome);
	}

	const handleAddCategoria = () => {
		closeModalCategoria();
	};

	useEffect(() => {
		const carregaCategorias = async () => {
			if (aba === "CATEGORIAS") {
				const categorias = await categoriaMovimentacaoService
					.obtemCategoriasMovimentacaoPorConta(props.googleId);
				if (categorias) {
					setCategorias(categorias?.data);
				}
			}
		}
		carregaCategorias();
	},[aba, isOpenModalAddCategoria]);

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
						<Button
							onClick={() => handleEditAba("CATEGORIAS")}
						>
							Categorias de movimentação
						</Button>
						<Divider variant="fullWidth"/>
						<Button
							onClick={() => handleEditAba("GERAL")}
						>
							Geral
						</Button>
						<Divider variant="fullWidth"/>
					</div>
					<Divider orientation="vertical" variant="fullWidth"/>
					<div className="config">
						<div className="titulo">
							{aba}
						</div>
						<Divider orientation="horizontal"/>
						{escolheConfiguracao()}
					</div>
				</div>
			</div>
		</Fragment>
	);

	function escolheConfiguracao() {
		switch (aba) {
			case "GERAL":
				return <Geral/>
			default:
				return <Categorias
					categorias={categorias}
					googleId={props.googleId}
					handleAddCategoria={handleAddCategoria}
				/>
		}
	}
}

export default Configuracoes