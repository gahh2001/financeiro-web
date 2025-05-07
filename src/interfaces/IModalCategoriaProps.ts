import { ReactNode } from "react";

export type IModalCategoriaProps = {
	children?: ReactNode;
	edit: boolean;
	idCategoria: number | null;
	nome: string;
	icone: string;
	corIcone: string;
	handleEditCategoria: (id: number, nome: string, icone: string, cor: string) => void;
}