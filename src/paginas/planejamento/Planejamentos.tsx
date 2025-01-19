import { Dayjs } from "dayjs";
import { useAtom } from "jotai";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleIdAtom } from "../../atoms/atom";
import AppBar from "../../componentes/AppBar/AppBar";
import CardDesempenho from "../../componentes/planejamentos/cardDesempenho/CardDesempenho";
import CardProgresso from "../../componentes/planejamentos/cardProgresso/CardProgresso";
import ListagemPlanejamentos from "../../componentes/planejamentos/listagemPlanejamentos/Listagem";
import ModalPlanejamento from "../../componentes/planejamentos/modalPlanejamento/ModalPlanejamento";
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import './Planejamentos.scss';

const Planejamentos: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
	const [googleId] = useAtom(googleIdAtom);	
	const isMounted = useRef(true);
	const navigate = useNavigate();
	const [tipoPlanejamento, setTipoPlanejamento] = useState<string>('');
	const [recorrencia, setRecorrenciaPlanejamento] = useState<string>('');
	const [valor, setValorPlanejamento] = useState<string>('');
	const [nome, setNomePlanejamento] = useState<string>('');
	const [dataInicio, setDataInicioPlanejamento] = useState<Dayjs | null>(null);
	const [dataFim, setDataFimPlanejamento] = useState<Dayjs | null>(null);

	useEffect(() => {
		if (!googleId && isMounted.current) {
			navigate("/login")
		}
	}, [googleId]);

	function setTipo(tipo: string) {
		setTipoPlanejamento(tipo);
	}

	function setRecorrencia(recorrencia: string) {
		setRecorrenciaPlanejamento(recorrencia);
	}

	function setValor(valor: string) {
		setValorPlanejamento(valor);
	}

	function setNome(nome: string) {
		setNomePlanejamento(nome);
	}

	function setDataInicio(data: Dayjs | null) {
		setDataInicioPlanejamento(data);
	}

	function setDataFim(data: Dayjs | null) {
		setDataFimPlanejamento(data);
	}

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
			<ModalPlanejamento
				nome={nome}
				tipo={tipoPlanejamento}
				recorrencia={recorrencia}
				valor={valor}
				dataInicio={dataInicio}
				dataFim={dataFim}
				setTipo={setTipo}
				setRecorrencia={setRecorrencia}
				setValor={setValor}
				setNome={setNome}
				setDataInicio={setDataInicio}
				setDataFim={setDataFim}
			/>
		</Fragment>
	);
}

export default Planejamentos;