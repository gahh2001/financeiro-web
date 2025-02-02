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
import image8 from '../../imagensGoogle/20.webp';
import image9 from '../../imagensGoogle/21.webp';
import image3 from '../../imagensGoogle/3.jpg';
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import './Movimentacoes.scss';


const Inflacao: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
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
				modulo="Inflação"
				urlPicture={props.urlPicture}
				setId={props.setId}
				setPicture={props.setPicture}
			/>
			<div className="movimentacoes">
			<Textos
				titulo="Inflação no Mercado Financeiro: Impactos e Estratégias para se Proteger"
				texto="A inflação é um dos principais fatores que influenciam a economia e o mercado financeiro. Esse fenômeno afeta diretamente o poder de compra da população, os investimentos e o comportamento dos agentes econômicos. No contexto do mercado financeiro, a inflação pode ser tanto um desafio quanto uma oportunidade, dependendo das estratégias adotadas pelos investidores.

Neste artigo, vamos explorar o conceito de inflação, seus impactos no mercado financeiro, os instrumentos utilizados para controlá-la e como os investidores podem se proteger dos seus efeitos. A inflação é o aumento generalizado e contínuo dos preços de bens e serviços em uma economia. Isso significa que, ao longo do tempo, o dinheiro perde valor, ou seja, com a mesma quantia de dinheiro, compra-se menos produtos e serviços.

A inflação é medida por diferentes índices, sendo os mais comuns:

IPCA (Índice de Preços ao Consumidor Amplo): Principal indicador utilizado pelo Banco Central do Brasil para medir a inflação oficial.
IGP-M (Índice Geral de Preços – Mercado): Utilizado para reajustar contratos, como aluguéis.
INPC (Índice Nacional de Preços ao Consumidor): Mede a inflação para famílias de baixa renda.
A inflação pode ser causada por diversos fatores, incluindo o aumento da demanda por produtos, alta dos custos de produção e políticas monetárias expansionistas.

"
			/>
			<img src={image8} style={{width: "40%"}} alt="" />
			<Textos
				titulo="Impactos da Inflação no Mercado Financeiro"
				texto="A inflação afeta praticamente todos os aspectos da economia, influenciando diretamente os investimentos e as estratégias dos investidores. Alguns dos principais impactos são:

2.1. Redução do Poder de Compra
Com o aumento dos preços, o dinheiro perde valor ao longo do tempo. Isso significa que, se um investidor mantiver seu dinheiro parado na conta corrente ou na poupança, ele estará perdendo poder de compra devido à inflação.

2.2. Alteração na Taxa de Juros
Os bancos centrais utilizam a taxa de juros como principal ferramenta para controlar a inflação. Quando a inflação está alta, as autoridades monetárias costumam aumentar a taxa básica de juros (no Brasil, a Selic). Isso torna o crédito mais caro e reduz o consumo, ajudando a conter a inflação.

Por outro lado, quando a inflação está baixa, os bancos centrais podem reduzir os juros para estimular a economia.

2.3. Impacto nos Investimentos em Renda Fixa
A inflação influencia diretamente os investimentos de renda fixa. Títulos prefixados podem perder atratividade em momentos de inflação alta, pois a taxa de retorno já foi definida no momento da compra e pode se tornar insuficiente para compensar a desvalorização do dinheiro.

Já os títulos atrelados à inflação, como o Tesouro IPCA+, podem ser boas opções, pois garantem um retorno acima da inflação."
			/>
			<Textos
				titulo="Desvalorização da Moeda"
				texto="A inflação elevada pode levar à desvalorização da moeda nacional frente a outras moedas, como o dólar. Isso ocorre porque investidores e empresas buscam ativos mais seguros e previsíveis, como o dólar e o ouro.

Quando a moeda perde valor, produtos importados ficam mais caros, o que pode agravar ainda mais a inflação. A inflação pode impactar o mercado acionário de diferentes formas. Empresas que dependem de custos variáveis, como energia e matéria-prima, podem ver seus lucros reduzidos. Além disso, taxas de juros mais altas podem reduzir o consumo, afetando setores como varejo e construção civil.

Por outro lado, empresas do setor financeiro, como bancos, podem se beneficiar, pois costumam lucrar mais com juros elevados. O ouro é um ativo historicamente utilizado como proteção contra a inflação, pois mantém seu valor ao longo do tempo.

Já as criptomoedas, como o Bitcoin, também têm sido vistas como reserva de valor em tempos de alta inflação e desvalorização cambial."
			/>
			<img src={image9} style={{width: "40%"}} alt="" />
			<Textos
				titulo="Estratégias para se Proteger da Inflação"
				texto="Para minimizar os impactos da inflação e proteger seu patrimônio, os investidores podem adotar diversas estratégias:

3.1. Investir em Ativos Atrelados à Inflação
Títulos públicos e privados indexados ao IPCA garantem uma rentabilidade real, ou seja, acima da inflação. Exemplos incluem:

Tesouro IPCA+: Oferece um rendimento fixo mais a variação da inflação.
Debêntures e CRIs/CRAs atrelados ao IPCA: Alternativas do setor privado para proteger o capital da inflação.
3.2. Diversificação Internacional
Investir em ativos no exterior pode ser uma forma de proteger seu dinheiro da inflação local e da desvalorização da moeda. Algumas opções incluem:

ETFs internacionais
Ações de empresas estrangeiras
Fundos cambiais (expostos ao dólar)
3.3. Investir em Ações de Empresas Resilientes à Inflação
Algumas empresas conseguem repassar a alta dos preços para os consumidores sem perder competitividade. Exemplos incluem:

Setor de energia: Empresas de geração e distribuição elétrica costumam ter tarifas reajustadas pela inflação.
Setor de commodities: Empresas que atuam com petróleo, minério de ferro e grãos tendem a se beneficiar da inflação, pois os preços dessas mercadorias costumam subir junto com a inflação. A inflação é um fenômeno econômico que impacta diretamente o mercado financeiro e os investimentos. Se não for bem administrada, pode reduzir o poder de compra da população e prejudicar a rentabilidade dos ativos financeiros.

No entanto, com as estratégias certas, é possível se proteger da inflação e até mesmo aproveitar oportunidades no mercado. Investir em ativos indexados ao IPCA, diversificar internacionalmente e apostar em setores resilientes são algumas das formas de minimizar os impactos da inflação e manter seu patrimônio protegido ao longo do tempo.

Em momentos de alta inflação, a educação financeira se torna ainda mais essencial para tomar decisões assertivas e garantir um futuro financeiro estável."
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

export default Inflacao;