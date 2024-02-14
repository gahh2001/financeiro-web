import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import NavBar from "../../componentes/AppBar/AppBar";
import CategoriasComparacao from "../../componentes/analitico/categoriasComparacao/CategoriasComparacao";
import CategoriasEvolucao from "../../componentes/analitico/categoriasEvolucao/CategoriasEvolucao";
import CategoriasInformacoesGerais from "../../componentes/analitico/categoriasInformacoesGerais/CategoriasInformacoesGerais";
import CategoriasPorcentagem from "../../componentes/analitico/categoriasPorcentagem/CategoriasPorcentagem";
import CategoriasVisaoGeral from "../../componentes/analitico/categoriasVisaoGeral/CategoriasVisaoGeral";
import FiltersAnalitic from "../../componentes/analitico/filtersAnalitc/FiltersAnalitc";
import { TipoComparacaoEnum } from "../../enums/TipoComparacaoEnum";
import { TipoMovimentacaoEnum } from "../../enums/TipoMovimentacaoEnum";
import './Analitico.scss';

export const Analitico = () => {
	const [ano, setAno] = useState<Dayjs | null>(dayjs(new Date().getTime()));
	const [mes, setMes] = useState<Dayjs | null>(dayjs(new Date().getTime()));
	const [tipoMovimentacao, setTipomovimentacao] = useState(TipoMovimentacaoEnum.POSITIVO.toString());
	const [tipoComparacao, setTipoComparacao] = useState(TipoComparacaoEnum.TRESMESES.toString())
	const [fullYear, setFullYear] = useState(false);

	return (
		<div className="analitico">
			<NavBar modulo="Analítico"/>
			<div className="top-section">
				<FiltersAnalitic
					ano={ano}
					mes={mes}
					tipoMovimentacao={tipoMovimentacao}
					tipoComparacao={tipoComparacao}
					fullYear={fullYear}
				/>
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