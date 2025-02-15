import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useAtom } from 'jotai';
import { FC, Fragment, useEffect, useState } from "react";
import { planejamento } from '../../../atoms/atom';
import { obtemNumeroEnum } from '../../../enums/TipoComparacaoEnum';
import { TipoMovimentacaoEnum } from '../../../enums/TipoMovimentacaoEnum';
import { useBack } from '../../../http';
import { PlanejamentoService } from '../../../services/PlanejamentoService';
import { Desempenho } from '../../../types/Desempenho';
import './CardDesempenho.scss';

const CardDesempenho: FC = () => {
	const planejamentoService = new PlanejamentoService(useBack());
	const [selecionado] = useAtom(planejamento);
	const [periodo, setPeriodo] = useState<string>("TRESMESES")
	const [meses, setMeses] = useState<string[]>([]);
	const [limite, setLimite] = useState(Array(obtemNumeroEnum(periodo)).fill(selecionado?.valor));
	const [desempenhos, setDesempenhos] = useState<(number | null)[]>([]);
	const [retorno, setRetorno] = useState<Desempenho[]>([]);

	const mudarPeriodo = (event: SelectChangeEvent) => {
		const newValue = event.target.value;
		setPeriodo(newValue);
		
	};

	useEffect(() => {
		const atualizaDesempenho = async () => {
			if (selecionado && selecionado.id) {
				const retorno = await planejamentoService.listaDesempenho(selecionado.id);
				if (retorno) {
					setRetorno(retorno.data);
					processaDesempenhos(retorno.data);
				}
			}
		};
		atualizaDesempenho();
		setLimite(Array(obtemNumeroEnum(periodo)).fill(selecionado?.valor));
	}, [selecionado]);

	useEffect(() => {
		processaDesempenhos(retorno);
		setLimite(Array(obtemNumeroEnum(periodo)).fill(selecionado?.valor));
	}, [periodo]);

	return (
		<Fragment>
			<div className="filtro-periodo-desempenho">
				<FormControl
					sx={{width: '23vh'}}
					size="small"
				>
					<InputLabel
						id="movimentacoes"
					>
						Ver progresso
					</InputLabel>
					<Select
						id="select-movimentacoes"
						value={periodo}
						onChange={mudarPeriodo}
						defaultValue={TipoMovimentacaoEnum.POSITIVO.toString()}
					>
						<MenuItem
							key={"TRESMESES"}
							value={"TRESMESES"}
						>
							Últimos 3 meses
						</MenuItem>
						<MenuItem
							key={"SEISMESES"}
							value={"SEISMESES"}
						>
							Últimos 6 meses
						</MenuItem>
						<MenuItem
							key={"DOZEMESES"}
							value={"DOZEMESES"}
						>
							Últimos 12 meses
						</MenuItem>
					</Select>
				</FormControl>
			</div>
			{meses.length && meses.length === limite.length ?
			<div className="card-desempenho">
				<LineChart
					xAxis={[
						{ scaleType: 'band', data: meses, id: 'barCategories', }
					]}
					series={[
						{
							data: limite,
							label: selecionado?.tipo === 'META' ? "Meta" : "Limite",
							color: selecionado?.tipo === 'META' ? "#42B84A" : "#AD4331"
						},
						{ data: desempenhos, label: 'Atingido' },
					]}
					margin={{
						left: 50,
						right: 10,
						top: 50,
						bottom: 25,
					}}
				/>
			</div>
			: <></> }
		</Fragment>);

	function processaDesempenhos(lista: Desempenho[]) {
		let contatdorMeses = obtemNumeroEnum(periodo) - 1;
		let valores = [];
		let meses = [];
		while (contatdorMeses >= 0) {
			let mesverificado = new Date();
			mesverificado.setMonth(mesverificado.getUTCMonth() - contatdorMeses);
			meses.push(mesverificado.getUTCMonth() + 1 + "/" + mesverificado.getUTCFullYear())
			let valorDoMesEncontrado = lista.find(desempenho =>
				new Date(desempenho.data).getUTCMonth() === mesverificado.getUTCMonth() &&
				new Date(desempenho.data).getUTCFullYear() === mesverificado.getUTCFullYear()
			)
			let valorEncontrado = valorDoMesEncontrado ? valorDoMesEncontrado.valor : null;
			valores.push(valorEncontrado);
			contatdorMeses--;
		}
		setDesempenhos(valores);
		setMeses(meses);
	}
}

export default CardDesempenho;