import { ReactNode } from "react";
import { TipoMovimentacaoEnum } from "../../enums/TipoMovimentacaoEnum";
import { IMovimentacao } from "../../interfaces/IMovimentacao";
import "./ModalApagaMovimentacao.scss";
import back from '../../http';
import { MovimentacaoService } from "../../services/MovimentacaoService";


interface ModalType {
	children?: ReactNode;
	isOpen: boolean;
	tipo: TipoMovimentacaoEnum;
	closeModalRemove: () => void;
	movimentacao: IMovimentacao | null;
}

export default function ModalApagaMovimentacao(props: ModalType) {
	const movimentacaoService = new MovimentacaoService(back);
	const tipoMovimentacao = props.tipo === TipoMovimentacaoEnum.POSITIVO ? 'rendimento' : 'despesa'
	const possuiMovimentacaoEData = props?.movimentacao != undefined
		&& props.movimentacao?.dataMovimentacao != undefined;
	console.log(typeof props.movimentacao?.dataMovimentacao)
	let date = undefined;
	let id = 0;
	if (possuiMovimentacaoEData) {
		const dateString = props.movimentacao?.dataMovimentacao as string | undefined;
		date = dateString ? new Date(dateString) : undefined;
		id = props.movimentacao ? props.movimentacao.id : 0
	}
	return (
		<>
			{props.isOpen && possuiMovimentacaoEData && !!date &&(
				<div className="modal-overlay">
					<div className="modal-box">
						<div className="titulo">Apagar {tipoMovimentacao}</div>
						<div className="aviso">
							Deseja mesmo apagar a seguinte movimentação:
						</div>
						<div className="movimentacao">
							{date?.getDate().toString().padStart(2,"0")}
							/{date.getMonth() + 1}
							/{date?.getFullYear()}
						</div>
						<div className="buttons">
							<button onClick={props.closeModalRemove}>
								Cancelar
							</button>
							<button
								onClick={() => apagaMovimentacao(id)}
							>
								Apagar
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);

	function apagaMovimentacao(id: number) {
		movimentacaoService.apagaMovimentacao(id);
	}
}
