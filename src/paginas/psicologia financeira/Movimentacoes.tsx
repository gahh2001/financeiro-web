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
import image8 from '../../imagensGoogle/28.png';
import image9 from '../../imagensGoogle/29.webp';
import image3 from '../../imagensGoogle/3.jpg';
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import './Movimentacoes.scss';


const Psicologiafinanceira: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
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
				modulo="Psicologia Financeira"
				urlPicture={props.urlPicture}
				setId={props.setId}
				setPicture={props.setPicture}
			/>
			<div className="movimentacoes">
			<Textos
				titulo=" A psicologia por trás do sucesso financeiro"
				texto="A psicologia financeira é um campo que estuda a forma como as emoções, crenças e comportamentos dos indivíduos influenciam suas decisões financeiras. Enquanto as finanças tradicionais se concentram em números, análises e estratégias, a psicologia financeira tenta entender o que se passa na mente das pessoas quando elas tomam decisões sobre dinheiro. Esse campo se tornou cada vez mais importante, pois reconhece que nossas atitudes em relação ao dinheiro estão profundamente ligadas ao nosso bem-estar emocional e psicológico.
Uma das principais questões abordadas pela psicologia financeira é o modo como as emoções influenciam a tomada de decisões financeiras. O medo e a ansiedade, por exemplo, podem levar uma pessoa a evitar investimentos mais arriscados, mesmo que esses investimentos sejam rentáveis no longo prazo. Por outro lado, o excesso de otimismo pode levar a decisões impulsivas e arriscadas, como comprar ativos especulativos sem realizar a devida análise. Essa relação emocional com o dinheiro pode ser observada em situações cotidianas, como quando uma pessoa gasta em excesso para suprir necessidades emocionais, ou quando evita olhar para suas finanças devido ao medo de encarar a realidade financeira."
			/>
			<img src={image8} style={{width: "40%"}} alt="" />
			<Textos
				titulo="Aspectos e importâncias"
				texto="Outro aspecto importante da psicologia financeira é a forma como as crenças pessoais sobre dinheiro são formadas. Desde a infância, somos influenciados por nossa família, cultura e ambiente econômico, o que molda a forma como vemos o dinheiro e como o gerenciamos. Por exemplo, algumas pessoas podem ter a crença de que dinheiro é sujo ou não é para todo mundo, o que pode criar barreiras psicológicas que impedem essas pessoas de alcançar a estabilidade financeira. Já outras podem associar dinheiro ao poder e ao sucesso, desenvolvendo um desejo excessivo de acumular riquezas. Essas crenças podem ser limitantes ou capacitadoras, dependendo de como são aplicadas na vida financeira de cada pessoa.

Além disso, a psicologia financeira também lida com a noção de comportamento de risco. O ser humano, por natureza, tende a ser avesso ao risco, o que pode fazer com que busque investimentos mais seguros, como a poupança, em detrimento de alternativas mais rentáveis, mas com maior risco. Contudo, em alguns casos, as pessoas podem se arriscar de maneira excessiva, como em investimentos especulativos ou na busca por retornos rápidos. Isso ocorre principalmente por causa da ilusão de controle, onde os investidores acreditam que podem prever o futuro ou controlar os riscos, o que pode resultar em grandes perdas financeiras.

A psicologia financeira também está fortemente ligada à ideia de planejamento financeiro. Muitos indivíduos, por exemplo, têm dificuldades em adotar uma visão de longo prazo em relação às suas finanças, preferindo gastar agora e adiar a preocupação com o futuro. Esse comportamento é muitas vezes impulsionado pela necessidade de gratificação instantânea, algo que a psicologia explica como um desejo de satisfazer os próprios desejos imediatos em vez de adiar a recompensa para um futuro mais seguro e confortável."
			/>
			<img src={image9} style={{width: "40%"}} alt="" />
			<Textos
				titulo="Psicologia financeira aliada ao conhecimento de mercado"
				texto="Outro ponto relevante é a relação entre a psicologia financeira e a educação financeira. Muitos problemas financeiros podem ser mitigados com uma melhor compreensão dos próprios comportamentos financeiros. Por exemplo, uma pessoa que aprende a controlar seus impulsos de compra e a adotar hábitos de consumo mais conscientes tende a ter mais sucesso na gestão de suas finanças. A educação financeira vai além da simples aprendizagem de como investir ou economizar; ela envolve uma compreensão profunda de como as emoções e a mentalidade influenciam o comportamento em relação ao dinheiro."
			/>
			<Textos
				titulo="Conclusão - Seu bolso esua saúde"
				texto="No entanto, não basta apenas entender os aspectos psicológicos das finanças pessoais. Para alcançar o equilíbrio financeiro, é preciso adotar práticas que ajudem a superar as barreiras psicológicas e comportamentais que podem surgir. Isso pode incluir o estabelecimento de metas financeiras realistas, o desenvolvimento de hábitos saudáveis de consumo e a busca por um controle emocional em relação às finanças. Técnicas de mindfulness e terapia cognitivo-comportamental, por exemplo, podem ser aplicadas para ajudar as pessoas a identificarem padrões de pensamento negativos e a lidar com a ansiedade financeira.

Em resumo, a psicologia financeira é uma área fundamental para entender como os fatores emocionais e comportamentais impactam as decisões financeiras das pessoas. Reconhecer os efeitos da psicologia nas finanças pode ajudar os indivíduos a melhorar sua relação com o dinheiro e a tomar decisões financeiras mais equilibradas e conscientes. Ao integrar a compreensão psicológica com o conhecimento técnico das finanças, é possível construir um planejamento financeiro mais sólido, adaptado às necessidades e aos objetivos de cada pessoa."
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

export default Psicologiafinanceira;