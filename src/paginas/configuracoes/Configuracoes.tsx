import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleIdAtom } from "../../atoms/atom";
import AppBar from "../../componentes/AppBar/AppBar";
import Categorias from "../../componentes/configuracoes/categorias/Categorias";
import useModalCategoria from "../../componentes/configuracoes/categorias/modalAdicionaCategoria/UseModalCategoria";
import Geral from "../../componentes/configuracoes/geral/Geral";
import Footer from '../../componentes/footer/Footer';
import back from '../../http';
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import { CategoriaMovimentacaoService } from "../../services/CategoriaMovimentacaoService";
import { CategoriaMovimentacao } from "../../types/CategoriaMovimentacao";
import "./Configuracoes.scss";

const Configuracoes: FC = () => {
	const categoriaMovimentacaoService = new CategoriaMovimentacaoService(back);
	const [categorias, setCategorias] = useState<CategoriaMovimentacao[]>([]);
	const {isOpenModalAdd: isOpenModalAddCategoria, closeModalCategoria} = useModalCategoria();
	const [aba, setAba] = useState<string | false>("CATEGORIAS");
	const [googleId] = useAtom(googleIdAtom);
	const isMounted = useRef(true);
	const navigate = useNavigate();

	const handleAddCategoria = () => {
		closeModalCategoria();
	};

	const handleChange =(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
		setAba(isExpanded ? panel : false);
	};

	useEffect(() => {
		const carregaCategorias = async () => {
			const categorias = await categoriaMovimentacaoService
				.obtemCategoriasMovimentacaoPorConta(googleId);
			if (categorias) {
				setCategorias(categorias?.data);
			}
		}
		carregaCategorias();
	},[isOpenModalAddCategoria]);

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
			/>
			<div className="configuracoes">
				<div className="card">
					<Accordion
						expanded={aba === 'CATEGORIAS'}
						onChange={handleChange('CATEGORIAS')}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="CATEGORIAS"
							id="CATEGORIAS"
							sx={{display: "flex", justifyContent: "center"}}
						>
							<Typography variant='h6'>Categorias de movimentação</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Categorias
								categorias={categorias}
								handleAddCategoria={handleAddCategoria}
							/>
						</AccordionDetails>
					</Accordion>
					<Accordion expanded={aba === 'GERAL'} onChange={handleChange('GERAL')}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="GERAL"
							id="GERAL"
						>
							<Typography variant='h6'>Configurações gerais</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Geral/>
						</AccordionDetails>
					</Accordion>
				</div>
			</div>
			<Footer/>
		</Fragment>
	);
}

export default Configuracoes