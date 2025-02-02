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
import image8 from '../../imagensGoogle/12.webp';
import image9 from '../../imagensGoogle/13.jpg';
import image3 from '../../imagensGoogle/3.jpg';
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import './Movimentacoes.scss';


const Dividas: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
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
				modulo="Dívidas"
				urlPicture={props.urlPicture}
				setId={props.setId}
				setPicture={props.setPicture}
			/>
			<div className="movimentacoes">
			<Textos
				titulo="Dívidas: Como Evitá-las e Sair do Vermelho"
				texto="As dívidas fazem parte da vida de muitas pessoas, mas quando não são controladas, podem se tornar um grande problema. O endividamento excessivo pode comprometer a qualidade de vida, gerar estresse e até mesmo levar a sérias dificuldades financeiras. No entanto, com planejamento e disciplina, é possível evitar dívidas desnecessárias e sair do vermelho. Neste artigo, vamos abordar os principais aspectos das dívidas, incluindo seus tipos, causas, consequências e estratégias para eliminá-las. Dívida é qualquer compromisso financeiro assumido que precisa ser pago no futuro. Em outras palavras, é o dinheiro que você pegou emprestado e deve devolver, geralmente acrescido de juros.Ter dívidas nem sempre é algo ruim. Quando bem administradas, elas podem ajudar na realização de sonhos, como a compra de uma casa ou um carro. O problema surge quando as dívidas são adquiridas sem planejamento, comprometendo a saúde financeira."
			/>
			<img src={image8} style={{width: "40%"}} alt="" />
			<Textos
				titulo="Dívidas: Como Evitá-las e Sair do Vermelho"
				texto="São aquelas que ajudam a construir patrimônio ou gerar renda, como:Financiamento imobiliário: Comprar um imóvel pode ser um bom investimento, pois ele pode se valorizar ao longo do tempo.Empréstimos para educação: Investir em conhecimento pode trazer melhores oportunidades de emprego e aumento de renda.Crédito para negócios: Um empréstimo para expandir ou iniciar um negócio pode trazer retornos financeiros no futuro. São aquelas que não trazem retorno financeiro e podem comprometer a saúde financeira da pessoa. Alguns exemplos incluem:Uso excessivo do cartão de crédito: Juros altos podem transformar uma simples compra em uma grande dívida.Empréstimos pessoais sem planejamento: Pegá-los sem necessidade pode levar a um ciclo de endividamento.Financiamentos longos com juros altos: Parcelamentos excessivos podem comprometer a renda mensal."
			/>
			<Textos
				titulo="Principais Causas do Endividamento"
				texto="Muitas pessoas se endividam sem perceber. Entre as principais causas do endividamento estão:Falta de planejamento financeiro: Gastar sem um orçamento pode levar a dívidas desnecessárias.Compras por impulso: Promoções e publicidade podem levar a gastos excessivos.Desemprego ou redução de renda: A falta de uma reserva financeira pode obrigar o uso de crédito para cobrir despesas.Uso excessivo do crédito rotativo: Os juros do cartão de crédito e do cheque especial são os mais altos do mercado. O endividamento excessivo pode causar diversos problemas, como:4.1. Impacto na Vida FinanceiraDificuldade em pagar contas básicas (água, luz, aluguel).Restrições no nome (SPC/Serasa), dificultando novos créditos.Perda de patrimônio por não conseguir quitar financiamentos.4.2. Impacto na Saúde MentalEstresse e ansiedade pelo acúmulo de contas.Problemas no relacionamento familiar devido às dificuldades financeiras.Sensação de impotência e desespero."
			/>
			<img src={image9} style={{width: "40%"}} alt="" />
			<Textos
				titulo="Como Sair das Dívidas?"
				texto="Se você já está endividado, é importante agir o quanto antes para resolver a situação. Aqui estão algumas estratégias para sair do vermelho:5.1. Faça um Diagnóstico da SituaçãoAnote todas as suas dívidas, incluindo valores, prazos e taxas de juros. Isso ajudará a entender o tamanho do problema e a traçar um plano.5.2. Negocie com os CredoresMuitas empresas oferecem condições especiais para pagamento de dívidas atrasadas. Entre em contato com os credores e busque descontos ou parcelamentos com juros menores.5.3. Priorize as Dívidas Mais CarasDívidas com juros altos, como cartão de crédito e cheque especial, devem ser pagas primeiro. Se necessário, troque uma dívida cara por outra mais barata (como um empréstimo pessoal com juros menores).5.4. Corte Gastos SupérfluosReduza despesas desnecessárias, como assinaturas de serviços pouco utilizados, refeições fora de casa e compras por impulso.5.5. Gere Renda ExtraSe o orçamento estiver apertado, busque formas de aumentar a renda, como vender itens que não usa mais, fazer trabalhos freelancer ou investir em uma nova habilidade profissional.5.6. Crie uma Reserva de EmergênciaMesmo endividado, é importante reservar um pequeno valor para emergências. Isso evitará novos endividamentos em momentos de imprevisto."
			/>
			<Textos
				titulo="Como Evitar Novas Dívidas?"
				texto="Após sair do vermelho, o próximo passo é evitar cair na armadilha das dívidas novamente. Aqui estão algumas dicas para manter a saúde financeira:

6.1. Tenha um Orçamento Mensal
Registre todas as suas receitas e despesas. Isso ajudará a controlar o dinheiro e evitar gastos excessivos.

6.2. Use o Cartão de Crédito com Moderação
Evite parcelamentos desnecessários e sempre pague o valor total da fatura.

6.3. Estabeleça um Fundo de Emergência
Guardar pelo menos 3 a 6 meses de despesas pode prevenir o endividamento em caso de imprevistos.

6.4. Pesquise Antes de Comprar
Compare preços, avalie se a compra é realmente necessária e fuja de juros abusivos.

6.5. Invista no Seu Conhecimento Financeiro
Ler sobre finanças e buscar cursos sobre educação financeira ajudará a tomar melhores decisões. Dívidas podem ser um grande problema quando não são bem administradas, mas com planejamento e disciplina, é possível eliminá-las e construir um futuro financeiro mais seguro. O segredo está em entender suas finanças, evitar gastos desnecessários e buscar sempre formas de aumentar sua renda.

Se você está endividado, não se desespere! Com organização e estratégias adequadas, é possível sair do vermelho e retomar o controle da sua vida financeira. 💰🚀"
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

export default Dividas;