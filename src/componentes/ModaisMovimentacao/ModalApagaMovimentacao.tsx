import { ReactNode } from "react";
import { TipoMovimentacaoEnum } from "../../enums/TipoMovimentacaoEnum";
import { IMovimentacao } from "../../interfaces/IMovimentacao";
import "./ModalApagaMovimentacao.scss";

interface ModalType {
	children?: ReactNode;
	isOpen: boolean;
	tipo: TipoMovimentacaoEnum;
	closeModalRemove: () => void;
	movimentacao: IMovimentacao | null;
}

export default function ModalApagaMovimentacao(props: ModalType) {
	const tipoMovimentacao = props.tipo === TipoMovimentacaoEnum.POSITIVO ? 'rendimento' : 'despesa'
	const possuiMovimentacao = props?.movimentacao != undefined
		&& props.movimentacao?.dataMovimentacao != undefined;
	console.log(props.movimentacao?.dataMovimentacao.getDate())
	return (
		<>
			{props.isOpen && possuiMovimentacao && (
				<div className="modal-overlay">
					<div className="modal-box">
						<div className="titulo">Apagar {tipoMovimentacao}</div>
						<div className="aviso">
							Deseja mesmo apagar a seguinte movimentação:
						</div>
						<div className="movimentacao">
							{props.movimentacao?.dataMovimentacao.getDate()}
							/{props.movimentacao
								? props.movimentacao.dataMovimentacao.getMonth() + 1
								: null}
							/{props.movimentacao?.dataMovimentacao.getFullYear()}
						</div>
						<div className="buttons">
							<button onClick={props.closeModalRemove}>
								Cancelar
							</button>
							<button>
								Apagar
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
