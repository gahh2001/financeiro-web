import { ReactNode, useState } from "react";
import "./ModalAddMovimentacao.scss";

interface ModalType {
	children?: ReactNode;
	isOpen: boolean;
	tipo: string;
	toggle: () => void;
	date: Date;
}

export default function ModalAddMovimentacao(props: ModalType) {
	const [selectedDate, setSelectedDate] = useState(props.date)
	return (
		<>
			{props.isOpen && (
				<div className="modal-overlay">
					<div className="modal-box">
						<div className="titulo">Adicionar Rendimento</div>
						<div className="buttons">
							<button onClick={props.toggle}>
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
