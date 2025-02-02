import { Box, Link } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useAtom } from "jotai";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleIdAtom } from "../../atoms/atom";
import CategoriasEvolucao from "../../componentes/analitico/CategoriasEvolucao";
import CategoriasPorcentagem from "../../componentes/analitico/CategoriasPorcentagem";
import CategoriasVisaoGeral from "../../componentes/analitico/CategoriasVisaoGeral";
import AppBar from "../../componentes/AppBar/AppBar";
import Dica from "../../componentes/dicas/Dica";
import Footer from "../../componentes/footer/Footer";
import Textos from "../../componentes/Textos";
import { obtemNumeroEnum, TipoComparacaoEnum } from "../../enums/TipoComparacaoEnum";
import { TipoMovimentacaoEnum } from "../../enums/TipoMovimentacaoEnum";
import back from "../../http";
import image1 from '../../imagensGoogle/1.png';
import image10 from '../../imagensGoogle/10.jpg';
import image3 from '../../imagensGoogle/3.jpg';
import image5 from '../../imagensGoogle/5.png';
import image7 from '../../imagensGoogle/7.jpg';
import image8 from '../../imagensGoogle/8.jpg';
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import { IMediasAnalitico } from "../../interfaces/IMediasAnalitico";
import { ISeriesChart } from "../../interfaces/ISeriesChart";
import { ISeriesComparacao } from "../../interfaces/ISeriesComparacao";
import { ISeriesEvolucao } from "../../interfaces/ISeriesEvolucao";
import { CategoriaMovimentacaoService } from "../../services/CategoriaMovimentacaoService";
import { SomaCategoriasPorMes } from "../../types/SomaCategoriasPorMes";
import './Analitico.scss';

