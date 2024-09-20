import { ICategoriaMovimentacao } from "./ICategoriaMovimentacao";

export type ICategoriasProps = {
	googleId: string | null;
	categorias: ICategoriaMovimentacao[];
	handleAddCategoria: () => void;
}