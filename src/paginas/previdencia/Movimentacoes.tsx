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
import image8 from '../../imagensGoogle/26.webp';
import image9 from '../../imagensGoogle/27.jpg';
import image3 from '../../imagensGoogle/3.jpg';
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import './Movimentacoes.scss';


const Previdencia: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
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
				modulo="Previdência"
				urlPicture={props.urlPicture}
				setId={props.setId}
				setPicture={props.setPicture}
			/>
			<div className="movimentacoes">
			<Textos
				titulo="Cenário atual: previdências em alta"
				texto="A previdência pessoal é um tema cada vez mais relevante no cenário financeiro atual. Com o envelhecimento da população e a crescente incerteza sobre o futuro das aposentadorias públicas, muitas pessoas estão buscando alternativas para garantir uma aposentadoria tranquila e sem depender unicamente da previdência social. A previdência pessoal é uma das formas mais eficazes de planejar a aposentadoria, oferecendo uma maneira estruturada de poupar e investir para o futuro.

A previdência pessoal é, basicamente, um tipo de poupança voltada para a aposentadoria, que pode ser feita por meio de planos privados oferecidos por instituições financeiras. Ela permite que os indivíduos escolham onde e como investir, de acordo com seu perfil de risco e objetivos financeiros. Ao contrário da previdência social, que é administrada pelo governo e possui regras rígidas, a previdência privada oferece mais flexibilidade e opções de investimentos. Os planos de previdência pessoal podem ser divididos em dois tipos principais: os planos PGBL (Plano Gerador de Benefício Livre) e os VGBL (Vida Gerador de Benefício Livre), cada um com características específicas que atendem a diferentes necessidades.

O PGBL é mais indicado para quem faz a declaração completa do Imposto de Renda, pois oferece a possibilidade de deduzir até 12% da renda bruta anual da base de cálculo do imposto. Essa dedução pode representar uma economia considerável de impostos, tornando o PGBL uma opção atraente para quem tem uma maior capacidade de poupança. Já o VGBL não oferece dedução no Imposto de Renda, mas é mais indicado para quem faz a declaração simplificada ou para quem não possui renda tributável suficiente para se beneficiar da dedução do PGBL."
			/>
			<img src={image8} style={{width: "40%"}} alt="" />
			<Textos
				titulo="Garantias e possibilidades"
				texto="Ambos os planos oferecem a possibilidade de escolher entre diversas opções de fundos de investimento, que variam em termos de rentabilidade e risco. Dependendo do perfil do investidor, é possível optar por fundos mais conservadores, que investem em renda fixa, ou por fundos mais arrojados, que aplicam em ações e outros ativos de maior risco. A escolha do tipo de fundo é uma das decisões mais importantes ao contratar um plano de previdência, pois ela determinará o crescimento do valor acumulado ao longo do tempo.

Além disso, a previdência pessoal permite que o investidor faça aportes regulares ou esporádicos, de acordo com sua capacidade financeira. Isso significa que, ao longo dos anos, o valor investido se acumula e, com a rentabilidade dos fundos escolhidos, o montante final pode ser substancial. Essa acumulação gradual é um dos grandes benefícios da previdência privada, já que ela proporciona uma forma disciplinada de poupar, sem a necessidade de grandes aportes iniciais.

Outro ponto importante da previdência pessoal é que ela pode ser uma forma de proteção financeira para a família em caso de falecimento. Muitos planos de previdência oferecem benefícios de seguridade, como a possibilidade de nomear um beneficiário que receberá o saldo acumulado em caso de morte do titular. Isso oferece uma segurança adicional para aqueles que desejam garantir que seus entes queridos não fiquem desamparados financeiramente.

Apesar de suas vantagens, a previdência pessoal também possui desvantagens que devem ser consideradas antes da contratação. Uma delas é a cobrança de taxas de administração e carregamento, que podem diminuir a rentabilidade do plano ao longo do tempo. Por isso, é fundamental avaliar as taxas cobradas pela instituição financeira e escolher uma opção com custos competitivos. Além disso, a previdência privada possui um prazo de carência, o que significa que o investidor deve manter o investimento por um tempo mínimo antes de poder acessar os recursos acumulados. Isso pode ser um fator limitante para quem precisar do dinheiro antes da aposentadoria."
			/>
			<img src={image9} style={{width: "40%"}} alt="" />
			<Textos
				titulo="Conclusão: prepare-se para o futuro!"
				texto="Em um cenário de instabilidade econômica, a previdência pessoal se destaca como uma ferramenta importante para a construção de um futuro financeiro mais seguro. Ela oferece a possibilidade de acumular recursos de forma disciplinada, com opções flexíveis de investimento e benefícios fiscais. No entanto, é essencial que o investidor faça uma análise cuidadosa de suas necessidades, objetivos e perfil de risco antes de contratar um plano de previdência, para garantir que está fazendo a melhor escolha para seu futuro.

Por fim, é fundamental lembrar que a previdência pessoal deve ser encarada como um complemento à previdência social, e não como uma substituta. A aposentadoria pública, embora fundamental, não é suficiente para garantir um padrão de vida confortável na velhice, e é por isso que é tão importante começar a planejar a aposentadoria o quanto antes. Quanto mais cedo se inicia o processo de poupança para o futuro, maiores as chances de ter uma aposentadoria tranquila e sem preocupações financeiras."
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

export default Previdencia;