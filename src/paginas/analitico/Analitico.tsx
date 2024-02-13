import NavBar from "../../componentes/AppBar/AppBar";
import CategoriasComparacao from "../../componentes/analitico/categoriasComparacao/CategoriasComparacao";
import CategoriasEvolucao from "../../componentes/analitico/categoriasEvolucao/CategoriasEvolucao";
import CategoriasInformacoesGerais from "../../componentes/analitico/categoriasInformacoesGerais/CategoriasInformacoesGerais";
import CategoriasPorcentagem from "../../componentes/analitico/categoriasPorcentagem/CategoriasPorcentagem";
import CategoriasVisaoGeral from "../../componentes/analitico/categoriasVisaoGeral/CategoriasVisaoGeral";
import FiltersAnalitic from "../../componentes/analitico/filtersAnalitc/FiltersAnalitc";
import './Analitico.scss';

export const Analitico = () => {

	return (
		<div className="analitico">
			<NavBar modulo="Analítico"/>
			<div className="top-section">
				<FiltersAnalitic/>
				<CategoriasVisaoGeral/>
				<CategoriasPorcentagem/>
			</div>
			<div className="down-section">
				<CategoriasComparacao/>
				<CategoriasEvolucao/>
				<CategoriasInformacoesGerais/>
			</div>
		</div>
	);
}

export default Analitico;