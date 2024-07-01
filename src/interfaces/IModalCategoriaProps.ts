import { ReactNode } from "react";

export type IModalCategoriaProps = {
	children?: ReactNode;
	closeModal: () => void;
	isOpen: boolean;
}