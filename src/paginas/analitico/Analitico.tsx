import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import NavBar from "../../componentes/AppBar/AppBar";
import CategoriasComparacao from "../../componentes/analitico/categoriasComparacao/CategoriasComparacao";
import CategoriasEvolucao from "../../componentes/analitico/categoriasEvolucao/CategoriasEvolucao";
import CategoriasInformacoesGerais from "../../componentes/analitico/categoriasInformacoesGerais/CategoriasInformacoesGerais";
import CategoriasPorcentagem from "../../componentes/analitico/categoriasPorcentagem/CategoriasPorcentagem";
import CategoriasVisaoGeral from "../../componentes/analitico/categoriasVisaoGeral/CategoriasVisaoGeral";
import FiltersAnalitic from "../../componentes/analitico/filtersAnalitc/FiltersAnalitc";
import { TipoComparacaoEnum } from "../../enums/TipoComparacaoEnum";
import { TipoMovimentacaoEnum } from "../../enums/TipoMovimentacaoEnum";
import back from "../../http";
import { IFatia } from "../../interfaces/IFatia";
import { ISomaCategoriasPorMes } from "../../interfaces/ISomaCategoriasPorMes";
import { CategoriaMovimentacaoService } from "../../services/CategoriaMovimentacaoService";
import './Analitico.scss';

export const Analitico = () => {
	const [ano, setAno] = useState<Dayjs | null>(dayjs(new Date().getTime()));
	const [mes, setMes] = useState<Dayjs | null>(ano);
	const [tipoMovimentacao, setTipoMovimentacao] = useState(TipoMovimentacaoEnum.POSITIVO.toString());
	const [tipoComparacao, setTipoComparacao] = useState(TipoComparacaoEnum.TRESMESES.toString())
	const [fullYear, setFullYear] = useState(false);
	const [nomeCategorias, setNomeCategorias] = useState<string[]>([]);
	const [somaCategorias, setSomaCategorias] = useState<number[]>([]);
	const [porcentagens, setPorcentagens] = useState<IFatia[]>([]);
	const propsSetMes = (date: Dayjs | null) => {
		setMes(date);
	};
	const propsSetAno = (date: Dayjs | null) => {
		setAno(date);
	};
	const propsSetFullYear = (full: boolean) => {
		setFullYear(full);
	};
	const propsSetTipoMovimentacao = (tipo: string) => {
		setTipoMovimentacao(tipo);
	};
	const propsSetTipoComparacao = (tipo: string) => {
		setTipoComparacao(tipo);
	};

	useEffect(() => {
		const atualizaVisaoGeral = async () => {
			try {
				const categoriaMovimentacaoService = new CategoriaMovimentacaoService(back);
				const soma = await categoriaMovimentacaoService
					.obtemSomaCategoriasEValores(1, obtemDataInicial(), obtemDataFinal(), tipoMovimentacao);
				if (soma?.data) {
					extraiSomas(soma.data);
					extraiPorcentagens(soma.data);
				}
			} catch (error) {
				console.log("erro ao obter a soma por categorias ", error);
			}
		};
		atualizaVisaoGeral();
	}, [ano, mes, tipoMovimentacao, fullYear]);

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
					setAno={propsSetAno}
					setMes={propsSetMes}
					setFullYear={propsSetFullYear}
					setTipoMovimentacao={propsSetTipoMovimentacao}
					setTipoComparacao={propsSetTipoComparacao}
				/>
				<CategoriasVisaoGeral
					nomeCategorias={nomeCategorias}
					somaCategorias={somaCategorias}
					tipoMovimentacao={tipoMovimentacao}
				/>
				<CategoriasPorcentagem
					fatias={porcentagens}
				/>
			</div>
			<div className="down-section">
				<CategoriasComparacao/>
				<CategoriasEvolucao/>
				<CategoriasInformacoesGerais/>
			</div>
		</div>
	);

	function obtemDataInicial() {
		if (fullYear &&  ano) {
			const primeiroDiaAno = ano.toDate();
			primeiroDiaAno.setDate(1);
			primeiroDiaAno.setMonth(0);
			return primeiroDiaAno.getTime();
		}
		if (mes) {
			const inicioMes = mes.toDate();
			inicioMes.setDate(1);
			return inicioMes.getTime();
		}
		return 0;
	}

	function obtemDataFinal() {
		if (fullYear && ano) {
			const ultimoDiaAno = ano.toDate();
			ultimoDiaAno.setMonth(12);
			ultimoDiaAno.setDate(0);
			return ultimoDiaAno.getTime();
		}
		if (mes) {
			const fimMes = mes.toDate();
			fimMes.setMonth(fimMes.getMonth() + 1);
			fimMes.setDate(0);
			return fimMes.getTime();
		}
		return 0;
	}

	function extraiSomas(lista: ISomaCategoriasPorMes[]) {
		const categorias: string[] = [];
		const somas: number[] = [];
		lista.forEach((soma) => {
			categorias.push(soma.nomeCategoria);
			somas.push(soma.somaMovimentacao);
		});
		setNomeCategorias(categorias);
		setSomaCategorias(somas);
	}

	function extraiPorcentagens(lista: ISomaCategoriasPorMes[]) {
		const total : number = lista.reduce((total, item) => total + item.somaMovimentacao, 0);
		const porcentagens: IFatia[] = [];
		let id = 0
		lista.forEach((soma) => {
			const fatia: IFatia = {
				id: id + 1,
				value: soma.somaMovimentacao,
				label: soma.nomeCategoria,
			}
			id++;
			porcentagens.push(fatia);
		})
		setPorcentagens(porcentagens);
	}
}

export default Analitico;