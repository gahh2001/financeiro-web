import { ArrowDownward, InfoOutlined } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useAtom } from "jotai";
import { FC, useEffect, useState } from "react";
import { googleIdAtom } from "../../atoms/atom";
import back from "../../http";
import { ListaMovimentacaoProps } from "../../interfaces/FiltrosMovimentacoesProps";
import { IMovimentacao } from "../../interfaces/IMovimentacao";
import { MovimentacaoService } from "../../services/MovimentacaoService";
import ConverteIcone from "../configuracoes/categorias/ConverteIcones";

const ListaMovimentacoes: FC<ListaMovimentacaoProps> = (props: ListaMovimentacaoProps) => {
	const movimentacaoService = new MovimentacaoService(back);
	const [movimentacoes, setMovimentacoes] = useState<IMovimentacao[]>([]);
	const [googleId] = useAtom(googleIdAtom);

	useEffect(() => {
		const buscaCategorias = async () => {
			try {
				if (googleId !== "") {
					const categorias = await movimentacaoService
						.obtemPorParametros(googleId, props.dataInicio?.valueOf(), props.dataFim?.valueOf(),
							props.tipo, props.categorias);
					if (categorias?.data) {
						setMovimentacoes(categorias.data);
					}
				}
			} catch (error) {
				console.log("erro ao carregar movimentações");
			}
		}
		buscaCategorias();
	}, [props.dataInicio, props.dataFim, props.tipo, props.categorias]);

	return (
		<div className="listagem">
			<div className="headers">
				<Button>
					Data <ArrowDownward/>
				</Button>
				<Button>
					Categoria <ArrowDownward/>
				</Button>
				<Button>
					Valor <ArrowDownward/>
				</Button>
				<Button >
					Descrição
				</Button>
			</div>
			{montaMovimentacoes(movimentacoes)}
		</div>
	);

	function montaMovimentacoes(movimentacoes: IMovimentacao[]) {
		return movimentacoes && movimentacoes.length && (
			<div className="lista-movimentacoes">
				{movimentacoes.map((movimentacao, index) => (
					<div key={index} className="movimentacao">
						<div className="icon">
							<ConverteIcone icone={movimentacao.icone} corIcone={movimentacao.corIcone} />
						</div>
						<p>
							{new Date(movimentacao.dataMovimentacao).getDate().toString().padStart(2,"0")}
							/{new Date(movimentacao.dataMovimentacao).getMonth() + 1}
							/{new Date(movimentacao.dataMovimentacao).getFullYear()}
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
}


export default ListaMovimentacoes;