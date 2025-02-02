import { Box, Link } from "@mui/material";
import { useAtom } from "jotai";
import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleIdAtom } from "../../atoms/atom";
import AppBar from "../../componentes/AppBar/AppBar";
import Textos from "../../componentes/Textos";
import Footer from "../../componentes/footer/Footer";
import DialogDescricaoMovimentacao from "../../componentes/home/informacoesDoDiaCard/dialogDescricaoMovimentacao/DialogDescricaoMovimentacao";
import InformacoesDoMes from "../../componentes/home/informacoesDoMesCard/InformacoesDoMes";
import ModalAddMovimentacao from "../../componentes/home/modalAddMovimentacao/ModalAddMovimentacao";
import useModalAddMovimentacao from "../../componentes/home/modalAddMovimentacao/UseModalAddMovimentacao";
import ModalApagaMovimentacao from "../../componentes/home/modalRemoveMovimentacao/ModalApagaMovimentacao";
import useModalRemoveMovimentacao from "../../componentes/home/modalRemoveMovimentacao/UseModalRemoveMovimentacao";
import { TipoMovimentacaoEnum } from '../../enums/TipoMovimentacaoEnum';
import image1 from '../../imagensGoogle/1.png';
import image10 from '../../imagensGoogle/10.jpg';
import image2 from '../../imagensGoogle/2.jpg';
import image3 from '../../imagensGoogle/3.jpg';
import image6 from '../../imagensGoogle/6.jpeg';
import image9 from '../../imagensGoogle/9.jpg';
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import { Movimentacao } from "../../types/Movimentacao";
import './Home.scss';

