import { InfoOutlined } from '@mui/icons-material';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { FC, Fragment, useEffect, useState } from "react";
import { planejamento } from '../../../atoms/atom';
import { TipoMovimentacaoEnum } from '../../../enums/TipoMovimentacaoEnum';
import { PlanejamentoService } from '../../../services/PlanejamentoService';
import { Progressos } from '../../../types/Progressos';
import './CardProgresso.scss';

const CardProgresso: FC = () => {
	let [periodo, setPeriodo] = useState<string>("");
	const [selecionado] = useAtom(planejamento);
	const planejamentoService = new PlanejamentoService();
	const [progressos, setProgressos] = useState<Progressos>();
	const [valorAtual, setValorAtual] = useState<number>(0);
	const [valorMaximo, setValorMaximo] = useState<number>(0);
	const [corProgresso, setCorProgresso] = useState("");
	const [fraseProgresso, setFraseProgresso] = useState("");

	useEffect(() => {
		setPeriodo(
			selecionado?.recorrencia === "MENSAL" ? "MES" : "ANO"
		);
		const buscaProgresso = async () => {
			const retorno = await planejamentoService.listaProgressos(selecionado?.id);
			if (retorno) {
				setProgressos(retorno.data);
			}
		};
		buscaProgresso();
	}, [selecionado]);

	useEffect(() => {
		switch (periodo) {
			case "MES":
				setValorAtual(Math.floor(progressos?.mensal || 0));
				setValorMaximo(Math.floor(selecionado.valor) || 0);
				break;
			case "ANO":
				setValorAtual(Math.floor(progressos?.anual || 0));
				setValorMaximo(calculaSoma() || 0);
				break;
			case "TODO":
				setValorAtual(Math.floor(progressos?.todo || 0));
				setValorMaximo(calculaSoma() || 0);
			break;
			default:
				break;
		}
	}, [periodo, selecionado, progressos]);

	const mudarPeriodo = (event: SelectChangeEvent) => {
		const newValue = event.target.value;
		setPeriodo(newValue);
	};

	useEffect(() => {
		const porcentagem = (valorAtual * 100) / valorMaximo;
		const meta = selecionado?.tipo === "META";
		const limite = selecionado?.tipo === "LIMITE";
		if ((meta && porcentagem < 20) || (limite && porcentagem > 80)) {
			setCorProgresso("#c24141");
			setFraseProgresso(meta ? "Sua meta está baixa, bora impulsionar? 🚀" : "Atenção! você está chegando no seu limite! 🚨");
		} else if ((meta && porcentagem > 20 && porcentagem < 40) || (limite && porcentagem < 80 && porcentagem > 60)) {
			setCorProgresso("#c37c28");
			setFraseProgresso(meta ? " Você está no caminho, siga firme! 💪" : "Cuidado! Está se aproximando do limite. ⏳");
		} else if ((meta && porcentagem > 40 && porcentagem < 60) || (limite && porcentagem < 60 && porcentagem > 40)) {
			setCorProgresso("#bfb621");
			setFraseProgresso(meta ? " Ótimo progresso! Quase lá! 🎯" : "Fique atento, já usou boa parte. ⚠️");
		} else if ((meta && porcentagem > 60 && porcentagem < 80) || (limite && porcentagem < 40 && porcentagem > 20)) {
			setCorProgresso("#9cca41");
			setFraseProgresso(meta ? "Meta quase alcançada, continue assim! 🔥" : "Ainda tranquilo, continue assim! 😊");
		} else if ((meta && porcentagem > 80 && porcentagem < 100) || (limite && porcentagem < 20)) {
			setCorProgresso("#52b202");
			setFraseProgresso(meta ? "Ei..., estamos quase lá! 🏆" : "Muito bem! Você está longe do limite! ✅");
		} else if ((meta && porcentagem > 100) || (limite && porcentagem > 100)) {
			setCorProgresso("#52b202");
			setFraseProgresso(meta ? "Parabéns! Meta concluída com sucesso! 🏆👏👏" : "Hmmm... parece que você excedeu seu limite 😳");
		}
	}, [valorAtual, valorMaximo, selecionado]);

	function calculaSoma(): number {
		const dayInicio = dayjs(selecionado?.dataInicio);
		const dayFim = dayjs(selecionado?.dataFim);
		const quantidade = dayFim.diff(dayInicio, 'month');
		if (quantidade !== undefined) {
			return Math.floor(Number(quantidade) + 1) * Number(selecionado?.valor) ;
		}
		return 0;
	}

	return selecionado ?
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
						label="Ver progresso"
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
							fontSize: 28,
							transform: 'translate(0px, 0px)',
						},
						[`& .${gaugeClasses.valueArc}`]: {
							fill: corProgresso,
						}
					}}
					text={
						({ value, valueMax }) => `${value?.toLocaleString('pt-BR')} / ${valueMax?.toLocaleString('pt-BR')}`
					}
				/>
			</div>
			{fraseProgresso !== ""
				? <div className="dica-progresso">
					<Typography>
						<InfoOutlined fontSize="small"/> {fraseProgresso}
					</Typography>
				</div>
				: <></>
			}
		</Fragment>
		: <Fragment>
			<div className="nenhum-conteudo">
				Nada por aqui... Comece criando um planejamneto para acompanhar o progresso dele.
			</div>
		</Fragment>;
}

export default CardProgresso;