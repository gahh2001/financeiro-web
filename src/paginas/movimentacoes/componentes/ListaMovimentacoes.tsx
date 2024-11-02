import { FC, useEffect, useState } from "react";
import back from "../../../http";
import { FiltrosMovimentacoesProps } from "../../../interfaces/FiltrosMovimentacoesProps";
import { IMovimentacao } from "../../../interfaces/IMovimentacao";
import { MovimentacaoService } from "../../../services/MovimentacaoService";


const ListaMovimentacoes: FC<Partial<FiltrosMovimentacoesProps>> = (props: Partial <FiltrosMovimentacoesProps>) => {
	const movimentacaoService = new MovimentacaoService(back);
	const [movimentacoes, setMovimentacoes] = useState<IMovimentacao[]>([]);

	useEffect(() => {
		const buscaCategorias = async () => {
			try {
				if (props.googleId !== "") {
					const categorias = await movimentacaoService
						.obtemPorParametros(props.googleId, props.dataInicio?.valueOf(), props.dataFim?.valueOf(),
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
			
		</div>
	);
}

export default ListaMovimentacoes;