const Analitico: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
	const [ano, setAno] = useState<Dayjs | null>(dayjs(new Date().getTime()));
	const [mes, setMes] = useState<Dayjs | null>(ano);
	const [tipoMovimentacaoTop, setTipoMovimentacaoTop] = useState(TipoMovimentacaoEnum.POSITIVO.toString());
	const [tipoMovimentacaoDown, setTipoMovimentacaoDown] = useState(TipoMovimentacaoEnum.POSITIVO.toString());
	const [tipoComparacao, setTipoComparacao] = useState(TipoComparacaoEnum.TRESMESES.toString());
	const [openDicaGeral, setOpenDicaGeral] = useState(localStorage.getItem('dicaGeral') !== "ok");
	const [openDicaComparacao, setOpenDicaComparacao] = useState(localStorage.getItem('dicaComparacao') !== "ok");
	const [fullYear, setFullYear] = useState(false);
	const [nomeCategorias, setNomeCategorias] = useState<string[]>([]);
	const [somaCategorias, setSomaCategorias] = useState<number[]>([]);
	const [porcentagens, setPorcentagens] = useState<ISeriesChart[]>([]);
	const [comparacoes, setComparacoes] = useState<ISeriesComparacao[]>([]);
	const [evolucao, setEvolucao] = useState<ISeriesEvolucao[]>([]);
	const [agrupamentoMesAnoEvolucao, setAgrupamentoMesAnoEvolucao] = useState<string[]>([]);
	const [agrupamentoMesAnoComparacao, setAgrupamentoMesAnoComparacao] = useState<string[]>([]);
	const [mediasGerais, setMediasgerais] = useState<IMediasAnalitico>();
	const categoriaService = new CategoriaMovimentacaoService(back);
	const [googleId] = useAtom(googleIdAtom);
	const isMounted = useRef(true);
	const navigate = useNavigate();

	const propsSetMes = (date: Dayjs | null) => {
		setMes(date);
	};
	const propsSetAno = (date: Dayjs | null) => {
		setAno(date);
	};
	const propsSetFullYear = (full: boolean) => {
		setFullYear(full);
	};
	const propsSetTipoMovimentacaoTop = (tipo: string) => {
		setTipoMovimentacaoTop(tipo);
	};
	const propsSetTipoMovimentacaoDown = (tipo: string) => {
		setTipoMovimentacaoDown(tipo);
	};
	const propsSetTipoComparacao = (tipo: string) => {
		setTipoComparacao(tipo);
	};

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		if (!googleId && isMounted.current) {
			//navigate("/login")
		}
	}, [googleId])

	useEffect(() => {
		const atualizaVisaoGeral = async () => {
			//setMes(ano);
			try {
					const categoriaMovimentacaoService = new CategoriaMovimentacaoService(back);
					const soma = await categoriaMovimentacaoService
						.obtemSomaCategoriasEValores(googleId, obtemDataInicial(), obtemDataFinal(), tipoMovimentacaoTop);
					if (soma?.data) {
						extraiSomas(soma.data);
						extraiPorcentagens(soma.data);
					}
			} catch (error) {
				console.log("erro ao obter a soma por categorias ", error);
			}
		};
		atualizaVisaoGeral();
	}, [ano, mes, tipoMovimentacaoTop, fullYear]);
	
	useEffect(() => {
		const atualizaComparacoes = async () => {
			try {
				const somaComparacoes = await categoriaService
					.obtemSomaCategoriasEValoresPorMeses(googleId, obtemDataInicialComparacao(),
						obtemDataFinalComparacao(), tipoMovimentacaoDown);
				if (somaComparacoes?.data) {
					extraiSomaComparacoes(somaComparacoes.data);
				}
			} catch (error) {
				console.log("erro ao obter movimentações para comparação de períodos", error);
			}
		};
		atualizaComparacoes();
	}, [tipoComparacao, tipoMovimentacaoDown]);

	useEffect(() => {
		const atualizaEvolucao = async () => {
			try {
				const evolucoes = await categoriaService
					.obtemSomaCategoriasEvolucao(googleId, obtemDataInicialComparacao(),
						obtemDataFinalComparacao());
				if (evolucoes?.data) {
					extraiEvolucoes(evolucoes.data);
				}
			} catch (error) {
				console.log("erro ao obter as somas para o painel de evolução", error);
			}
		};
		atualizaEvolucao();
	}, [tipoComparacao]);

	useEffect(() => {
		let dataInicio: number;
		let dataFim: number;
		dataInicio = obtemDataInicialComparacao();
		dataFim = obtemDataFinalComparacao();
		const atualizaMedias = async () => {
			const medias = await categoriaService
				.obtemInformacoesgerais(googleId, dataInicio, dataFim);
			if (medias?.data) {
				extraiMedias(medias.data);
			}
		}
		atualizaMedias();
	}, [tipoComparacao]);

	return (
		<Fragment>
			<div className="analitico">
				<AppBar
					modulo="Investimentos"
					urlPicture={props.urlPicture}
					setId={props.setId}
					setPicture={props.setPicture}
				/>
				<Dica
					frase='Selecione um período e um tipo de movimentação para visualizar o desempenho'
					codigo="dicaGeral"
					open={openDicaGeral}
					setOpen={setOpenDicaGeral}
				/>
				<Textos
					titulo="A Importância dos Investimentos"
					texto="Investir vai além de simplesmente guardar dinheiro. Trata-se de colocar o seu dinheiro para
					trabalhar por você. Com o aumento da inflação e a desvalorização da moeda, simplesmente deixar o
					dinheiro parado não é suficiente para manter seu poder de compra ao longo do tempo. Os investimentos
					têm o potencial de gerar rendimentos que não apenas acompanham, mas superam a inflação, garantindo
					que seu patrimônio cresça ao longo dos anos. Além disso, os investimentos são uma ferramenta poderosa
					para alcançar objetivos financeiros de médio e longo prazo. Seja para comprar uma casa, financiar
					a educação dos filhos, montar um fundo de aposentadoria ou até mesmo realizar aquele sonho de viagem,
					investir adequadamente pode acelerar esse processo e tornar esses objetivos mais tangíveis.Investir é uma das maneiras mais eficazes de construir riqueza e garantir um futuro financeiramente estável. No entanto, muitas pessoas ainda têm receio de dar os primeiros passos no mundo dos investimentos, seja por falta de conhecimento ou pelo medo de perder dinheiro. A verdade é que, com planejamento e estratégia, investir pode transformar vidas, proporcionando segurança, crescimento e liberdade financeira.Neste guia completo, vamos explorar tudo o que você precisa saber sobre investimentos, desde os conceitos básicos até estratégias mais avançadas para maximizar seus ganhos e minimizar riscos."
				/>
				<img src={image3} style={{width: "30%"}} alt="" />
				<Textos
					titulo=""
					texto="Nos gráficos abaixo, veja a relação de investidores pessoa física VS  empresas na bolsa no ano de 2024:"
				/>
				<div className="conteudo">
					<div className="section">
						<CategoriasVisaoGeral
							nomeCategorias={nomeCategorias}
							somaCategorias={somaCategorias}
							tipoMovimentacao={tipoMovimentacaoTop}
						/>
						<CategoriasPorcentagem
							fatias={porcentagens}
						/>
					</div>
					<Textos
						titulo="Os Tipos de Investimentos"
						texto="Existem diversas opções de investimentos no mercado, e escolher o mais adequado vai depender
						do seu perfil de risco, dos seus objetivos financeiros e do prazo que você tem para atingir suas metas.
						Conhecer os tipos de investimentos é o primeiro passo para fazer uma escolha informada: Renda Fixa
						Os investimentos de renda fixa são mais previsíveis e seguros, com uma rentabilidade conhecida ou atrelada
						a um índice econômico, como a Selic ou o IPCA. Alguns exemplos de investimentos de renda fixa são:
						CDB (Certificado de Depósito Bancário): Oferece rentabilidade geralmente superior à poupança, com o risco de
						crédito do banco emissor. Tesouro Direto: São títulos públicos emitidos pelo governo, com diferentes tipos
						de rentabilidade, como pré-fixada ou atrelada à inflação. LCI/LCAs (Letra de Crédito Imobiliário e do Agronegócio): Têm isenção de Imposto de Renda para pessoas físicas e geralmente oferecem um bom retorno para investidores conservadores.
						Renda Variável
						Já os investimentos em renda variável apresentam maiores riscos, mas com o potencial de oferecer retornos mais altos. Os principais investimentos de renda variável são:
						Fundos de Investimento
						Os fundos de investimento são compostos por diversos ativos, como ações, títulos de renda fixa e imóveis. Ao investir em um fundo, você delega a gestão do seu dinheiro a um profissional que toma as decisões de investimento por você. Existem fundos para todos os perfis de risco, desde os mais conservadores até os mais agressivos.
						Investimentos Alternativos
						Além dos tradicionais, também existem alternativas como o crowdfunding de investimentos (onde você investe em projetos empresariais), o bitcoin e outras criptomoedas, além de commodities como ouro e petróleo. Embora possam oferecer altos retornos, são opções de maior risco e volatilidade, sendo indicados para investidores mais experientes e com maior tolerância ao risco."
					/>
					<img src={image7} style={{width: "60%"}} alt="" />
					<Textos
						titulo="Proteger o Dinheiro da Inflação"
						texto="A inflação reduz o poder de compra do dinheiro ao longo do tempo. Se você deixar seu dinheiro parado na conta corrente ou na poupança, ele perderá valor. Investindo, você pode fazer com que seu patrimônio cresça mais do que a inflação. Investir é essencial para quem deseja acumular riqueza e melhorar a qualidade de vida. Se você sonha em comprar uma casa, um carro, viajar pelo mundo ou se aposentar cedo, os investimentos podem acelerar esse processo. O sistema de previdência pública pode não ser suficiente para garantir um futuro confortável. Construir uma carteira de investimentos permite que você tenha independência financeira na aposentadoria. Com os investimentos certos, você pode gerar renda passiva – ou seja, dinheiro entrando na sua conta sem precisar trabalhar ativamente por ele. Dividendos de ações, aluguéis de imóveis e juros de renda fixa são exemplos disso."
					/>
					<Textos
						titulo=""
						texto="Ações: Comprar ações de empresas significa adquirir uma parte delas. A rentabilidade depende do desempenho da empresa no mercado e da valorização de suas ações."
					/>
					<Textos
						titulo=""
						texto="ETFs (Exchange Traded Funds): São fundos que replicam índices de ações, proporcionando uma forma de investir em um conjunto de ativos com um único produto."
					/>
					<Textos
						titulo=""
						texto="Fundos Imobiliários (FIIs): Permitem investir no setor imobiliário sem precisar comprar imóveis diretamente. Os FIIs pagam dividendos regularmente, tornando-se uma boa opção para quem busca renda passiva."
					/>
					<img src={image5} style={{width: "40%"}} alt="" />
					<Textos
						titulo=""
						texto="Veja o gráfico abaixo, a evolução da taxa  Selic nos ultimos 3 meses:"
					/>
					<div className="section">
						<CategoriasEvolucao
							agrupamentosMes={agrupamentoMesAnoEvolucao}
							evolucao={evolucao}
							comparacoes={null}
						/>
					</div>
					<Textos
						titulo="Investimentos para o Futuro"
						texto="Investir é uma maneira inteligente de garantir que você tenha mais liberdade financeira no futuro. Com o tempo, os rendimentos podem crescer exponencialmente, permitindo que você conquiste seus objetivos sem depender apenas do salário. Além disso, investir ajuda a proteger seu patrimônio contra a inflação e outros fatores econômicos que podem diminuir o valor do seu dinheiro ao longo dos anos.Começar a investir pode parecer um desafio no início, mas com a educação financeira adequada e a escolha de investimentos alinhados aos seus objetivos, você pode construir um futuro financeiro sólido e tranquilo. Lembre-se de que a chave é começar e, com o tempo, você aprenderá e adaptará suas estratégias para maximizar seus resultados. Investimentos são aplicações de dinheiro com o objetivo de obter retornos futuros. Em outras palavras, ao investir, você coloca seu capital em ativos financeiros ou reais esperando que ele se valorize com o tempo.Diferente da poupança, onde o dinheiro simplesmente fica parado e perde valor devido à inflação, os investimentos fazem o dinheiro trabalhar para você. Investir é essencial para quem deseja acumular riqueza e melhorar a qualidade de vida. Se você sonha em comprar uma casa, um carro, viajar pelo mundo ou se aposentar cedo, os investimentos podem acelerar esse processo."
					/>
					<Box sx={{width: "60%", height: "20vh", display: "flex", justifyContent: "left", gap: "1vh", alignItems: "end"}}>
						<img src={image1} style={{width: "25%"}} alt="" />
						<Link sx={{fontSize: "3vh"}} href="/home">Acesse o conteúdo sobre organização financeira, para entender como alcançar o equilíbrio na vida financeira</Link>
					</Box>
					<Box sx={{width: "60%", height: "20vh", display: "flex", justifyContent: "left", gap: "1vh", alignItems: "end"}}>
						<img src={image8} style={{width: "25%"}} alt="" />
						<Link sx={{fontSize: "3vh"}} href="/movimentacoes">Veja como estão os indicadores do mercado financeiro e o que esperar do cenário de finanças no ano de 2025</Link>
					</Box>
					<Box sx={{width: "60%", height: "20vh", display: "flex", justifyContent: "left", gap: "1vh", alignItems: "end"}}>
						<img src={image10} style={{width: "25%"}} alt="" />
						<Link sx={{fontSize: "3vh"}} href="/planejamentos">Veja como estão os indicadores do mercado financeiro e o que esperar do cenário de finanças no ano de 2025</Link>
					</Box>
				</div>
				<Footer/>
			</div>
		</Fragment>
	);

	function obtemDataInicial() {
		if (fullYear &&  ano) {
			const primeiroDiaAno = ano.toDate();
			primeiroDiaAno.setDate(1);
			primeiroDiaAno.setMonth(0);
			primeiroDiaAno.setHours(0);
			primeiroDiaAno.setMinutes(0);
			return primeiroDiaAno.getTime();
		}
		if (mes && ano) {
			const inicioMes = mes.toDate();
			inicioMes.setDate(1);
			inicioMes.setHours(0);
			inicioMes.setMinutes(0);
			inicioMes.setFullYear(ano.year());
			return inicioMes.getTime();
		}
		return 0;
	}

	function obtemDataFinal() {
		if (fullYear && ano) {
			const ultimoDiaAno = ano.toDate();
			ultimoDiaAno.setMonth(12);
			ultimoDiaAno.setDate(0);
			ultimoDiaAno.setHours(23);
			ultimoDiaAno.setMinutes(59);
			return ultimoDiaAno.getTime();
		}
		if (mes && ano) {
			const fimMes = mes.toDate();
			fimMes.setMonth(fimMes.getMonth() + 1);
			fimMes.setDate(0);
			fimMes.setFullYear(ano.year());
			fimMes.setHours(23);
			fimMes.setMinutes(59);
			return fimMes.getTime();
		}
		return 0;
	}

	function obtemDataInicialComparacao() {
		const dataInicial = new Date();
		dataInicial.setDate(1)
		dataInicial.setHours(0);
		dataInicial.setMinutes(0);
		switch (tipoComparacao) {
			case TipoComparacaoEnum.TRESMESES:
				dataInicial.setMonth(dataInicial.getMonth() - 2)
				break;
			case TipoComparacaoEnum.SEISMESES:
				dataInicial.setMonth(dataInicial.getMonth() - 5)
			break;
			default:
				dataInicial.setMonth(dataInicial.getMonth() - 11)
		}
		return dataInicial.getTime();
	}

	function obtemDataFinalComparacao() {
		const fimMes = new Date();
		fimMes.setMonth(fimMes.getMonth() + 1);
		fimMes.setDate(0);
		fimMes.setHours(23);
		fimMes.setMinutes(59);
		return fimMes.getTime();
	}

	function extraiSomas(lista: SomaCategoriasPorMes[]) {
		const categorias: string[] = [];
		const somas: number[] = [];
		lista.forEach((soma) => {
			categorias.push(soma.nomeCategoria);
			somas.push(soma.somaMovimentacao);
		});
		setNomeCategorias(categorias);
		setSomaCategorias(somas);
	}

	function extraiPorcentagens(lista: SomaCategoriasPorMes[]) {
		const porcentagens: ISeriesChart[] = [];
		let id = 0
		lista.forEach((soma) => {
			const fatia: ISeriesChart = {
				id: id + 1,
				value: soma.somaMovimentacao,
				label: soma.nomeCategoria,
				data: []
			}
			id++;
			porcentagens.push(fatia);
		})
		setPorcentagens(porcentagens);
	}

	function extraiSomaComparacoes(lista: SomaCategoriasPorMes[]) {
		const categoriasSet: Set<string> = new Set();
		lista.forEach(soma => {
			categoriasSet.add(soma.nomeCategoria);
		});
		const categoriasUnicas: string[] = Array.from(categoriasSet);
		let graficosProntos: ISeriesComparacao[] = [];
		let nomeAgrupamento: string[] = [];
		const totalMeses = obtemNumeroEnum(tipoComparacao);
		for (const categoria of categoriasUnicas ) {
			const mesVerificadoData = new Date(obtemDataInicialComparacao());
			let mesVerificado = mesVerificadoData.getMonth();
			let anoVerificado = mesVerificadoData.getFullYear();
			let contagemMes = 1;
			let somasNoMes = [];
			while (contagemMes <= totalMeses) {
				let somaNesteMes = lista.find((dado) =>
					dado.nomeCategoria === categoria
					&& new Date(dado.data).getUTCMonth() === mesVerificado)?.somaMovimentacao;
				if (!somaNesteMes) {
					somaNesteMes = 0;
				}
				somasNoMes.push(somaNesteMes);
				nomeAgrupamento.push(mesVerificado + 1 + "/" + anoVerificado);
				contagemMes++;
				if (mesVerificado === 11) {
					anoVerificado++;
				}
				if (mesVerificado === 11) {
					mesVerificado = 0;
				} else {
					mesVerificado++;
				}
				setAgrupamentoMesAnoComparacao(nomeAgrupamento);
			}
			const series: ISeriesComparacao = {
				label: categoria,
				data: somasNoMes,
			};
			graficosProntos.push(series);
		}
		setComparacoes(graficosProntos);
	}

	function extraiEvolucoes(lista: SomaCategoriasPorMes[]) {
		const categoriasSet: Set<string> = new Set();
		lista.forEach(soma => {
			categoriasSet.add(soma.nomeCategoria);
		});
		const categoriasUnicas: string[] = Array.from(categoriasSet);
		if (!categoriasUnicas.includes("Despesas")) {
			categoriasUnicas.push("Despesas");
		}
		let graficosProntos: ISeriesEvolucao[] = [];
		let nomeAgrupamentoSet: Set<string> = new Set();
		const totalMeses = obtemNumeroEnum(tipoComparacao);
		for (const categoria of categoriasUnicas ) {
			const mesVerificadoData = new Date(obtemDataInicialComparacao());
			let mesVerificado = mesVerificadoData.getMonth();
			let anoVerificado = mesVerificadoData.getFullYear();
			let contagemMes = 1;
			let somasNoMes = [];
			while (contagemMes <= totalMeses) {
				let somaNesteMes = lista.find((dado) =>
					dado.nomeCategoria === categoria
					&& ( new Date(dado.data).getMonth() + 1 === mesVerificado
					|| ( new Date(dado.data).getMonth() + 1 === 12 && mesVerificado === 0 ) )
				)?.somaMovimentacao;
				if (!somaNesteMes) {
					somaNesteMes = 0;
				}
				somasNoMes.push(somaNesteMes);
				nomeAgrupamentoSet.add(mesVerificado + 1 + "/" + anoVerificado);
				contagemMes++;
				if (mesVerificado === 11) {
					mesVerificado = 0;
					anoVerificado++;
				} else {
					mesVerificado++;
				}
			}
			const series: ISeriesEvolucao = {
				label: categoria,
				data: somasNoMes,
				color: categoria === "Rendimentos" ? "#42B84A" : "#AD4331"
			};
			graficosProntos.push(series);
		}
		const nomeAgrupamento: string[] = Array.from(nomeAgrupamentoSet);
		setAgrupamentoMesAnoEvolucao(nomeAgrupamento);
		setEvolucao(graficosProntos);
	}

	function extraiMedias(medias: IMediasAnalitico) {
		medias.porcentagem = (medias.gastomedia * 100) / medias.ganhoMedia;
		setMediasgerais(medias);
	}
}

export default Analitico;