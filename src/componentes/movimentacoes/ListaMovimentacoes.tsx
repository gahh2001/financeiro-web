import { ArrowDownward, ArrowUpward, InfoOutlined } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useAtom } from "jotai";
import { FC, useEffect, useState } from "react";
import { accessToken } from "../../atoms/atom";
import { useBack } from "../../http";
import { ListaMovimentacaoProps } from "../../interfaces/FiltrosMovimentacoesProps";
import { MovimentacaoService } from "../../services/MovimentacaoService";
import { Movimentacao } from "../../types/Movimentacao";
import ConverteIcone from "../configuracoes/categorias/ConverteIcones";

const ListaMovimentacoes: FC<ListaMovimentacaoProps> = (props: ListaMovimentacaoProps) => {
	const movimentacaoService = new MovimentacaoService(useBack());
	const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
	const [movimentacoesIniciais, setMovimentacoesIniciais] = useState<Movimentacao[]>([]);
	const [campoOrdem, setCampoOrdem] = useState("data");
	const [ordemAsc, setOrdemAsc] = useState(true);
	const [accessTokenAtom] = useAtom(accessToken);

	function mudaOrdem(campo: string) {
		setCampoOrdem(campo);
		setOrdemAsc(!ordemAsc);
	}

	useEffect(() => {
		const buscaCategorias = async () => {
			try {
				if (accessTokenAtom !== "") {
					const categorias = await movimentacaoService
						.obtemPorParametros(props.dataInicio?.valueOf(), props.dataFim?.valueOf(),
							props.tipo, props.categorias);
					if (categorias?.data) {
						setMovimentacoesIniciais(categorias.data);
						setMovimentacoes(categorias.data);
					}
				}
			} catch (error) {
				console.log("erro ao carregar movimentações");
			}
		}
		buscaCategorias();
	}, [props.dataInicio, props.dataFim]);

	useEffect(() => {
		if (props.tipo !== "TODOS") {
			setMovimentacoes(movimentacoesIniciais.filter(movimentacao =>
				movimentacao.tipoMovimentacao === props.tipo
			));
		}
	},[props.tipo]);

	useEffect(()=> {
		let sortedMovimentacoes = [...movimentacoes];
		switch (campoOrdem) {
			case "data":
				sortedMovimentacoes.sort((a, b) =>
					new Date(a.dataMovimentacao).getTime() - new Date(b.dataMovimentacao).getTime()
				);
				break;
			case "categoria":
				sortedMovimentacoes.sort((a, b) =>
					(a.nomeCategoriaMovimentacao || "").localeCompare(b.nomeCategoriaMovimentacao || "")
				);
				break;
			case "valor":
				sortedMovimentacoes.sort((a, b) => a.valor - b.valor);
				break;
			default:
				break;
		}
		if (!ordemAsc) {
			sortedMovimentacoes.reverse();
		}
		setMovimentacoes(sortedMovimentacoes);
	}, [campoOrdem, ordemAsc]);
	
	useEffect(() => {
		if (!props.categorias.includes("Todas")) {
			setMovimentacoes(movimentacoesIniciais.filter(movimentacao =>
				props.categorias.includes(movimentacao.nomeCategoriaMovimentacao || "")
			));
			return;
		}
		setMovimentacoes(movimentacoesIniciais.filter(movimentacao =>
			movimentacao.tipoMovimentacao === props.tipo
		));
	},[props.categorias]);

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
		</div>
		: <div className="nenhum-conteudo">Nenhuma movimentação para estes filtros...</div>
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
						<p className="variavel">{movimentacao.valor.toFixed(2).replace('.', ',')}</p>
						<div className="icon">
							<Tooltip
								title="Ver descrição da movimentação"
								placement="top"
							>
								<IconButton
									onClick={() => props.dialogDescricao(movimentacao.descricaoMovimentacao)}
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

	function obtemIconeOdem(campo: string) {
		if (campo === campoOrdem && ordemAsc) {
			return (<ArrowDownward/>);
		}
		return (<ArrowUpward/>);
	}
}
	
export default ListaMovimentacoes;