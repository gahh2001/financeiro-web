import { Dayjs } from "dayjs";
import { useAtom } from "jotai";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleIdAtom } from "../../atoms/atom";
import AppBar from "../../componentes/AppBar/AppBar";
import Dica from "../../componentes/dicas/Dica";
import Footer from "../../componentes/footer/Footer";
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
	const [ativo, setAtivo] = useState(false);
	const [edit, setEditPlanejamento] = useState(false);
	const [recorrencia, setRecorrenciaPlanejamento] = useState<string>('');
	const [valor, setValorPlanejamento] = useState<string>('');
	const [id, setIdPlanejamento] = useState(0);
	const [nome, setNomePlanejamento] = useState<string>('');
	const [dataInicio, setDataInicioPlanejamento] = useState<Dayjs | null>(null);
	const [dataFim, setDataFimPlanejamento] = useState<Dayjs | null>(null);
	const [categorias, setCategoriasPlanejamento] = useState<number[]>([]);
	const [openDicaPlanejamento, setOpenDicaPlanejamento] =
		useState(localStorage.getItem('dicaPlanejamento') !== "ok");
	const [openDicaAndamento, setOpenDicaAndamento] =
		useState(localStorage.getItem('dicaAndamento') !== "ok");
	const [openDicaDesempenho, setOpenDicaDesempenho] =
		useState(localStorage.getItem('dicaDesempenho') !== "ok");
	const [openDicaMoviemtacaoPlano, setOpenDicaMoviemtacaoPlano] =
		useState(localStorage.getItem('dicaMoviemtacaoPlano') !== "ok");

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
				<Dica
					frase='Crie planejamentos, metas financeiras, limites. Você consegue!'
					codigo="dicaPlanejamento"
					open={openDicaPlanejamento}
					setOpen={setOpenDicaPlanejamento}
				/>
				<ListagemPlanejamentos
					setAtivo={setAtivo}
					setEdit={setEditPlanejamento}
					setTipo={setTipoPlanejamento}
					setRecorrencia={setRecorrenciaPlanejamento}
					setValor={setValorPlanejamento}
					setId={setIdPlanejamento}
					setNome={setNomePlanejamento}
					setDataInicio={setDataInicioPlanejamento}
					setDataFim={setDataFimPlanejamento}
					setCategorias={setCategoriasPlanejamento}
				/>
				<Dica
					frase='Selecione um planejamento para ver o andamento dele.'
					codigo="dicaAndamento"
					open={openDicaAndamento}
					setOpen={setOpenDicaAndamento}
				/>
				<div className="grafic">
					<div className="titulo">Progresso</div>
					<CardProgresso/>
				</div>
				<Dica
					frase='Acompanhe o progresso do seu planejamento nos últimos meses'
					codigo="dicaDesempenho"
					open={openDicaDesempenho}
					setOpen={setOpenDicaDesempenho}
				/>
				<div className="grafic">
					<div className="titulo">Desempenho</div>
					<CardDesempenho/>
				</div>
				<Dica
					frase='Veja quais são as movimentações que estão afetando o seu planejamento'
					codigo="dicaMoviemtacaoPlano"
					open={openDicaMoviemtacaoPlano}
					setOpen={setOpenDicaMoviemtacaoPlano}
				/>
				<div className="grafic">
					<div className="titulo">Movimentações</div>
				</div>
			</div>
			<Footer/>
			<ModalPlanejamento
				edit={edit}
				ativo={ativo}
				id={id}
				nome={nome}
				tipo={tipoPlanejamento}
				recorrencia={recorrencia}
				valor={valor}
				dataInicio={dataInicio}
				dataFim={dataFim}
				categorias={categorias}
				setAtivo={setAtivo}
				setId={setIdPlanejamento}
				setEdit={setEditPlanejamento}
				setTipo={setTipoPlanejamento}
				setRecorrencia={setRecorrenciaPlanejamento}
				setValor={setValorPlanejamento}
				setNome={setNomePlanejamento}
				setDataInicio={setDataInicioPlanejamento}
				setDataFim={setDataFimPlanejamento}
				setCategorias={setCategoriasPlanejamento}
			/>
		</Fragment>
	);
}

export default Planejamentos;