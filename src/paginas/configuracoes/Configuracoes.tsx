import { Button, Divider } from "@mui/material";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "../../componentes/AppBar/AppBar";
import Categorias from "../../componentes/configuracoes/categorias/Categorias";
import useModalCategoria from "../../componentes/configuracoes/categorias/modalAdicionaCategoria/UseModalCategoria";
import Geral from "../../componentes/configuracoes/geral/Geral";
import back from '../../http';
import { ICategoriaMovimentacao } from "../../interfaces/ICategoriaMovimentacao";
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import { CategoriaMovimentacaoService } from "../../services/CategoriaMovimentacaoService";
import "./Configuracoes.scss";
import { useAtom } from "jotai";
import { googleIdAtom } from "../../atoms/atom";

const Configuracoes: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
	const categoriaMovimentacaoService = new CategoriaMovimentacaoService(back);
	const [categorias, setCategorias] = useState<ICategoriaMovimentacao[]>([]);
	const {isOpenModalAdd: isOpenModalAddCategoria, closeModalCategoria} = useModalCategoria();
	const [aba, setAba] = useState<string>("CATEGORIAS");
	const [googleId] = useAtom(googleIdAtom);
	const isMounted = useRef(true);
	const navigate = useNavigate();

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
					.obtemCategoriasMovimentacaoPorConta(googleId);
				if (categorias) {
					setCategorias(categorias?.data);
				}
			}
		}
		carregaCategorias();
	},[aba, isOpenModalAddCategoria]);

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		if (!googleId && isMounted.current) {
			navigate("/login")
		}
	}, [googleId]);

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
						<Divider orientation="horizontal"/>
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
					handleAddCategoria={handleAddCategoria}
				/>
		}
	}
}

export default Configuracoes