import { ReactNode } from "react";

export type IModalCategoriaProps = {
	children?: ReactNode;
	edit: boolean;
	idCategoria: number | null;
	nome: string;
	icone: string;
	corIcone: string;
	valorPadrao: string;
	handleEditCategoria: (id: number, nome: string, icone: string, cor: string, valorPadrao: number) => void;
}