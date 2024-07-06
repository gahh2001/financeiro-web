import { ReactNode } from "react";

export type IModalCategoriaProps = {
	children?: ReactNode;
	closeModal: () => void;
	isOpen: boolean;
	edit: boolean;
	idCategoria: number | null;
	nome: string;
	icone: string;
	corIcone: string;
	googleId: string | null;
	handleEditCategoria: (id: number, nome: string, icone: string, cor: string) => void;
}