import { ReactNode } from "react";
import "./ModalAddMovimentacao.scss";

interface ModalType {
	children?: ReactNode;
	isOpen: boolean;
	tipo: string;
	toggle: () => void;
}

export default function ModalAddMovimentacao(props: ModalType) {
	return (
		<>
			{props.isOpen && ( /* Renderiza o conteúdo somente se isOpen for true */
				<div className="modal-overlay">
					<div className="modal-box">
						<div className="titulo">Adicionar Rendimento</div>
					</div>
				</div>
			)}
		</>
	);
}
