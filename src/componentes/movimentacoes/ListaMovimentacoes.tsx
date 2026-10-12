import { ArrowDownward, ArrowUpward, InfoOutlined } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useAtom } from "jotai";
import { FC, useEffect, useMemo, useState } from "react";
import { accessToken, movementSearchText } from "../../atoms/atom";
import { TipoMovimentacaoEnum } from "../../enums/TipoMovimentacaoEnum";
import { ListaMovimentacaoProps } from "../../interfaces/FiltrosMovimentacoesProps";
import { MovimentacaoService } from "../../services/MovimentacaoService";
import { Movimentacao } from "../../types/Movimentacao";
import ConverteIcone from "../../utils/ConverteIcones";
import { useDialog } from "../contextProviders/DialogContext";

const ListaMovimentacoes: FC<ListaMovimentacaoProps> = (props: ListaMovimentacaoProps) => {
	const movimentacaoService = new MovimentacaoService();
	const [movimentacoesIniciais, setMovimentacoesIniciais] = useState<Movimentacao[]>([]);
	const [campoOrdem, setCampoOrdem] = useState("data");
	const [ordemAsc, setOrdemAsc] = useState(true);
	const [accessTokenAtom] = useAtom(accessToken);
	const [searchText] = useAtom(movementSearchText);
	const { showDialog } = useDialog();

	function mudaOrdem(campo: string) {
		setCampoOrdem(campo);
		setOrdemAsc(!ordemAsc);
	}

	useEffect(() => {
		const buscaCategorias = async () => {
			try {
				if (accessTokenAtom !== "") {
					const categorias = await movimentacaoService
						.obtemPorParametros(searchText ? undefined : props.dataInicio?.valueOf(),
							searchText ? undefined : props.dataFim?.valueOf(), undefined, undefined, searchText);
					if (categorias?.data) {
						setMovimentacoesIniciais(categorias.data);
					}
				}
			} catch (error) {
				console.log("erro ao carregar movimentações");
			}
		}
		buscaCategorias();
	}, [props.dataInicio, props.dataFim, searchText]);

	const movimentacoes = useMemo(() => {
		const filteredMovimentacoes = movimentacoesIniciais.filter(movimentacao =>
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
	}, [movimentacoesIniciais, props.tipo, props.categorias, campoOrdem, ordemAsc]);

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
			</div>
		</div>
		: <div className="nenhum-conteudo">
			{searchText ? `Nenhuma movimentação com "${searchText}" na descrição...` : "Nenhuma movimentação para estes filtros..."}
		</div>
	);

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