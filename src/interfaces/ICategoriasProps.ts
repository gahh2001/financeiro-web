import { CategoriaMovimentacao } from "../types/CategoriaMovimentacao";

export type ICategoriasProps = {
	categorias: CategoriaMovimentacao[];
	handleAddCategoria: () => void;
}