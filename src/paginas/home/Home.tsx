import { useAtom } from "jotai";
import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { accessToken, modalRemoveMovimentacao } from "../../atoms/atom";
import AppBar from "../../componentes/AppBar/AppBar";
import Dica from '../../componentes/dicas/Dica';
import Footer from "../../componentes/footer/Footer";
import Calendario from "../../componentes/home/calendario/Calendario";
import InformacoesDoDia from "../../componentes/home/informacoesDoDiaCard/InformacoesDoDia";
import InformacoesDoMes from "../../componentes/home/informacoesDoMesCard/InformacoesDoMes";
import ModalAddMovimentacao from "../../componentes/home/modalAddMovimentacao/ModalAddMovimentacao";
import ModalApagaMovimentacao from "../../componentes/home/modalRemoveMovimentacao/ModalApagaMovimentacao";
import { TipoMovimentacaoEnum } from '../../enums/TipoMovimentacaoEnum';
import { Movimentacao } from "../../types/Movimentacao";
import './Home.scss';

const Home: FC = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [idMovimentacao, setIdMovimentacao] = useState<number | undefined>(undefined);
	const [data, setData] = useState(new Date());
	const [categoria, setCategoria] = useState("");
	const [valor, setValor] = useState("");
	const [descricao, setDescricao] = useState("");
	const [alterarSaldo, ] = useState(true);
	const [movimentacoesDoMes, setMovimentacoesDoMes] = useState<Movimentacao[]>([]);
	const [edit, setEdit] = useState(false);
	const [tipo, setTipo] = useState(TipoMovimentacaoEnum.POSITIVO);
	const [movimentacaoApagar, setMovimentacaoApagar] = useState<Movimentacao | null>(null);
	const [visivel, setVisivel] = useState(false);
	const isMounted = useRef(true);
	const navigate = useNavigate();
	const [accessTokenAtom] = useAtom(accessToken);
	const [openDicaInformacoesdia, setOpenDicaInformacoesdia] = useState(localStorage.getItem('dicaDia') !== "ok");
	const [openDicaCalendario, setOpenDicaCalendario] = useState(localStorage.getItem('dicaCalendario') !== "ok");
	const [openDicaMes, setOpenDicaMes] = useState(localStorage.getItem('dicaMes') !== "ok");
	const [, setOpenModalRemove] = useAtom(modalRemoveMovimentacao);

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		if (!accessTokenAtom && isMounted.current) {
			navigate("/login")
		}
	}, [accessTokenAtom]);

	const propsMovimentcoesMes = (movimentacoes: Movimentacao[]) => {
		setMovimentacoesDoMes(movimentacoes)
	}
	const propsCalendario = (date: Date) => {
		setSelectedDate(date);
	};
	const propsModalAddRendimento = () => {
		setTipo(TipoMovimentacaoEnum.POSITIVO);
		setEdit(false);
	}
	const propsModalAddDespesa = () => {
		setTipo(TipoMovimentacaoEnum.NEGATIVO);
		setEdit(false);
	}
	const setVisible = () => {
		setVisivel(!visivel);
	}
	const propsModalApagaRendimento = (movimentacaoApagar: Movimentacao) => {
		movimentacaoApagar.tipoMovimentacao.toUpperCase() === TipoMovimentacaoEnum.POSITIVO
			? setTipo(TipoMovimentacaoEnum.POSITIVO)
			: setTipo(TipoMovimentacaoEnum.NEGATIVO);
		setMovimentacaoApagar(movimentacaoApagar);
		setOpenModalRemove(true);
	}

	const handleEditMovimentacao = (idMovimentacao: number | undefined, data: Date, valor: string,
			categoria: string, descricao: string, tipo: TipoMovimentacaoEnum) => {
		setIdMovimentacao(idMovimentacao)
		setEdit(true)
		setTipo(tipo)
		setData(data);
		setCategoria(categoria);
		setValor(valor);
		setDescricao(descricao);
	}

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
				<InformacoesDoDia
					selectedDate={selectedDate}
					movimentacoesMes={movimentacoesDoMes}
					modalAddDespesa={propsModalAddDespesa}
					modalApagaMovimentacao={propsModalApagaRendimento}
					handleEditMovimentacao={handleEditMovimentacao}
					setVisible={setVisible}
					visivel={visivel}
				/>
				<Dica
					frase='Aqui você visualiza o seu calendário financeiro. Selecione um dia para ver as movimentações dele'
					codigo="dicaCalendario"
					open={openDicaCalendario}
					setOpen={setOpenDicaCalendario}
				/>
				<Calendario
					onDayClick={propsCalendario}
					atualizaMovimentacoesMes={propsMovimentcoesMes}
					movimentacoesMes={movimentacoesDoMes}
				/>
				<Dica
					frase='Nestes gráficos você acompanha uma visão geral do mês selecionado no calendário'
					codigo="dicaMes"
					open={openDicaMes}
					setOpen={setOpenDicaMes}
				/>
				<InformacoesDoMes
					selectedDate={selectedDate}
					movimentacoesMes={movimentacoesDoMes}
					modalAddRendimento={propsModalAddRendimento}
					modalAddDespesa={propsModalAddDespesa}
					visivel={visivel}
				/>
			</div>
			<Footer/>
			<ModalAddMovimentacao
				edit={edit}
				idMovimentacao={idMovimentacao}
				date={data}
				categoria={categoria}
				valor={valor}
				descricao={descricao}
				alteraSaldo={alterarSaldo}
				selectedDate={selectedDate}
				movimentacoesMes={movimentacoesDoMes}
				atualizaMovimentacoesMes={propsMovimentcoesMes}
			/>
			<ModalApagaMovimentacao
				tipo={tipo}
				movimentacao={movimentacaoApagar}
			/>
		</div>
	);
}

export default Home;