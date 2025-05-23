import dayjs, { Dayjs } from "dayjs";
import { useAtom } from "jotai";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { accessToken } from "../../atoms/atom";
import CategoriasComparacao from "../../componentes/analitico/CategoriasComparacao";
import CategoriasDesempenho from "../../componentes/analitico/CategoriasDesempenho";
import CategoriasEvolucao from "../../componentes/analitico/CategoriasEvolucao";
import CategoriasPorcentagem from "../../componentes/analitico/CategoriasPorcentagem";
import CategoriasVisaoGeral from "../../componentes/analitico/CategoriasVisaoGeral";
import FiltroComparacoes from "../../componentes/analitico/filtros/FiltroComparacoes";
import FiltroData from "../../componentes/analitico/filtros/FiltroData";
import AppBar from "../../componentes/AppBar/AppBar";
import Dica from "../../componentes/dicas/Dica";
import Footer from "../../componentes/footer/Footer";
import { obtemNumeroEnum, TipoComparacaoEnum } from "../../enums/TipoComparacaoEnum";
import { TipoMovimentacaoEnum } from "../../enums/TipoMovimentacaoEnum";
import { IMediasAnalitico } from "../../interfaces/IMediasAnalitico";
import { ISeriesChart } from "../../interfaces/ISeriesChart";
import { ISeriesComparacao } from "../../interfaces/ISeriesComparacao";
import { ISeriesEvolucao } from "../../interfaces/ISeriesEvolucao";
import { CategoriaMovimentacaoService } from "../../services/CategoriaMovimentacaoService";
import { SomaCategoriasPorMes } from "../../types/SomaCategoriasPorMes";
import './Analitico.scss';

const Analitico: FC = () => {
	const [ano, setAno] = useState<Dayjs | null>(dayjs(new Date().getTime()));
	const [mes, setMes] = useState<Dayjs | null>(ano);
	const [tipoMovimentacaoTop, setTipoMovimentacaoTop] = useState(TipoMovimentacaoEnum.POSITIVO.toString());
	const [categoriasComparacao, setCategoriasComparacao] = useState(["POSITIVOS"]);
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
	const categoriaService = new CategoriaMovimentacaoService();
	const [accessTokenAtom] = useAtom(accessToken);
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
	const propsSetCategoriasComparacao = (categorias: string[]) => {
		setCategoriasComparacao(categorias);
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
		if (!accessTokenAtom && isMounted.current) {
			navigate("/login");
		}
	}, [accessTokenAtom])

	useEffect(() => {
		const atualizaVisaoGeral = async () => {
			try {
				if (accessTokenAtom !== "") {
					const soma = await categoriaService
						.obtemSomaCategoriasEValores(obtemDataInicial(), obtemDataFinal(), tipoMovimentacaoTop);
					if (soma?.data) {
						extraiSomas(soma.data);
						extraiPorcentagens(soma.data);
					}
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
					.obtemSomaCategoriasEValoresPorMeses(obtemDataInicialComparacao(),
						obtemDataFinalComparacao(), categoriasComparacao);
				if (somaComparacoes?.data) {
					extraiSomaComparacoes(somaComparacoes.data);
				}
			} catch (error) {
				console.log("erro ao obter movimentações para comparação de períodos", error);
			}
		};
		atualizaComparacoes();
	}, [tipoComparacao, categoriasComparacao]);

	useEffect(() => {
		const atualizaEvolucao = async () => {
			try {
				const evolucoes = await categoriaService
					.obtemSomaCategoriasEvolucao(obtemDataInicialComparacao(),
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
				.obtemInformacoesgerais(dataInicio, dataFim);
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
					modulo="Analítico"
				/>
				<Dica
					frase='Selecione um período e um tipo de movimentação para visualizar o desempenho'
					codigo="dicaGeral"
					open={openDicaGeral}
					setOpen={setOpenDicaGeral}
				/>
				<div className="conteudo">
					<div className="section">
						<FiltroData
							ano={ano}
							mes={mes}
							tipoMovimentacao={tipoMovimentacaoTop}
							fullYear={fullYear}
							setAno={propsSetAno}
							setMes={propsSetMes}
							setFullYear={propsSetFullYear}
							setTipoMovimentacao={propsSetTipoMovimentacaoTop}
						/>
						<CategoriasVisaoGeral
							nomeCategorias={nomeCategorias}
							somaCategorias={somaCategorias}
							tipoMovimentacao={tipoMovimentacaoTop}
						/>
						<CategoriasPorcentagem
							fatias={porcentagens}
						/>
					</div>
					<Dica
						frase='Nesta seção, você pode ver como tem sido a evolução ds suas movimentações nos últimos meses'
						codigo="dicaComparacao"
						open={openDicaComparacao}
						setOpen={setOpenDicaComparacao}
					/>
					<div className="section">
						<FiltroComparacoes
							tipoComparacao={tipoComparacao}
							tipoMovimentacao={categoriasComparacao}
							setTipoComparacao={propsSetTipoComparacao}
							setCategoriasComparacao={propsSetCategoriasComparacao}
						/>
						<CategoriasComparacao
							comparacoes={comparacoes}
							agrupamentosMes={agrupamentoMesAnoComparacao}
							evolucao={null}
						/>
						<CategoriasEvolucao
							agrupamentosMes={agrupamentoMesAnoEvolucao}
							evolucao={evolucao}
							comparacoes={null}
						/>
						{mediasGerais?.ganhoMedia &&mediasGerais.ganhoMedia > 0 && mediasGerais?.gastomedia > 0
							? <CategoriasDesempenho
								medias={mediasGerais}
							/>
							: <></>}
					</div>
				</div>
				<Footer/>
			</div>
		</Fragment>
	);

	function obtemDataInicial() {
		if (fullYear && ano) {
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
				dataInicial.setMonth(dataInicial.getUTCMonth() - 2)
				break;
			case TipoComparacaoEnum.SEISMESES:
				dataInicial.setMonth(dataInicial.getUTCMonth() - 5)
			break;
			default:
				dataInicial.setMonth(dataInicial.getUTCMonth() - 11)
		}
		return dataInicial.getTime();
	}

	function obtemDataFinalComparacao() {
		const fimMes = new Date();
		fimMes.setMonth(fimMes.getUTCMonth() + 1);
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
		for (const categoria of categoriasUnicas) {
			const mesVerificadoData = new Date(obtemDataInicialComparacao());
			let mesVerificado = mesVerificadoData.getUTCMonth();
			let anoVerificado = mesVerificadoData.getUTCFullYear();
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
		for (const categoria of categoriasUnicas) {
			const mesVerificadoData = new Date(obtemDataInicialComparacao());
			let mesVerificado = mesVerificadoData.getUTCMonth();
			let anoVerificado = mesVerificadoData.getUTCFullYear();
			let contagemMes = 1;
			let somasNoMes = [];
			while (contagemMes <= totalMeses) {
				let somaNesteMes = lista.find((dado) =>
					dado.nomeCategoria === categoria
					&& (new Date(dado.data).getUTCMonth() === mesVerificado
					|| (new Date(dado.data).getUTCMonth() === 12 && mesVerificado === 0))
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