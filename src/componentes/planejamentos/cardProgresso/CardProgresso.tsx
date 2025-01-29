import { InfoOutlined } from '@mui/icons-material';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { FC, Fragment, useEffect, useState } from "react";
import { planejamento } from '../../../atoms/atom';
import { TipoMovimentacaoEnum } from '../../../enums/TipoMovimentacaoEnum';
import back from '../../../http';
import { PlanejamentoService } from '../../../services/PlanejamentoService';
import { Progressos } from '../../../types/Progressos';
import './CardProgresso.scss';

const CardProgresso: FC = () => {
	let [periodo, setPeriodo] = useState<string>("");
	const [selecionado] = useAtom(planejamento);
	const planejamentoService = new PlanejamentoService(back);
	const [progressos, setProgressos] = useState<Progressos>();
	const [valorAtual, setValorAtual] = useState<number>(0);
	const [valorMaximo, setValorMaximo] = useState<number>(0);

	useEffect(() => {
		setPeriodo(
			selecionado.recorrencia === "MENSAL" ? "MES" : "ANO"
		);
		const buscaProgresso = async () => {
			const retorno = await planejamentoService.listaProgressos(selecionado.id);
			if (retorno) {
				setProgressos(retorno.data);
				console.log(retorno.data);
			}
		};
		buscaProgresso();
	}, [selecionado]);

	useEffect(() => {
		switch (periodo) {
			case "MES":
				setValorAtual(Math.floor(progressos?.mensal || 0));
				setValorMaximo(Math.floor(selecionado.valor));
				break;
			case "ANO":
				setValorAtual(Math.floor(progressos?.anual || 0));
				setValorMaximo(calculaSoma());
				break;
			case "TODO":
				setValorAtual(Math.floor(progressos?.todo || 0));
				setValorMaximo(calculaSoma());
			break;
			default:
				break;
		}
	}, [periodo, selecionado, progressos]);

	const mudarPeriodo = (event: SelectChangeEvent) => {
		const newValue = event.target.value;
		setPeriodo(newValue);
	};

	function calculaSoma(): number {
		const dayInicio = dayjs(selecionado.dataInicio);
		const dayFim = dayjs(selecionado.dataFim);
		const quantidade = dayFim.diff(dayInicio, 'month');
		if (quantidade !== undefined) {
			return Math.floor(Number(quantidade) + 1) * Number(selecionado.valor) ;
		}
		return 0;
	}

	return valorAtual !== 0 && valorMaximo !== 0 ?
		<Fragment>
			<div className="filtro-periodo-progresso">
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
							key={"MES"}
							value={"MES"}
						>
							No mês
						</MenuItem>
						<MenuItem
							key={"ANO"}
							value={"ANO"}
						>
							No ano
						</MenuItem>
						<MenuItem
							key={"TODO"}
							value={"TODO"}
						>
							todo período
						</MenuItem>
					</Select>
				</FormControl>
			</div>
			<div className="card-progresso">
				<Gauge
					value={valorAtual}
					valueMax={valorMaximo}
					startAngle={-110}
					endAngle={110}
					sx={{
						[`& .${gaugeClasses.valueText}`]: {
							fontSize: 34,
							transform: 'translate(0px, 0px)',
						},
						[`& .${gaugeClasses.valueArc}`]: {
							fill: '#52b202', //aqui eu tenho que mudar a cor conforme o valor
						}
					}}
					text={
						({ value, valueMax }) => `${value?.toLocaleString('pt-BR')} / ${valueMax?.toLocaleString('pt-BR')}`
					}
				/>
			</div>
			<div className="dica-progresso">
				<Typography>
					<InfoOutlined fontSize="small"/> Seu progresso este mês está relativamente bem encaminhado
				</Typography>
			</div>
		</Fragment>
		: <Fragment>
			<div className="nenhum-conteudo">
				Nada por aqui... Comece criando um planejamneto para acompanhar o progresso dele.
			</div>
		</Fragment>;
}

export default CardProgresso;