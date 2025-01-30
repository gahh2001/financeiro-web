import { Box, Link } from "@mui/material";
import { Dayjs } from "dayjs";
import { useAtom } from "jotai";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleIdAtom } from "../../atoms/atom";
import AppBar from "../../componentes/AppBar/AppBar";
import Footer from "../../componentes/footer/Footer";
import CardDesempenho from "../../componentes/planejamentos/cardDesempenho/CardDesempenho";
import CardProgresso from "../../componentes/planejamentos/cardProgresso/CardProgresso";
import ModalPlanejamento from "../../componentes/planejamentos/modalPlanejamento/ModalPlanejamento";
import Textos from "../../componentes/Textos";
import image10 from '../../imagensGoogle/10.jpg';
import image11 from '../../imagensGoogle/11.webp';
import image3 from '../../imagensGoogle/3.jpg';
import image9 from '../../imagensGoogle/9.jpg';
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
			//navigate("/login")
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
				<Textos
					titulo="Desempenho Recente das Principais Criptomoedas"
					texto="Nos últimos meses, o mercado cripto tem experimentado volatilidade acentuada, influenciada por eventos econômicos e tecnológicos. Recentemente, o Bitcoin (BTC) atingiu um novo recorde, ultrapassando os US$ 109.000, impulsionado pela expectativa em torno das políticas do presidente dos EUA, Donald Trump, em relação aos ativos digitais. No entanto, após a posse presidencial, o BTC sofreu uma correção, especialmente devido à ausência de menções diretas às criptomoedas no discurso inaugural. Além disso, movimentos no mercado de tecnologia, como a entrada da startup chinesa DeepSeek com seu novo modelo de inteligência artificial, geraram pânico no setor tecnológico, afetando empresas como a Nvidia. Essas turbulências nos mercados tradicionais repercutiram no mercado cripto, levando a uma correção significativa nos preços das principais criptomoedas."
				/>
				<img src={image10} style={{width: "40%"}} alt="" />
				<Textos
					titulo=""
					texto="Veja o gráfico abaixo, o progreço do preço do Bitcoin comparado com as previsões para o primeiro semestre de 2025"
				/>
				<div className="grafic">
					<div className="titulo">Progresso</div>
					<CardProgresso/>
				</div>
				<Textos
					titulo="Adoção Institucional e Perspectivas Futuras"
					texto="A adoção institucional das criptomoedas continua a crescer. Larry Fink, CEO da BlackRock, expressou otimismo em relação ao futuro do Bitcoin, sugerindo que seu valor poderia quintuplicar caso grandes investidores institucionais, como fundos soberanos, entrem no mercado. Ele mencionou que uma alocação de 2% a 5% dos ativos desses fundos em Bitcoin poderia elevar seu preço para até US$ 700.000. Paralelamente, a regulamentação global das criptomoedas está se tornando mais rigorosa, com foco em medidas contra a lavagem de dinheiro (AML), conheça seu cliente (KYC) e proteção ao investidor. Empresas do setor precisam navegar por estruturas regulatórias como o MiCA na Europa e a supervisão da SEC e da CFTC nos EUA. Recentemente, o mercado cripto tem sido influenciado por movimentos nos mercados tradicionais. Por exemplo, quedas significativas no índice Nasdaq impactaram negativamente o mercado de criptomoedas, evidenciando uma correlação crescente entre ativos digitais e ações de tecnologia. Além disso, declarações de líderes do setor financeiro, como Larry Fink, CEO da BlackRock, têm gerado debates sobre o futuro das criptomoedas. Fink sugeriu que o valor do Bitcoin poderia quintuplicar caso grandes investidores institucionais aumentassem sua exposição ao ativo, embora outros analistas permaneçam cautelosos, classificando o Bitcoin como um ativo especulativo."
				/>
				<img src={image11} style={{width: "40%"}} alt="" />
				<Textos
					titulo="Perspectivas para 2025"
					texto="De acordo com estimativas da Statista, espera-se que a receita do mercado global de criptomoedas atinja quase €44 bilhões em 2025, com uma base de usuários projetada de 861 milhões de pessoas. Com o aumento da adoção, é provável que as regulamentações globais se tornem mais rigorosas, focando em medidas contra a lavagem de dinheiro (AML), conheça seu cliente (KYC) e proteção ao investidor. Empresas do setor precisarão navegar por estruturas regulatórias como o MiCA na Europa e a supervisão da SEC e CFTC nos Estados Unidos. Em termos de desempenho, o Bitcoin registrou um crescimento impressionante de 183,25% ao longo de 2024, destacando-se como um dos ativos de melhor desempenho no período. No entanto, o mercado de criptomoedas permanece altamente volátil e sensível a uma variedade de fatores externos. Investidores são aconselhados a manter cautela, realizar análises detalhadas e considerar a diversificação de seus portfólios para mitigar riscos associados a esse mercado dinâmico."
				/>
				<div className="grafic">
					<div className="titulo">Desempenho</div>
					<CardDesempenho/>
				</div>
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