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
import image8 from '../../imagensGoogle/14.png';
import image9 from '../../imagensGoogle/15.jpeg';
import image3 from '../../imagensGoogle/3.jpg';
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import './Movimentacoes.scss';


const EducacaoFinanceira: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
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
				modulo="Educação Financeira"
				urlPicture={props.urlPicture}
				setId={props.setId}
				setPicture={props.setPicture}
			/>
			<div className="movimentacoes">
			<Textos
				titulo="Educação Financeira: O Caminho Para a Estabilidade e Crescimento Financeiro"
				texto="A educação financeira é um dos pilares fundamentais para uma vida equilibrada e sem preocupações com dinheiro. No entanto, esse tema ainda é pouco abordado na sociedade, deixando muitas pessoas sem o conhecimento necessário para tomar decisões financeiras inteligentes. Ter uma boa educação financeira significa entender como administrar seus recursos, evitar dívidas desnecessárias e investir para garantir um futuro mais tranquilo.
Neste artigo, vamos explorar diversos aspectos da educação financeira, desde a importância do planejamento até estratégias para construir riqueza ao longo do tempo."
			/>
			<img src={image8} style={{width: "40%"}} alt="" />
			<Textos
				titulo="O Que é Educação Financeira?"
				texto="Educação financeira é o conjunto de conhecimentos e habilidades que permitem uma pessoa tomar decisões responsáveis sobre seu dinheiro. Ela envolve desde a criação de um orçamento até estratégias de investimento para garantir um futuro financeiro seguro.

Infelizmente, a falta de conhecimento sobre finanças faz com que muitas pessoas tomem decisões ruins, como gastar mais do que ganham, acumular dívidas e não se prepararem para emergências. A falta de educação financeira pode levar ao endividamento excessivo, à incapacidade de lidar com emergências e à falta de recursos para a aposentadoria. Por outro lado, quem se educa financeiramente consegue:

Evitar dívidas desnecessárias e gerenciar o crédito de forma consciente.
Montar um orçamento eficiente e controlar melhor seus gastos.
Investir seu dinheiro e aumentar seu patrimônio ao longo do tempo.
Planejar a aposentadoria e garantir um futuro financeiramente seguro. Criar um orçamento é essencial para controlar as finanças. Ele deve conter:

Receitas: Salário, rendimentos extras, investimentos.
Despesas Fixas: Aluguel, contas de água e luz, alimentação.
Despesas Variáveis: Lazer, compras e gastos não essenciais.
Poupança e Investimentos: Parte do dinheiro deve ser direcionada para o futuro.
Ter um orçamento claro evita gastos desnecessários e ajuda a definir prioridades.Muitas pessoas gastam impulsivamente, sem avaliar a necessidade da compra. O consumo consciente envolve:

Planejar antes de gastar: Perguntar-se se a compra é realmente necessária.
Evitar parcelamentos longos: Juros embutidos podem tornar a compra mais cara.
Comparar preços: Pesquisar antes de comprar ajuda a economizar."
			/>
			<img src={image9} style={{width: "40%"}} alt="" />
			<Textos
				titulo="Dívidas e Crédito Consciente"
				texto="O crédito pode ser uma ferramenta útil, mas quando mal utilizado pode causar sérios problemas financeiros. Para evitar dívidas descontroladas:

Evite usar crédito para compras supérfluas.
Pague sempre a fatura total do cartão de crédito.
Renegocie dívidas caso necessário. Imprevistos acontecem, e estar preparado é essencial. A reserva de emergência deve cobrir de 3 a 6 meses de despesas e deve ser mantida em investimentos de fácil resgate, como o Tesouro Selic.

3.5. Investimentos: O Caminho para a Independência Financeira
Guardar dinheiro na poupança já não é mais uma opção viável devido ao baixo rendimento. Aprender a investir é essencial para aumentar o patrimônio ao longo do tempo. Algumas opções de investimento incluem:

Renda fixa: Tesouro Direto, CDBs, LCIs e LCAs.
Renda variável: Ações, fundos imobiliários e ETFs.
Outras formas: Fundos de investimento, previdência privada, criptomoedas. Quanto antes você começar a planejar a aposentadoria, melhor. Para garantir um futuro tranquilo:

Invista regularmente em previdência complementar ou fundos de longo prazo.
Diversifique seus investimentos para minimizar riscos.
Evite depender apenas da previdência pública."
			/>
			<Textos
				titulo="Como Aplicar a Educação Financeira no Dia a Dia"
				texto="Para incorporar a educação financeira à sua rotina, siga alguns passos simples:

Anote todas as receitas e despesas para entender para onde seu dinheiro está indo.
Defina metas financeiras, como quitar dívidas, criar uma reserva ou investir.
Evite compras por impulso, dando um tempo para refletir antes de gastar.
Acompanhe e ajuste seu orçamento mensalmente para manter o equilíbrio financeiro.
Estude sobre investimentos e busque opções adequadas ao seu perfil. Se mais pessoas tivessem conhecimento sobre finanças, a sociedade como um todo se beneficiaria. Isso porque:

O número de endividados e inadimplentes diminuiria.
As pessoas teriam mais autonomia financeira e dependeriam menos de empréstimos.
Haveria maior estabilidade econômica, com mais pessoas investindo e consumindo de forma consciente.
Infelizmente, no Brasil, a educação financeira ainda não é amplamente ensinada nas escolas, o que faz com que muitas pessoas só aprendam sobre dinheiro depois de cometerem erros financeiros. A educação financeira é essencial para garantir uma vida mais tranquila e próspera. Quem entende sobre dinheiro consegue evitar dívidas, organizar melhor os gastos, investir de forma inteligente e planejar o futuro com segurança.

Se você ainda não tem o hábito de controlar suas finanças, comece agora. Com pequenos passos diários, é possível mudar sua realidade financeira e conquistar seus objetivos. Lembre-se: dinheiro bem administrado é sinônimo de liberdade! 🚀💰"
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

export default EducacaoFinanceira;