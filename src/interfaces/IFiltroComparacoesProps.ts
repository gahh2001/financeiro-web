
export type IFiltroComparacoesProps = {
	tipoMovimentacao: string[];
	tipoComparacao: string;
	setCategoriasComparacao: (tipo: string[]) => void;
	setTipoComparacao: (tipo: string) => void;
}