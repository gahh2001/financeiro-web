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
import image8 from '../../imagensGoogle/24.png';
import image9 from '../../imagensGoogle/25.png';
import image3 from '../../imagensGoogle/3.jpg';
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import './Movimentacoes.scss';


const PlanejamentoPessoal: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
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
				modulo="Planejamneto Pessoal"
				urlPicture={props.urlPicture}
				setId={props.setId}
				setPicture={props.setPicture}
			/>
			<div className="movimentacoes">
			<Textos
				titulo="Planejamento pessoal inteligente: Entenda como adquiri-lo e se organizar"
				texto="O planejamento pessoal é uma das ferramentas mais poderosas para quem deseja alcançar objetivos e ter uma vida mais equilibrada e organizada. Muitas vezes, as pessoas têm grandes sonhos e desejos, mas não sabem como alcançá-los ou se perdem ao longo do caminho. O planejamento pessoal entra como um guia que orienta desde a definição de metas até as ações diárias necessárias para atingi-las.

Ao planejar sua vida, o primeiro passo é entender que o processo não envolve apenas estabelecer objetivos financeiros, mas também considerar aspectos emocionais, profissionais, de saúde e relacionamentos. A vida é um conjunto de áreas que, quando bem organizadas, se complementam, proporcionando uma jornada mais satisfatória. Portanto, é essencial dedicar tempo para refletir sobre cada uma delas. A definição de metas é um dos pilares do planejamento pessoal. Ter clareza sobre o que se deseja conquistar é fundamental, seja uma meta de curto, médio ou longo prazo. Essas metas podem envolver desde alcançar um cargo desejado no trabalho, melhorar a saúde física e mental, até realizar viagens ou construir um patrimônio financeiro. Porém, estabelecer metas não é suficiente; é preciso saber como traçar um plano de ação. Esse plano deve ser realista, adaptável e mensurável, para que você consiga acompanhar o progresso e fazer ajustes quando necessário. Uma meta bem estruturada deve ser específica, alcançável, relevante e ter um prazo determinado."
			/>
			<img src={image8} style={{width: "40%"}} alt="" />
			<Textos
				titulo="Disciplina"
				texto="Além disso, um bom planejamento pessoal exige disciplina e comprometimento. Por mais que as metas sejam bem desenhadas, sem uma execução consistente, é impossível alcançar os resultados esperados. A rotina diária desempenha um papel crucial nesse processo. Estabelecer horários para atividades específicas, como estudo, trabalho, lazer e descanso, é essencial para manter o equilíbrio. A ideia não é se sobrecarregar, mas sim ser estratégico, aproveitando ao máximo o tempo disponível. Ao criar hábitos diários, como acordar mais cedo, organizar o dia, reservar momentos para atividades prazerosas e focar nas prioridades, você se aproxima cada vez mais do seu objetivo.

Outro aspecto importante do planejamento pessoal é a gestão financeira. Muitos sonhos podem ser bloqueados pela falta de controle financeiro. Ter um planejamento financeiro eficiente ajuda a equilibrar os gastos com as receitas e garante que as metas sejam alcançadas sem gerar endividamento. Criar um orçamento mensal, cortar gastos desnecessários e investir parte da receita para o futuro são ações que ajudam a consolidar a estabilidade financeira. Quando se tem um controle consciente sobre o dinheiro, o estresse relacionado a ele diminui, permitindo que você tenha mais tranquilidade para focar nas suas demais metas.

É também importante estar preparado para lidar com imprevistos. Nem sempre as coisas saem como planejado, e a vida é cheia de surpresas, tanto boas quanto desafiadoras. Portanto, ao planejar, é necessário deixar espaço para flexibilidade. Aprender a ajustar o planejamento quando necessário é uma habilidade importante, pois, muitas vezes, a jornada será diferente da expectativa inicial. A capacidade de se adaptar a novas situações e mudar a estratégia sem desistir do objetivo final é o que distingue as pessoas bem-sucedidas."
			/>
			<img src={image9} style={{width: "40%"}} alt="" />
			<Textos
				titulo="Autocuidado nas finanças - conclusão"
				texto="O autocuidado é outro pilar fundamental no planejamento pessoal. Cuidar da saúde física e mental deve ser uma prioridade. Quando estamos bem conosco mesmos, conseguimos ter mais energia e clareza para seguir em frente com os nossos planos. Isso inclui garantir uma alimentação equilibrada, praticar atividades físicas e reservar momentos de lazer e descanso para rejuvenescer. Ter uma mente tranquila e um corpo saudável são condições essenciais para alcançar qualquer objetivo. O equilíbrio entre a vida profissional e pessoal também precisa ser considerado, pois ninguém consegue trabalhar de forma eficaz sem momentos de descontração e prazer.

Em resumo, o planejamento pessoal é a chave para quem deseja alcançar objetivos com mais eficiência e satisfação. Não se trata apenas de traçar metas financeiras, mas de equilibrar todas as áreas da vida de maneira que uma favoreça a outra. Ao definir metas claras, estabelecer uma rotina produtiva, controlar as finanças e cuidar da saúde física e emocional, você se prepara para uma jornada de sucesso. Contudo, é essencial lembrar que o planejamento é uma ferramenta dinâmica que precisa ser ajustada conforme a vida se desenrola. Com foco, disciplina e flexibilidade, é possível transformar seus sonhos em realidade e conquistar uma vida mais plena."
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

export default PlanejamentoPessoal;