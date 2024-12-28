import { useAtom } from "jotai";
import { FC, Fragment, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { googleIdAtom } from "../../atoms/atom";
import AppBar from "../../componentes/AppBar/AppBar";
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
				<div className="lista">
				</div>
				<div className="graficos">
					<div className="grafic">
						<div className="titulo">Progresso</div>
					</div>
					<div className="grafic">
						<div className="titulo">Desempenho</div>
					</div>
					<div className="grafic">
						<div className="titulo">Movimentações</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default Planejamentos;