const Home: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [idMovimentacao, setIdMovimentacao] = useState<number | undefined>(undefined);
	const [data, setData] = useState(new Date());
	const [categoria, setCategoria] = useState("");
	const [valor, setValor] = useState("");
	const [descricao, setDescricao] = useState("");
	const [movimentacoesDoMes, setMovimentacoesDoMes] = useState<Movimentacao[]>([]);
	const [edit, setEdit] = useState(false);
	const {isOpenModalAdd, closeModalAdd} = useModalAddMovimentacao();
	const {isOpenModalRemove, closeModalRemove} = useModalRemoveMovimentacao();
	const [isOpenDialogDescricao, setIsOpenDialogDescricao] = useState(false);
	const [tipo, setTipo] = useState(TipoMovimentacaoEnum.POSITIVO);
	const [movimentacaoApagar, setMovimentacaoApagar] = useState<Movimentacao | null>(null);
	const [visivel, setVisivel] = useState(false);
	const isMounted = useRef(true);
	const navigate = useNavigate();
	const [googleId] = useAtom(googleIdAtom);
	const [openDicaInformacoesdia, setOpenDicaInformacoesdia] = useState(localStorage.getItem('dicaDia') !== "ok");
	const [openDicaCalendario, setOpenDicaCalendario] = useState(localStorage.getItem('dicaCalendario') !== "ok");
	const [openDicaMes, setOpenDicaMes] = useState(localStorage.getItem('dicaMes') !== "ok");

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		if (!googleId && isMounted.current) {
			//navigate("/login")
		}
	}, [googleId]);

	const propsMovimentcoesMes = (movimentacoes: Movimentacao[]) => {
		setMovimentacoesDoMes(movimentacoes)
	}
	const propsCalendario = (date: Date) => {
		setSelectedDate(date);
	};
	const propsModalAddRendimento = () => {
		setTipo(TipoMovimentacaoEnum.POSITIVO);
		setEdit(false);
		closeModalAdd();
	}
	const propsModalAddDespesa = () => {
		setTipo(TipoMovimentacaoEnum.NEGATIVO);
		setEdit(false);
		closeModalAdd();
	}
	const setVisible = () => {
		setVisivel(!visivel);
	}
	const propsModalApagaRendimento = (movimentacaoApagar: Movimentacao) => {
		movimentacaoApagar.tipoMovimentacao.toUpperCase() === TipoMovimentacaoEnum.POSITIVO
			? setTipo(TipoMovimentacaoEnum.POSITIVO)
			: setTipo(TipoMovimentacaoEnum.NEGATIVO);
		closeModalRemove();
		setMovimentacaoApagar(movimentacaoApagar);
	}

	const propsDialogDescricao = (description: string) => {
		setIsOpenDialogDescricao(true);
		setDescricao(description);
	}

	const closeDialogDescricao = () => {
		setIsOpenDialogDescricao(false);
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
		closeModalAdd();
	}

	return (
		<div className="home">
			<AppBar
				modulo="Home"
				urlPicture={props.urlPicture}
				setId={props.setId}
				setPicture={props.setPicture}
			/>
			<div className="conteudo-home">
				<Textos
					titulo="A Importância da Organização Financeira"
					texto="A organização financeira é um dos pilares para uma vida mais tranquila e equilibrada.
					Quando temos controle sobre nossas finanças, conseguimos tomar decisões mais seguras, evitar
					dívidas desnecessárias e planejar o futuro com mais confiança.
					Um dos principais benefícios de uma boa gestão financeira é a prevenção de endividamentos.
					Muitas pessoas acabam contraindo dívidas porque não acompanham seus gastos e acabam gastando
					mais do que ganham. Com planejamento, é possível evitar esse problema e reduzir custos com juros,
					que podem comprometer o orçamento.O planejamento financeiro é um dos pilares fundamentais para uma vida tranquila e segura. Muitas pessoas enfrentam dificuldades financeiras não por falta de renda, mas por não saberem administrá-la corretamente. Sem um plano bem estruturado, fica fácil cair em dívidas, perder oportunidades de investimento e comprometer a qualidade de vida.Por outro lado, quem adota hábitos financeiros saudáveis consegue conquistar estabilidade, acumular patrimônio e realizar seus sonhos de maneira sustentável. Este texto abordará em detalhes a importância do planejamento financeiro, seus benefícios e os passos essenciais para colocá-lo em prática."
				/>
				<img src={image1} style={{width: "30%"}} alt="" />
				<Textos
					titulo="Alcançar Objetivos"
					texto="Seja para comprar um carro, viajar, investir na educação ou até mesmo conquistar a
					independência financeira, ter uma organização financeira permite que você estabeleça metas e
					desenvolva um plano para alcançá-las. Guardar dinheiro de forma estratégica possibilita concretizar
					esses objetivos sem comprometer outras áreas da vida. Imprevistos acontecem, e estar financeiramente
					preparado para eles faz toda a diferença. Ter uma reserva de emergência garante mais segurança
					em situações inesperadas, como problemas de saúde, perda de emprego ou qualquer
					outro evento que possa impactar sua renda.O planejamento financeiro é uma ferramenta essencial para garantir estabilidade, segurança e realização de objetivos. Independentemente da renda ou da fase da vida em que a pessoa se encontra, organizar as finanças é fundamental para evitar dívidas desnecessárias, alcançar metas e construir um patrimônio sustentável."
				/>
				<Textos
					titulo="Dicas para Melhorar sua Organização Financeira"
					texto="Registre seus ganhos e gastos: Anote todas as movimentações financeiras para entender para onde seu dinheiro está indo.
						Estabeleça um orçamento: Defina limites para cada categoria de despesa e evite gastar além do planejado.
						Priorize o pagamento de dívidas: Caso tenha dívidas, tente quitá-las o quanto antes para evitar juros acumulados.
						Invista no seu futuro: Considere fazer investimentos para garantir uma renda extra no longo prazo.
						Revise seu planejamento regularmente: Acompanhe sua evolução e ajuste seu planejamento sempre que necessário.O planejamento financeiro é um hábito poderoso que pode transformar a vida de qualquer pessoa. Com disciplina e organização, é possível alcançar estabilidade financeira, reduzir preocupações e conquistar objetivos de forma consciente e sustentável. Quanto antes você começar, melhores serão os resultados no futuro! "
				/>
				<img src={image2} style={{width: "30%"}} alt="" />
				<Textos
					titulo="Por que Investir é Importante?"
					texto="Investir é uma das maneiras mais eficazes de garantir um futuro financeiro estável e tranquilo.
					Enquanto a poupança tradicional pode ser uma opção segura, ela geralmente oferece retornos baixos,
					que não acompanham a inflação. Por outro lado, os investimentos bem planejados podem proporcionar
					ganhos significativos e ajudar a alcançar objetivos de longo prazo, como a aposentadoria, a compra
					de uma casa ou a realização de sonhos pessoais. No entanto, investir de forma consciente e estratégica
					é essencial para maximizar os retornos e minimizar os riscos."
				/>
				<Textos
					titulo=""
					texto="Nos gráficos abaixo, veja uma comparação dos primcipais gastos do brasileiro no ano de 2024"
				/>
				<InformacoesDoMes
					selectedDate={selectedDate}
					movimentacoesMes={movimentacoesDoMes}
					modalAddRendimento={propsModalAddRendimento}
					modalAddDespesa={propsModalAddDespesa}
					modalApagaMovimentacao={propsModalApagaRendimento}
					visivel={visivel}
				/>
				<Textos
					titulo="O Impacto da Falta de Organização Financeira"
					texto="Pesquisas indicam que cerca de 70% das pessoas que não possuem um planejamento financeiro estruturado enfrentam dificuldades para pagar contas básicas no fim do mês. Isso ocorre porque a falta de controle sobre os gastos leva ao endividamento e à dependência de crédito, resultando em altos juros e dificuldades financeiras constantes.
					Além disso, estudos apontam que mais de 60% das pessoas que não fazem uma reserva de emergência recorrem a empréstimos quando enfrentam imprevistos, como uma despesa médica inesperada ou a perda do emprego. Esse comportamento pode levar a um ciclo de endividamento difícil de quebrar.
					Outro dado preocupante é que aproximadamente 80% das pessoas que não acompanham suas finanças pessoais não conseguem economizar dinheiro de forma consistente, o que compromete seus planos de longo prazo, como a compra da casa própria, viagens ou aposentadoria. Planejamento financeiro é o processo de organizar sua renda, despesas, investimentos e objetivos financeiros de forma estratégica. Ele envolve tomar decisões conscientes sobre como gastar, poupar e investir o dinheiro, garantindo que você esteja sempre no controle da sua vida financeira.Diferente do que muitos pensam, planejamento financeiro não é algo exclusivo para pessoas ricas. Qualquer pessoa, independentemente da renda, pode (e deve) adotar esse hábito para evitar problemas financeiros e construir um futuro sólido."
				/>
				<img src={image6} style={{width: "30%"}} alt="" />
				<Textos
					titulo=""
					texto="Por outro lado, estudos mostram que mais de 75% das pessoas que mantêm um orçamento mensal conseguem atingir suas metas financeiras com mais rapidez e menos esforço. Esse planejamento permite priorizar gastos essenciais, evitar desperdícios e criar hábitos saudáveis de economia.Além disso, cerca de 85% das pessoas que investem regularmente e fazem planejamento financeiro relatam sentir maior segurança e tranquilidade em relação ao futuro. Isso se deve ao fato de que, ao manter um controle sobre a renda e os investimentos, é possível construir um patrimônio sólido ao longo dos anos.Outro dado relevante aponta que mais de 90% das pessoas que possuem uma reserva de emergência conseguem lidar com imprevistos sem precisar recorrer a dívidas. Essa prática garante mais estabilidade e evita que crises financeiras impactem negativamente a qualidade de vida."
				/>
				<Box sx={{width: "60%", height: "20vh", display: "flex", justifyContent: "left", gap: "1vh", alignItems: "end"}}>
					<img src={image3} style={{width: "25%"}} alt="" />
					<Link sx={{fontSize: "3vh"}} href="/analitico">Acesse o conteúdo sobre investimentos, para se aprofundar melhor nos melhores investimentos</Link>
				</Box>
				<Box sx={{width: "60%", height: "20vh", display: "flex", justifyContent: "left", gap: "1vh", alignItems: "end"}}>
					<img src={image9} style={{width: "25%"}} alt="" />
					<Link sx={{fontSize: "3vh"}} href="/movimentacoes">Veja como estão os indicadores do mercado financeiro e o que esperar do cenário de finanças no ano de 2025</Link>
				</Box>
				<Box sx={{width: "60%", height: "20vh", display: "flex", justifyContent: "left", gap: "1vh", alignItems: "end"}}>
					<img src={image10} style={{width: "25%"}} alt="" />
					<Link sx={{fontSize: "3vh"}} href="/planejamentos">Veja como está o cenário de criptomoedas para o ano de 2025, previsões e expectativas</Link>
				</Box>
			</div>
			<Footer/>
			<ModalAddMovimentacao
				isOpen={isOpenModalAdd}
				tipo= {tipo}
				edit={edit}
				idMovimentacao={idMovimentacao}
				date={data}
				categoria={categoria}
				valor={valor}
				descricao={descricao}
				selectedDate={selectedDate}
				movimentacoesMes={movimentacoesDoMes}
				closeModal={closeModalAdd}
				atualizaMovimentacoesMes={propsMovimentcoesMes}
			/>
			<ModalApagaMovimentacao
				isOpen={isOpenModalRemove}
				tipo={tipo}
				closeModalRemove={closeModalRemove}
				movimentacao={movimentacaoApagar}
			/>
			<DialogDescricaoMovimentacao
				openDialog={isOpenDialogDescricao}
				description={descricao}
				onClose={closeDialogDescricao}
			/>
		</div>
	);
}

export default Home;