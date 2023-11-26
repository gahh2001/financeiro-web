import { ReactNode, useState } from "react";
import "./ModalAddMovimentacao.scss";
import BasicDatePicker from "../DatePicker/BasicDatePicker";
import { TipoMovimentacaoEnum } from "../../enums/TipoMovimentacaoEnum";

interface ModalType {
	children?: ReactNode;
	isOpen: boolean;
	tipo: TipoMovimentacaoEnum;
	closeModal: () => void;
	date: Date;
}

export default function ModalAddMovimentacao(props: ModalType) {
	//const [selectedDate, setSelectedDate] = useState(props.date)
	const tipoMovimentacao = props.tipo == TipoMovimentacaoEnum.POSITIVO ? 'rendimento' : 'despesa'
	return (
		<>
			{props.isOpen && (
				<div className="modal-overlay">
					<div className="modal-box">
						<div className="titulo">Adicionar {tipoMovimentacao}</div>
						<div className="date-picker">
							<BasicDatePicker/>
						</div>
						<div className="buttons">
							<button onClick={props.closeModal}>
								Cancelar
							</button>
							<button>
								Salvar
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
