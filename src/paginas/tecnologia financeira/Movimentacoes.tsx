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
import image3 from '../../imagensGoogle/3.jpg';
import image8 from '../../imagensGoogle/30.webp';
import image9 from '../../imagensGoogle/31.jpg';
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import './Movimentacoes.scss';


const TecnologiaFinanceira: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
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
				modulo="Tecnologia Financeira"
				urlPicture={props.urlPicture}
				setId={props.setId}
				setPicture={props.setPicture}
			/>
			<div className="movimentacoes">
			<Textos
				titulo="Tecnologia Financeira: A Revolução do Mercado Financeiro e Seus Impactos!"
				texto="A tecnologia tem transformado todos os aspectos da vida cotidiana, e o mercado financeiro não é exceção. Nos últimos anos, as inovações tecnológicas, principalmente no campo da tecnologia financeira, mais conhecida como Fintech, têm revolucionado a forma como lidamos com dinheiro, investimentos e transações financeiras. A tecnologia financeira pode ser definida como a aplicação de tecnologia para melhorar e automatizar os serviços e processos financeiros. Desde o início das fintechs até o surgimento de novas plataformas e serviços, o setor tem evoluído a passos largos, trazendo novas oportunidades, mas também desafios.

O conceito de fintech ganhou popularidade nos últimos anos com o surgimento de startups que começaram a democratizar o acesso a serviços financeiros, simplificando processos que antes eram considerados complexos e caros. A inovação que essas empresas trouxeram permitiu uma maior inclusão financeira, trazendo serviços financeiros de qualidade para um número maior de pessoas, incluindo aquelas que antes estavam à margem do sistema bancário tradicional. As fintechs tornaram o acesso a crédito, pagamentos, investimentos e seguros mais ágil, transparente e acessível."
			/>
			<img src={image8} style={{width: "40%"}} alt="" />
			<Textos
				titulo="Avanços significativos"
				texto="Uma das inovações mais significativas no campo da tecnologia financeira foi a introdução dos pagamentos digitais. Com a ascensão de aplicativos como PayPal, Google Pay, Apple Pay e várias outras plataformas de pagamento, as transações financeiras se tornaram mais rápidas, seguras e acessíveis. As pessoas agora podem transferir dinheiro entre contas bancárias em segundos, pagar por bens e serviços online de maneira simples e até dividir contas entre amigos em tempo real, tudo com um simples toque na tela do celular. Isso tem aumentado a conveniência das transações financeiras diárias e tem permitido uma evolução do comércio digital, facilitando o processo de compra e venda em uma economia global.

Outro grande avanço da tecnologia financeira tem sido a automatização e inteligência artificial. Ferramentas de análise de dados e algoritmos inteligentes podem identificar padrões de comportamento de consumo, prever as flutuações do mercado e oferecer sugestões personalizadas para investimentos. Robôs de investimentos, também conhecidos como robo-advisors, têm se popularizado, permitindo que qualquer pessoa, independentemente de seu nível de conhecimento financeiro, possa investir de maneira eficiente e automatizada. Esses robo-advisors oferecem uma gestão de carteira mais acessível, com taxas mais baixas e sem a necessidade de consultores financeiros tradicionais, que costumam cobrar comissões altas."
			/>
			<img src={image9} style={{width: "40%"}} alt="" />
			<Textos
				titulo="Decentralizações e as tendências"
				texto="Além disso, a blockchain, tecnologia que sustenta as criptomoedas, tem sido uma grande transformação para o mercado financeiro. Essa tecnologia de registro distribuído permite transações seguras e descentralizadas, sem a necessidade de intermediários. A blockchain não se limita apenas às criptomoedas, mas tem sido utilizada para revolucionar processos financeiros, como a gestão de contratos inteligentes, registros de ativos, transações internacionais e até mesmo a emissão de títulos. Sua capacidade de criar um ambiente mais transparente e seguro tem atraído a atenção de empresas tradicionais e governos, que buscam formas de implementar soluções baseadas em blockchain para aprimorar os sistemas financeiros globais.

A inclusão financeira tem sido uma das áreas mais impactadas pela tecnologia financeira. Com a tecnologia, muitas pessoas que antes não tinham acesso a contas bancárias ou produtos financeiros agora podem se beneficiar de serviços que antes estavam fora de seu alcance. Um exemplo disso é a criação de bancos digitais e neobancos, que oferecem contas bancárias completamente online e sem tarifas abusivas. Esses bancos têm conquistado uma grande base de clientes, principalmente entre as gerações mais jovens, que preferem a conveniência de ter tudo no celular e pagar menos por serviços bancários."
			/>
			<Textos
				titulo="P2P: entenda a tecnologia extremamente eficaz para o mercado"
				texto="As plataformas de empréstimos peer-to-peer (P2P) também surgiram como uma alternativa ao crédito tradicional. Essas plataformas conectam diretamente os tomadores de crédito com os investidores, sem a necessidade de um intermediário bancário. Isso possibilita uma redução nos custos, tornando o crédito mais acessível e atrativo tanto para quem precisa emprestar dinheiro quanto para quem deseja investir. O sistema P2P tem ganhado cada vez mais popularidade, principalmente em mercados emergentes, onde o acesso ao crédito pode ser limitado.

Porém, à medida que a tecnologia financeira avança, surgem novos desafios e questões a serem resolvidas. A segurança é um dos maiores obstáculos que a tecnologia financeira enfrenta. Embora as inovações em criptografia e autenticação tenham aumentado a proteção contra fraudes, a constante evolução dos ataques cibernéticos exige que as empresas de fintech invistam continuamente em sistemas de segurança. A proteção de dados e a privacidade dos usuários também são questões essenciais, especialmente considerando as grandes quantidades de informações pessoais que circulam nas plataformas financeiras digitais.

Além disso, há o desafio da regulação. O mercado financeiro tradicional é altamente regulamentado, mas muitas das fintechs surgiram sem a mesma supervisão, o que pode gerar incertezas quanto à estabilidade e confiabilidade dos serviços oferecidos. Os reguladores estão começando a se adaptar a essa nova realidade, criando legislações que buscam equilibrar inovação e proteção ao consumidor. No entanto, a regulação da tecnologia financeira continua sendo uma área complexa e em constante evolução."
			/>
			<Textos
				titulo="Conclusão"
				texto="Em resumo, a tecnologia financeira tem mudado radicalmente o panorama do mercado financeiro, trazendo benefícios significativos em termos de acesso, conveniência e eficiência. Ao mesmo tempo, também apresenta novos desafios, como a segurança digital e a regulação, que precisam ser constantemente monitorados. Para os investidores, consumidores e empresas, o importante é entender como aproveitar essas inovações de maneira responsável, adaptando-se às novas tecnologias e aproveitando as oportunidades que surgem, sem deixar de lado os riscos que podem acompanhar essas mudanças rápidas e disruptivas."
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

export default TecnologiaFinanceira;