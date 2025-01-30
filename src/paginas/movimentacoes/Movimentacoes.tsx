import { Box, Link } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import dayjs, { Dayjs } from "dayjs";
import { useAtom } from "jotai";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleIdAtom } from "../../atoms/atom";
import AppBar from "../../componentes/AppBar/AppBar";
import Footer from "../../componentes/footer/Footer";
import DialogDescricaoMovimentacao from "../../componentes/home/informacoesDoDiaCard/dialogDescricaoMovimentacao/DialogDescricaoMovimentacao";
import Textos from "../../componentes/Textos";
import { TipoMovimentacaoEnum } from "../../enums/TipoMovimentacaoEnum";
import image3 from '../../imagensGoogle/3.jpg';
import image8 from '../../imagensGoogle/8.jpg';
import image9 from '../../imagensGoogle/9.webp';
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import './Movimentacoes.scss';


const Movimentacoes: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
	const [dataInicio, setDataInicio] = useState<Dayjs | null>(() => {
		const inicioMes = new Date();
		inicioMes.setDate(1);
		return dayjs(inicioMes);
	});
	const [dataFim, setDataFim] = useState<Dayjs | null>(() => {
		const fimMes = new Date();
		fimMes.setMonth(fimMes.getMonth() + 1);
		fimMes.setDate(0);
		return dayjs(fimMes);
	});
	const [openDicaMovimentacao, setOpenDicaMovimentacao] = useState(localStorage.getItem('dicaMovimentacao') !== "ok");
	const [isOpenDialogDescricao, setIsOpenDialogDescricao] = useState(false);
	const [descricao, setDescricao] = useState("");
	const [tipo, setTipo] = useState<string>(TipoMovimentacaoEnum.TODOS.toString());
	const [categorias, setCategorias] = useState(["Todas"]);
	const [googleId] = useAtom(googleIdAtom);
	const isMounted = useRef(true);
	const navigate = useNavigate();

	const setDataInicioProps = (newValue: Dayjs | null) => {
		setDataInicio(newValue);
	}
	const setDataFimProps = (newValue: Dayjs | null) => {
		setDataFim(newValue);
	}
	const setCategoriasProps = (value: string[]) => {
		setCategorias(value);
	}
	const setTipoProps = (value: string) => {
		setTipo(value);
	}
	const propsDialogDescricao = (description: string) => {
		setIsOpenDialogDescricao(true);
		setDescricao(description);
	}
	const closeDialogDescricao = () => {
		setIsOpenDialogDescricao(false);
	}

	useEffect(() => {
		if (!googleId && isMounted.current) {
			//navigate("/login")
		}
	}, [googleId]);

	return (
		<Fragment>
			<AppBar
				modulo="Movimentações"
				urlPicture={props.urlPicture}
				setId={props.setId}
				setPicture={props.setPicture}
			/>
			<div className="movimentacoes">
			<Textos
				titulo="Situação Atual do Mercado Financeiro"
				texto="O mercado financeiro global está em constante evolução, influenciado por uma série de fatores econômicos, políticos e tecnológicos. A seguir, apresentamos uma análise detalhada dos principais aspectos que moldam o cenário atual. Nos últimos anos, a economia global tem enfrentado desafios significativos, incluindo pandemias, tensões geopolíticas e mudanças climáticas. Esses fatores contribuíram para uma desaceleração do crescimento em várias regiões. No entanto, algumas economias emergentes continuam a mostrar resiliência, impulsionadas por políticas fiscais e monetárias expansivas. A inflação tem sido uma preocupação central para muitos países. Bancos centrais, como o Federal Reserve nos EUA e o Banco Central Europeu, adotaram medidas para conter a inflação, incluindo o aumento das taxas de juros. Essas ações visam equilibrar o crescimento econômico e manter a estabilidade dos preços."
			/>
			<img src={image8} style={{width: "40%"}} alt="" />
			<Textos
				titulo="Mercados de Ações"
				texto="Os principais índices de ações, como o S&P 500 nos EUA, o FTSE 100 no Reino Unido e o Nikkei 225 no Japão, têm apresentado volatilidade. Fatores como resultados corporativos, políticas governamentais e eventos globais influenciam diretamente o desempenho desses índices.
2.2. Setores em Destaque
Tecnologia: Empresas de tecnologia continuam a liderar o mercado, impulsionadas pela demanda por inovação e digitalização.
Energia: O setor de energia está em foco devido às flutuações nos preços do petróleo e à transição para fontes de energia renovável.
Saúde: Com a pandemia, o setor de saúde ganhou destaque, especialmente empresas envolvidas em biotecnologia e farmacêuticas."
			/>
			<Textos
				titulo=""
				texto="Veja o gráfico abaixo, a variação da pontuação do Ibovespa no último ano:"
			/>
			<Box sx={{width: "100%", display: "flex", justifyContent: "center", paddingInline: "20%"}}>
				<LineChart
					dataset={[
						{ x: 10000, y: 200 },
						{ x: 20000, y: 500.5 },
						{ x: 30000, y: 200 },
						{ x: 50000, y: 800.5 },
						{ x: 80000, y: 100.5 },
						{ x: 100000, y: 500 },
					]}
					xAxis={[{ dataKey: 'x' }]}
					series={[{ dataKey: 'y' }]}
					height={300}
					margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
					grid={{ vertical: true, horizontal: true }}
				/>
			</Box>
			<Textos
				titulo="Valorização e Desempenho das Principais Criptomoedas"
				texto="O Bitcoin (BTC) mantém sua posição de destaque no mercado, sendo negociado atualmente em torno de US$ 104.481,00, com uma valorização de aproximadamente 2,57% em relação ao dia anterior. Essa valorização é atribuída ao aumento da adoção institucional e ao reconhecimento do Bitcoin como uma reserva de valor confiável.O Ethereum (ETH), segunda maior criptomoeda por capitalização de mercado, está sendo negociado a US$ 3.152,00, apresentando um crescimento de 1,15% nas últimas 24 horas. A plataforma continua a ser fundamental para aplicações descentralizadas (dApps) e contratos inteligentes, impulsionando seu valor de mercado.Outras criptomoedas, como o BNB, Cardano (ADA) e Solana (SOL), também mostram desempenhos positivos, refletindo a diversificação e o amadurecimento do mercado cripto.A adoção de criptomoedas por instituições financeiras e grandes corporações tem sido um fator crucial para a valorização do mercado. Empresas estão incorporando ativos digitais em seus balanços e oferecendo serviços relacionados a criptomoedas a seus clientes, ampliando a aceitação e a legitimidade desses ativos.Paralelamente, a regulamentação tem avançado globalmente, com governos implementando estruturas legais para supervisionar o uso e a negociação de criptomoedas. Embora a conformidade regulatória possa aumentar os custos operacionais, ela promove a confiança dos investidores e posiciona o mercado para um crescimento sustentável."
			/>
			<img src={image9} style={{width: "40%"}} alt="" />
			<Textos
				titulo="Desafios e Perspectivas Futuras"
				texto="O desenvolvimento de novas tecnologias continua a impulsionar o mercado cripto. Plataformas de contratos inteligentes, soluções de escalabilidade e protocolos de finanças descentralizadas (DeFi) estão expandindo as possibilidades de uso das criptomoedas. Além disso, a integração de inteligência artificial e a tokenização de ativos tradicionais estão criando novas oportunidades de investimento e aplicação. Apesar do crescimento robusto, o mercado de criptomoedas enfrenta desafios significativos, incluindo a volatilidade dos preços, preocupações regulatórias e questões de segurança. Investidores são aconselhados a adotar uma abordagem cautelosa, diversificando seus portfólios e permanecendo atentos às mudanças no ambiente regulatório e às inovações tecnológicas.As perspectivas para o futuro permanecem otimistas, com expectativas de que o mercado continue a amadurecer e a se integrar ao sistema financeiro tradicional. A educação contínua dos investidores e o desenvolvimento de infraestruturas seguras e eficientes serão fundamentais para sustentar o crescimento e a adoção das criptomoedas nos próximos anos.Em resumo, 2025 se apresenta como um ano de consolidação e inovação para o mercado de criptomoedas, com avanços significativos na adoção institucional, desenvolvimento tecnológico e estabelecimento de marcos regulatórios que visam garantir a segurança e a confiança dos participantes do mercado."
			/>
			<Box sx={{width: "60%", height: "20vh", display: "flex", justifyContent: "left", gap: "1vh", alignItems: "end"}}>
				<img src={image3} style={{width: "25%"}} alt="" />
				<Link sx={{fontSize: "3vh"}} href="/home">Acesse o conteúdo sobre investimentos, para se aprofundar melhor nos melhores investimentos</Link>
			</Box>
			<Box sx={{width: "60%", height: "20vh", display: "flex", justifyContent: "left", gap: "1vh", alignItems: "end"}}>
				<img src={image8} style={{width: "25%"}} alt="" />
				<Link sx={{fontSize: "3vh"}} href="/analitico">Veja como estão os indicadores do mercado financeiro e o que esperar do cenário de finanças no ano de 2025</Link>
			</Box>
			</div>
			<Footer/>
			<DialogDescricaoMovimentacao
				openDialog={isOpenDialogDescricao}
				description={descricao}
				onClose={closeDialogDescricao}
			/>
		</Fragment>
	);
}

export default Movimentacoes;