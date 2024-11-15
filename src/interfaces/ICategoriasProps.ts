import { ICategoriaMovimentacao } from "./ICategoriaMovimentacao";

export type ICategoriasProps = {
	categorias: ICategoriaMovimentacao[];
	handleAddCategoria: () => void;
}