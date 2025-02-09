import { InfoOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useAtom } from "jotai";
import { FC, Fragment, useEffect, useState } from "react";
import { planejamento } from "../../../atoms/atom";
import { useBack } from "../../../http";
import '../../../paginas/movimentacoes/Movimentacoes.scss';
import { PlanejamentoService } from "../../../services/PlanejamentoService";
import { Movimentacao } from "../../../types/Movimentacao";
import ConverteIcone from "../../configuracoes/categorias/ConverteIcones";
import DialogDescricaoMovimentacao from "../../home/informacoesDoDiaCard/dialogDescricaoMovimentacao/DialogDescricaoMovimentacao";

const CardMovimentacoesPlanejamento: FC = () => {
	const service = new PlanejamentoService(useBack());
	const [selecionado] = useAtom(planejamento);
	const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
	const [isOpenDialogDescricao, setIsOpenDialogDescricao] = useState(false);
	const [descricao, setDescricao] = useState("");

	useEffect(() => {
		const obtemMovimentacoes = async () => {
			if (selecionado && selecionado.id) {
				const retorno = await service.listaMovimentacoes(selecionado.id);
				if (retorno?.data) {
					setMovimentacoes(retorno.data);
				}
			}
		};
		obtemMovimentacoes();
	}, [selecionado]);

	const dialogDescricao = (description: string) => {
		setIsOpenDialogDescricao(true);
		setDescricao(description);
	}
	const closeDialogDescricao = () => {
		setIsOpenDialogDescricao(false);
	}

	return (
		<Fragment>
			{movimentacoes.length ?
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
									onClick={() => dialogDescricao(movimentacao.descricaoMovimentacao)}
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
			: <div className="nenhum-conteudo">
				Não há nenhuma movimentaçãoa ser exibida...
			</div> }
			<DialogDescricaoMovimentacao
				openDialog={isOpenDialogDescricao}
				description={descricao}
				onClose={closeDialogDescricao}
			/>
		</Fragment>
	);
}

export default CardMovimentacoesPlanejamento;