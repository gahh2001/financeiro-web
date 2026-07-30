import { useAtom } from "jotai";
import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { accessToken } from "../../atoms/atom";
import AppBar from "../../componentes/AppBar/AppBar";
import Dica from '../../componentes/dicas/Dica';
import Footer from "../../componentes/footer/Footer";
import Calendario from "../../componentes/home/calendario/Calendario";
import InformacoesDoDia from "../../componentes/home/informacoesDoDiaCard/InformacoesDoDia";
import InformacoesDoMes from "../../componentes/home/informacoesDoMesCard/InformacoesDoMes";
import ModalAddMovimentacao from "../../componentes/home/modalAddMovimentacao/ModalAddMovimentacao";
import ModalApagaMovimentacao from "../../componentes/home/modalRemoveMovimentacao/ModalApagaMovimentacao";
import './Home.scss';

const Home: FC = () => {
	const isMounted = useRef(true);
	const navigate = useNavigate();
	const [accessTokenAtom] = useAtom(accessToken);
	const [openDicaInformacoesdia, setOpenDicaInformacoesdia] = useState(localStorage.getItem('dicaDia') !== "ok");
	const [openDicaCalendario, setOpenDicaCalendario] = useState(localStorage.getItem('dicaCalendario') !== "ok");
	const [openDicaMes, setOpenDicaMes] = useState(localStorage.getItem('dicaMes') !== "ok");

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		if (!accessTokenAtom && isMounted.current) {
			navigate("/login");
		}
	}, [accessTokenAtom]);

	return (
		<div className="home">
			<AppBar
				modulo="Home"
			/>
			<div className="conteudo-home">
				<Dica
					frase='Aqui você fica no controle sobre todas as movimentaçõe diárias'
					codigo="dicaDia"
					open={openDicaInformacoesdia}
					setOpen={setOpenDicaInformacoesdia}
				/>
				<InformacoesDoDia/>
				<Dica
					frase='Aqui você visualiza o seu calendário financeiro. Selecione um dia para ver as movimentações dele'
					codigo="dicaCalendario"
					open={openDicaCalendario}
					setOpen={setOpenDicaCalendario}
				/>
				<Calendario/>
				<Dica
					frase='Nestes gráficos você acompanha uma visão geral do mês selecionado no calendário'
					codigo="dicaMes"
					open={openDicaMes}
					setOpen={setOpenDicaMes}
				/>
				<InformacoesDoMes/>
			</div>
			<Footer/>
			<ModalAddMovimentacao/>
			<ModalApagaMovimentacao/>
		</div>
	);
}

export default Home;
