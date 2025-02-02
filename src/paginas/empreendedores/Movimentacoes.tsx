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
import { default as image3, default as image9 } from '../../imagensGoogle/16.jpg';
import image8 from '../../imagensGoogle/17.jpg';
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import './Movimentacoes.scss';


const Empreendedores: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
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
				modulo="Empreendedores"
				urlPicture={props.urlPicture}
				setId={props.setId}
				setPicture={props.setPicture}
			/>
			<div className="movimentacoes">
			<Textos
				titulo="Empreendedorismo: O Caminho para a Independência e o Sucesso"
				texto="O empreendedorismo é uma força motriz da economia global. Ele impulsiona a inovação, gera empregos e oferece oportunidades para aqueles que desejam construir seus próprios negócios. Ser empreendedor significa identificar oportunidades, assumir riscos calculados e transformar ideias em realidade. No entanto, empreender não é uma tarefa fácil e exige planejamento, resiliência e conhecimento.

Neste artigo, vamos abordar diversos aspectos do empreendedorismo, desde sua importância até estratégias para desenvolver um negócio de sucesso. Empreendedorismo é a capacidade de criar, desenvolver e administrar um negócio, buscando inovação e crescimento sustentável. Pode envolver desde pequenos negócios familiares até grandes startups de tecnologia.

O empreendedor não é apenas um criador de empresas, mas alguém que identifica problemas e oferece soluções que agregam valor à sociedade."
			/>
			<img src={image8} style={{width: "40%"}} alt="" />
			<Textos
				titulo="A Importância do Empreendedorismo na Economia"
				texto="O empreendedorismo desempenha um papel fundamental no desenvolvimento econômico de um país. Seus principais benefícios incluem:

Geração de empregos: Pequenas e médias empresas são responsáveis por grande parte das vagas de trabalho.
Inovação: Novos produtos e serviços surgem da criatividade dos empreendedores.
Aumento da competitividade: Empresas inovadoras impulsionam o mercado e melhoram a qualidade dos serviços.
Autonomia financeira: Muitas pessoas encontram no empreendedorismo uma forma de alcançar independência financeira.
3. Tipos de Empreendedorismo
Existem diferentes tipos de empreendedorismo, cada um com características e objetivos distintos:

3.1. Empreendedorismo Tradicional
É o modelo clássico de negócios, como lojas, restaurantes e prestadores de serviços locais. Os empreendedores tradicionais geralmente investem capital próprio ou financiam seus negócios através de empréstimos.

3.2. Empreendedorismo Digital
Com o avanço da tecnologia, muitas empresas surgiram no ambiente digital. Exemplos incluem lojas virtuais, cursos online, marketing digital e startups de tecnologia.

3.3. Empreendedorismo Social
Focado em gerar impacto social, esse tipo de empreendedorismo busca soluções para problemas da sociedade, como acesso à educação e preservação ambiental, ao mesmo tempo em que se mantém financeiramente sustentável.

3.4. Empreendedorismo Corporativo (Intraempreendedorismo)
Empresas já estabelecidas incentivam seus funcionários a inovarem internamente, criando novos produtos e serviços dentro da organização.

3.5. Empreendedorismo de Startups
Startups são empresas que buscam escalabilidade e crescimento rápido através da tecnologia. Elas operam com modelos de negócios inovadores e muitas vezes contam com investimentos de capital de risco.

"
			/>
			<img src={image9} style={{width: "40%"}} alt="" />
			<Textos
				titulo="Características de um Empreendedor de Sucesso"
				texto="Embora qualquer pessoa possa empreender, algumas características são essenciais para alcançar o sucesso:

Visão estratégica: Saber identificar oportunidades e tendências de mercado.
Resiliência: Superar desafios e aprender com os erros.
Criatividade: Desenvolver soluções inovadoras para problemas existentes.
Gestão financeira: Administrar bem os recursos para garantir a sustentabilidade do negócio.
Liderança: Inspirar e motivar sua equipe para atingir objetivos.
Capacidade de adaptação: Ajustar-se rapidamente a mudanças no mercado.
5. Passos para Criar um Negócio de Sucesso
Se você deseja empreender, siga estes passos fundamentais para estruturar seu negócio:

5.1. Identifique uma Oportunidade
Observe problemas do dia a dia e analise como você pode resolvê-los. Pesquise tendências de mercado e identifique nichos pouco explorados.

5.2. Elabore um Plano de Negócios
Um plano de negócios é essencial para estruturar sua empresa. Ele deve incluir:

Descrição do negócio
Público-alvo
Concorrência
Plano financeiro
Estratégias de marketing
5.3. Formalize sua Empresa
Legalizar seu negócio pode trazer benefícios como acesso a crédito, emissão de notas fiscais e maior credibilidade. No Brasil, muitos empreendedores começam como MEI (Microempreendedor Individual), uma categoria simplificada para pequenos negócios.

5.4. Cuide das Finanças
Uma boa gestão financeira é essencial para a sobrevivência de qualquer empresa. Dicas importantes incluem:

Separar finanças pessoais e empresariais.
Monitorar fluxo de caixa.
Controlar custos e evitar desperdícios.
Buscar investimentos quando necessário.
5.5. Invista em Marketing
Divulgar seu negócio é fundamental para atrair clientes. Algumas estratégias eficazes incluem:

Marketing digital (redes sociais, SEO, anúncios pagos).
Parcerias com influenciadores.
Fidelização de clientes através de um bom atendimento.
5.6. Escale Seu Negócio
Após consolidar sua empresa, o próximo passo é expandi-la. Isso pode ser feito através de:

Lançamento de novos produtos/serviços.
Expansão para novos mercados.
Abertura de filiais ou franquias.
6. Desafios do Empreendedorismo
Embora empreender seja gratificante, também apresenta desafios, como:

Burocracia: No Brasil, abrir e manter um negócio pode envolver processos burocráticos demorados.
Concorrência acirrada: É preciso inovar constantemente para se destacar.
Instabilidade financeira: Nos primeiros meses, pode ser difícil obter lucro.
Dificuldade de acesso a crédito: Pequenos empreendedores podem ter dificuldades para conseguir financiamento.
Para superar esses desafios, é importante estar sempre aprendendo, buscar orientação e estar disposto a se adaptar."
			/>
			<Textos
				titulo="O Papel da Tecnologia no Empreendedorismo"
				texto="A tecnologia tem revolucionado o mundo dos negócios, oferecendo ferramentas que facilitam a gestão e impulsionam o crescimento. Algumas inovações incluem:

E-commerce: Plataformas como Shopify e Mercado Livre facilitam a venda online.
Redes sociais: Instagram, Facebook e TikTok são essenciais para o marketing digital.
Automação: Softwares de gestão ajudam a administrar finanças e estoque.
Inteligência Artificial: Ferramentas de IA auxiliam na análise de dados e atendimento ao cliente.
Empresas que sabem utilizar a tecnologia a seu favor têm maior potencial de crescimento e competitividade.

Conclusão
O empreendedorismo é uma jornada desafiadora, mas extremamente recompensadora. Ele permite que indivíduos transformem ideias em negócios, criem impacto na sociedade e alcancem a independência financeira.

Para empreender com sucesso, é essencial planejamento, disciplina e aprendizado contínuo. Quem se mantém atualizado e sabe se adaptar às mudanças do mercado tem maiores chances de prosperar.

Se você deseja empreender, comece agora! Identifique uma oportunidade, planeje seu negócio e dê o primeiro passo. O caminho pode ser difícil, mas a realização de construir algo próprio faz todo o esforço valer a pena. 🚀💡"
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

export default Empreendedores;