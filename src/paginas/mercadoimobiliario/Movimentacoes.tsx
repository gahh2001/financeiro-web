import { Box, Link } from "@mui/material";
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
import image8 from '../../imagensGoogle/22.jpg';
import image9 from '../../imagensGoogle/23.avif';
import image3 from '../../imagensGoogle/3.jpg';
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import './Movimentacoes.scss';


const MercadoImobiliario: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
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
				modulo="mercado Imobiliário"
				urlPicture={props.urlPicture}
				setId={props.setId}
				setPicture={props.setPicture}
			/>
			<div className="movimentacoes">
			<Textos
				titulo="O Mercado Imobiliário: Oportunidades, Desafios e Tendências"
				texto="O mercado imobiliário é um dos setores mais dinâmicos da economia, influenciado por diversos fatores como juros, inflação, demanda por moradia, políticas governamentais e até mesmo tendências demográficas e tecnológicas. Nos últimos anos, esse setor passou por transformações significativas, impulsionadas por mudanças no comportamento dos consumidores, avanços tecnológicos e oscilações econômicas globais e locais. Para quem deseja investir, comprar um imóvel para moradia ou simplesmente entender melhor as dinâmicas desse mercado, é essencial analisar diversos aspectos que influenciam seu funcionamento.

Um dos principais fatores que determinam o comportamento do mercado imobiliário é a taxa de juros. Em períodos de juros baixos, o crédito imobiliário se torna mais acessível, estimulando a compra de imóveis tanto por investidores quanto por pessoas que buscam moradia própria. Já quando os juros sobem, os financiamentos ficam mais caros, reduzindo o número de compradores e, consequentemente, impactando os preços dos imóveis. Dessa forma, a política monetária adotada pelos bancos centrais tem um papel crucial no aquecimento ou desaquecimento do setor.

Outro fator determinante para o mercado imobiliário é a inflação. Quando a inflação está elevada, os custos de construção, como materiais e mão de obra, aumentam, o que pode pressionar os preços dos imóveis para cima. Além disso, uma inflação elevada também impacta o poder de compra dos consumidores, reduzindo sua capacidade de aquisição de novos imóveis. Por outro lado, o setor imobiliário muitas vezes é visto como uma proteção contra a inflação, já que os imóveis tendem a manter ou aumentar seu valor ao longo do tempo, ao contrário de ativos financeiros que podem sofrer perdas em cenários inflacionários."
			/>
			<img src={image8} style={{width: "40%"}} alt="" />
			<Textos
				titulo="O comportamento do consumidor"
				texto="O comportamento do consumidor também influencia diretamente o setor. Nos últimos anos, houve uma mudança nas preferências dos compradores, principalmente após a pandemia, com a valorização de imóveis maiores, bem localizados e que ofereçam mais qualidade de vida. Muitos passaram a buscar casas em bairros afastados dos grandes centros, priorizando espaço e infraestrutura, especialmente com o crescimento do home office. Além disso, a procura por imóveis sustentáveis e com tecnologias inteligentes tem aumentado, refletindo uma tendência global de preocupação ambiental e eficiência energética.

Os investimentos em imóveis continuam sendo uma das formas mais tradicionais de construção de patrimônio. Muitos investidores optam por adquirir imóveis para locação, seja no modelo tradicional ou por meio de plataformas como Airbnb, que possibilitam ganhos recorrentes. Além disso, os Fundos Imobiliários (FIIs) surgiram como uma alternativa interessante para aqueles que desejam investir no setor sem a necessidade de comprar um imóvel físico. Esses fundos permitem acesso a ativos imobiliários de grande porte, como shoppings, lajes corporativas e galpões logísticos, com a vantagem da liquidez oferecida pela Bolsa de Valores.

A digitalização do mercado imobiliário também tem sido um fator determinante nas novas dinâmicas do setor. Hoje, é possível visitar imóveis virtualmente, assinar contratos de forma digital e utilizar inteligência artificial para encontrar as melhores oportunidades de compra e investimento. Essas inovações reduzem burocracias, agilizam transações e ampliam o acesso a informações, tornando o processo de compra e venda mais transparente e eficiente."
			/>
			<img src={image9} style={{width: "40%"}} alt="" />
			<Textos
				titulo="Desafios"
				texto="Apesar das oportunidades, o mercado imobiliário também enfrenta desafios. A burocracia para aquisição de imóveis no Brasil ainda é um problema, com processos lentos e taxas elevadas, o que pode desestimular compradores e investidores. Além disso, a instabilidade econômica e política pode gerar incertezas, impactando a confiança do consumidor e a disponibilidade de crédito. Questões como especulação imobiliária e bolhas financeiras também são preocupações constantes, exigindo que investidores analisem cuidadosamente as condições do mercado antes de tomar decisões.

Por fim, é essencial que qualquer pessoa interessada no setor imobiliário tenha um bom planejamento financeiro e conhecimento sobre os ciclos do mercado. O momento certo para comprar, vender ou investir pode fazer toda a diferença na rentabilidade e no sucesso da operação. Com uma análise criteriosa dos fatores econômicos e tendências de consumo, o mercado imobiliário continuará sendo uma opção sólida para aqueles que buscam segurança, valorização patrimonial e geração de renda passiva ao longo dos anos."
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

export default MercadoImobiliario;