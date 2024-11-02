import { FC, useEffect, useState } from "react";
import { FiltrosMovimentacoesProps } from "../../../interfaces/FiltrosMovimentacoesProps";
import { MovimentacaoService } from "../../../services/MovimentacaoService";
import back from "../../../http";
import { IMovimentacao } from "../../../interfaces/IMovimentacao";


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
				console.log("erro ao carregar categorias");
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