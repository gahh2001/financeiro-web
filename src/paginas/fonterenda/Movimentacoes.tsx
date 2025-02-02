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
import image8 from '../../imagensGoogle/18.jpg';
import image9 from '../../imagensGoogle/19.jpg';
import image3 from '../../imagensGoogle/3.jpg';
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import './Movimentacoes.scss';


const FonteRenda: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
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
				modulo="Fontes de renda"
				urlPicture={props.urlPicture}
				setId={props.setId}
				setPicture={props.setPicture}
			/>
			<div className="movimentacoes">
			<Textos
				titulo="Fontes de Renda no Mercado Financeiro: Como Diversificar seus Ganhos"
				texto="O mercado financeiro oferece diversas oportunidades para quem deseja gerar renda e construir patrimônio ao longo do tempo. Muitas pessoas ainda associam o setor apenas a grandes investidores ou empresas, mas a verdade é que qualquer pessoa pode aproveitar as diferentes fontes de renda disponíveis.

Neste artigo, exploraremos as principais formas de gerar renda no mercado financeiro, explicando como elas funcionam e como podem ser utilizadas para construir uma vida financeira mais estável e próspera. As fontes de renda no mercado financeiro são diferentes formas de ganhar dinheiro por meio de investimentos, negociações e estratégias de mercado. Elas podem ser divididas em duas categorias principais:

Renda Passiva: Ganhos recorrentes que exigem pouca ou nenhuma ação contínua, como juros sobre investimentos e dividendos de ações.
Renda Ativa: Exige participação ativa do investidor, como o day trade ou a compra e venda de ativos.
Cada pessoa pode escolher suas fontes de renda de acordo com seu perfil de investidor e seus objetivos financeiros."
			/>
			<img src={image8} style={{width: "40%"}} alt="" />
			<Textos
				titulo="Principais Fontes de Renda no Mercado Financeiro"
				texto="O mercado oferece uma ampla variedade de oportunidades para gerar renda. Vamos explorar algumas das principais opções: Os investimentos em renda fixa são uma ótima opção para quem busca segurança e previsibilidade nos rendimentos. Alguns exemplos incluem:

Tesouro Direto: Títulos públicos emitidos pelo governo, como o Tesouro Selic e o Tesouro IPCA, que pagam juros ao longo do tempo.
CDBs (Certificados de Depósito Bancário): Títulos emitidos por bancos que oferecem rendimentos fixos ou atrelados ao CDI.
LCIs e LCAs (Letras de Crédito Imobiliário e do Agronegócio): Investimentos isentos de imposto de renda, emitidos por bancos para financiar setores específicos.
Debêntures: Títulos emitidos por empresas para captar recursos e remunerar os investidores com juros.
Esses ativos oferecem um retorno previsível e são ideais para quem deseja construir uma reserva de emergência ou ter um fluxo de renda mais estável. A renda variável inclui investimentos com maior potencial de rentabilidade, mas também com maior risco. Algumas das principais formas de gerar renda nesse segmento são:

Ações: Empresas listadas na bolsa de valores distribuem dividendos aos acionistas, além do potencial de valorização do papel ao longo do tempo.
Fundos Imobiliários (FIIs): Permitem que investidores recebam aluguéis sem precisar comprar imóveis físicos.
ETFs (Exchange Traded Funds): Fundos que replicam índices do mercado, como o Ibovespa, permitindo diversificação de investimentos.
Derivativos: Opções e contratos futuros que podem ser utilizados para estratégias de alavancagem ou proteção de carteira.
Investir em renda variável exige conhecimento e estratégia, mas pode proporcionar retornos expressivos no longo prazo.

2.3. Dividendos: Renda Passiva com Ações e Fundos Imobiliários
Os dividendos são uma das formas mais populares de renda passiva no mercado financeiro. Empresas lucrativas distribuem parte dos seus ganhos aos acionistas periodicamente.

Ações que pagam dividendos: Empresas como Vale, Petrobras e Itaú distribuem parte de seus lucros aos investidores.
FIIs (Fundos Imobiliários): Distribuem rendimentos mensais provenientes do aluguel de imóveis comerciais, shoppings e galpões logísticos.
Essa fonte de renda é atrativa para quem deseja construir um fluxo de caixa recorrente sem precisar vender ativos."
			/>
			<Textos
				titulo="Trading: Renda Ativa com Operações de Curto Prazo"
				texto="Para quem deseja operar ativamente no mercado, existem diferentes formas de trading, como:

Day Trade: Compra e venda de ativos no mesmo dia, buscando lucro com pequenas variações de preço.
Swing Trade: Operações que duram alguns dias ou semanas, aproveitando tendências de curto prazo.
Position Trade: Estratégia de longo prazo, baseada na valorização do ativo ao longo dos meses ou anos.
Embora o trading possa gerar ganhos rápidos, ele também envolve altos riscos e exige bastante conhecimento e disciplina.

2.5. Criptomoedas: A Nova Fronteira do Mercado Financeiro
As criptomoedas se tornaram uma alternativa popular de investimento, oferecendo diferentes formas de geração de renda:

Compra e valorização: Bitcoin, Ethereum e outras moedas digitais podem se valorizar ao longo do tempo.
Staking: Algumas criptomoedas permitem que investidores ganhem juros ao manter ativos bloqueados em carteiras digitais.
Yield Farming: Estratégia de gerar rendimentos emprestando criptomoedas em plataformas descentralizadas.
Apesar do potencial de alta valorização, as criptomoedas são extremamente voláteis e exigem cautela dos investidores.

2.6. Fundos de Investimento: Gestão Profissional do Dinheiro
Os fundos de investimento permitem que investidores diversifiquem suas aplicações sem precisar gerenciar os ativos diretamente. Existem diferentes tipos de fundos:

Fundos de Renda Fixa: Investem em ativos seguros, como Tesouro Direto e CDBs.
Fundos Multimercado: Misturam renda fixa, ações e outros ativos, buscando maior rentabilidade.
Fundos de Ações: Focados no mercado acionário, geridos por especialistas.
Investir em fundos pode ser uma boa alternativa para quem não tem tempo ou conhecimento para administrar sua própria carteira."
			/>
			<img src={image9} style={{width: "40%"}} alt="" />
			<Textos
				titulo="Como Escolher as Melhores Fontes de Renda?"
				texto="Para definir quais fontes de renda no mercado financeiro são mais adequadas para você, leve em consideração os seguintes fatores:

Perfil de investidor: Se você tem aversão a riscos, opte por renda fixa; se busca maiores retornos, explore a renda variável.
Objetivos financeiros: Se deseja renda passiva, foque em dividendos e FIIs; se quer ganhos rápidos, considere o trading.
Horizonte de investimento: Investimentos de longo prazo tendem a gerar retornos mais consistentes e seguros.
Diversificação: Distribuir os investimentos entre diferentes fontes reduz os riscos e aumenta as chances de sucesso. O mercado financeiro oferece inúmeras oportunidades para quem deseja gerar renda e construir um futuro financeiro sólido. Seja através da renda fixa, ações, dividendos, fundos imobiliários ou até mesmo do trading, existem diversas formas de alcançar a independência financeira.

A chave para o sucesso é buscar conhecimento, diversificar os investimentos e alinhar as estratégias ao seu perfil e objetivos. Com planejamento e disciplina, qualquer pessoa pode transformar o mercado financeiro em uma fonte confiável de renda e crescimento patrimonial.

Seja qual for sua escolha, o mais importante é dar o primeiro passo e começar a investir! 🚀📈"
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

export default FonteRenda;