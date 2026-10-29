import { ArrowDownward, ArrowUpward, FileDownloadOutlined, InfoOutlined } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useAtom } from "jotai";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { accessToken, movementSearchText } from "../../atoms/atom";
import { TipoMovimentacaoEnum } from "../../enums/TipoMovimentacaoEnum";
import { ListaMovimentacaoProps } from "../../interfaces/FiltrosMovimentacoesProps";
import { MovimentacaoService } from "../../services/MovimentacaoService";
import { Movimentacao } from "../../types/Movimentacao";
import ConverteIcone from "../../utils/ConverteIcones";
import { downloadMovementsSpreadsheet } from "../../utils/MovementSpreadsheetUtils";
import { useDialog } from "../contextProviders/DialogContext";

const searchDebounceMilliseconds = 400;

const ListaMovimentacoes: FC<ListaMovimentacaoProps> = (props: ListaMovimentacaoProps) => {
	const movimentacaoService = new MovimentacaoService();
	const [movimentacoesIniciais, setMovimentacoesIniciais] = useState<Movimentacao[]>([]);
	const [campoOrdem, setCampoOrdem] = useState("data");
	const [ordemAsc, setOrdemAsc] = useState(true);
	const [loading, setLoading] = useState(true);
	const [loadFailed, setLoadFailed] = useState(false);
	const [generatingReport, setGeneratingReport] = useState(false);
	const [accessTokenAtom] = useAtom(accessToken);
	const [searchText] = useAtom(movementSearchText);
	const latestRequestId = useRef(0);
	const lastRequestedSearchText = useRef(searchText);
	const { showDialog } = useDialog();
	const hasValidPeriod = Boolean(searchText)
		|| Boolean(props.dataInicio?.isValid() && props.dataFim?.isValid());

	function mudaOrdem(campo: string) {
		setCampoOrdem(campo);
		setOrdemAsc(!ordemAsc);
	}

	useEffect(() => {
		if (accessTokenAtom === "") {
			return;
		}
		latestRequestId.current += 1;
		if (!hasValidPeriod) {
			setMovimentacoesIniciais([]);
			setLoadFailed(false);
			setLoading(false);
			return;
		}
		setLoading(true);
		const delay = searchText !== lastRequestedSearchText.current ? searchDebounceMilliseconds : 0;
		lastRequestedSearchText.current = searchText;
		const timer = setTimeout(loadMovements, delay);
		return () => clearTimeout(timer);
	}, [props.dataInicio, props.dataFim, searchText]);

	const movimentacoes = useMemo(() => applyDisplayFilters(movimentacoesIniciais),
		[movimentacoesIniciais, props.tipo, props.categorias, campoOrdem, ordemAsc]);

	const totals = useMemo(() => movimentacoes.reduce((accumulated, movimentacao) =>
		movimentacao.tipoMovimentacao === TipoMovimentacaoEnum.POSITIVO.toString()
			? {...accumulated, income: accumulated.income + movimentacao.valor}
			: {...accumulated, expense: accumulated.expense + movimentacao.valor},
		{ income: 0, expense: 0 }
	), [movimentacoes]);
	const total = totals.income + totals.expense;

	return (
		movimentacoes.length ?
		<div className="listagem">
			<div className="headers">
				<Button onClick={() => mudaOrdem("data")}>
					Data {obtemIconeOdem("data")}
				</Button>
				<Button onClick={() => mudaOrdem("categoria")}>
					Categoria {obtemIconeOdem("categoria")}
				</Button>
				<Button onClick={() => mudaOrdem("valor")}>
					Valor {obtemIconeOdem("valor")}
				</Button>
				<Button >
					Descrição
				</Button>
			</div>
			{montaMovimentacoes(movimentacoes)}
			<div className="totais">
				<p>
					Rendimentos
					<span style={{ color: "#42B84A" }}>{formatAmount(totals.income)}</span>
				</p>
				<p>
					Despesas
					<span style={{ color: "#AD4331" }}>{formatAmount(totals.expense)}</span>
				</p>
				<p>
					Soma total
					<span>{formatAmount(total)}</span>
				</p>
				<Button
					variant="outlined"
					size="small"
					startIcon={<FileDownloadOutlined/>}
					disabled={loading || generatingReport}
					onClick={generateReport}
				>
					Gerar relatório
				</Button>
			</div>
		</div>
		: <div className="nenhum-conteudo">
			{getEmptyListMessage()}
		</div>
	);

	async function loadMovements() {
		latestRequestId.current += 1;
		const requestId = latestRequestId.current;
		const response = await movimentacaoService.obtemPorParametros(
			searchText ? undefined : props.dataInicio?.hour(12).valueOf(),
			searchText ? undefined : props.dataFim?.hour(12).valueOf(),
			undefined, undefined, searchText);
		if (requestId === latestRequestId.current) {
			setMovimentacoesIniciais(response?.data ?? []);
			setLoadFailed(!response?.data);
			setLoading(false);
		}
		return response?.data;
	}

	async function generateReport() {
		setGeneratingReport(true);
		setLoading(true);
		const movements = await loadMovements();
		try {
			if (!movements) {
				throw new Error("Não foi possível obter as movimentações");
			}
			await downloadMovementsSpreadsheet(applyDisplayFilters(movements), getReportFileName());
		} catch (error) {
			console.log("erro ao gerar relatório de movimentações", error);
			showDialog("Não foi possível gerar o relatório. Tente novamente.", "Relatório");
		}
		setGeneratingReport(false);
	}

	function applyDisplayFilters(movements: Movimentacao[]) {
		const filteredMovimentacoes = movements.filter(movimentacao =>
			(props.tipo === TipoMovimentacaoEnum.TODOS.toString() || movimentacao.tipoMovimentacao === props.tipo)
			&& (props.categorias.includes("Todas")
				|| props.categorias.includes(movimentacao.nomeCategoriaMovimentacao || ""))
		);
		switch (campoOrdem) {
			case "data":
				filteredMovimentacoes.sort((a, b) =>
					new Date(a.dataMovimentacao).getTime() - new Date(b.dataMovimentacao).getTime()
				);
				break;
			case "categoria":
				filteredMovimentacoes.sort((a, b) =>
					(a.nomeCategoriaMovimentacao || "").localeCompare(b.nomeCategoriaMovimentacao || "")
				);
				break;
			case "valor":
				filteredMovimentacoes.sort((a, b) => a.valor - b.valor);
				break;
			default:
				break;
		}
		if (!ordemAsc) {
			filteredMovimentacoes.reverse();
		}
		return filteredMovimentacoes;
	}

	function getReportFileName() {
		return searchText
			? "movimentacoes-busca.xlsx"
			: `movimentacoes-${props.dataInicio?.format("DD-MM-YYYY")}-a-${props.dataFim?.format("DD-MM-YYYY")}.xlsx`;
	}

	function getEmptyListMessage() {
		if (loadFailed) {
			return "Não foi possível carregar as movimentações...";
		}
		if (!hasValidPeriod) {
			return "Informe um período válido para ver as movimentações...";
		}
		if (loading) {
			return "Carregando movimentações...";
		}
		return searchText ? `Nenhuma movimentação com "${searchText}" na descrição...` : "Nenhuma movimentação para estes filtros...";
	}

	function montaMovimentacoes(movimentacoes: Movimentacao[]) {
		return movimentacoes && movimentacoes.length && (
			<div className="lista-movimentacoes">
				{movimentacoes.map((movimentacao, index) => (
					<div key={index} className="movimentacao">
						<div className="icon">
							<ConverteIcone icone={movimentacao.icone} corIcone={movimentacao.corIcone} />
						</div>
						<p>
							{new Date(movimentacao.dataMovimentacao).getUTCDate().toString().padStart(2,"0")}
							/{new Date(movimentacao.dataMovimentacao).getUTCMonth() + 1}
							/{new Date(movimentacao.dataMovimentacao).getUTCFullYear()}
						</p>
						<p className="variavel">{movimentacao.nomeCategoriaMovimentacao}</p>
						<p
							className="variavel"
							style={{ color: movimentacao.tipoMovimentacao === TipoMovimentacaoEnum.POSITIVO.toString() ? "#42B84A" : "#AD4331" }}
						>
							{movimentacao.valor.toFixed(2).replace('.', ',')}
						</p>
						<div className="icon">
							<Tooltip
								title="Ver descrição da movimentação"
								placement="top"
							>
								<IconButton
									onClick={() => showDialog(movimentacao.descricaoMovimentacao)}
								>
									<InfoOutlined
										sx={{ color: "#0085FF" }}
									/>
								</IconButton>
							</Tooltip>
						</div>
					</div>
				))}
			</div>
		);
	}

	function formatAmount(amount: number) {
		return amount.toFixed(2).replace('.', ',');
	}

	function obtemIconeOdem(campo: string) {
		if (campo === campoOrdem && ordemAsc) {
			return (<ArrowDownward/>);
		}
		return (<ArrowUpward/>);
	}
}

export default ListaMovimentacoes;