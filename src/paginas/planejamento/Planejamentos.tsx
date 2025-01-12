import { useAtom } from "jotai";
import { FC, Fragment, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { googleIdAtom } from "../../atoms/atom";
import AppBar from "../../componentes/AppBar/AppBar";
import CardDesempenho from "../../componentes/planejamentos/cardDesempenho/CardDesempenho";
import CardProgresso from "../../componentes/planejamentos/cardProgresso/CardProgresso";
import ListagemPlanejamentos from "../../componentes/planejamentos/listagemPlanejamentos/Listagem";
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import './Planejamentos.scss';

const Planejamentos: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
	const [googleId] = useAtom(googleIdAtom);
	const isMounted = useRef(true);
	const navigate = useNavigate();
	useEffect(() => {
		if (!googleId && isMounted.current) {
			navigate("/login")
		}
	}, [googleId]);

	return (
		<Fragment>
			<AppBar
				modulo="Planejamentos"
				urlPicture={props.urlPicture}
				setId={props.setId}
				setPicture={props.setPicture}
			/>
			<div className="planejamentos">
				<ListagemPlanejamentos/>
				<div className="grafic">
					<div className="titulo">Progresso</div>
					<CardProgresso/>
				</div>
				<div className="grafic">
					<div className="titulo">Desempenho</div>
					<CardDesempenho/>
				</div>
				<div className="grafic">
					<div className="titulo">Movimentações</div>
				</div>
			</div>
		</Fragment>
	);
}

export default Planejamentos;