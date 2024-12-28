import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FC } from "react";
import { TipoComparacaoEnum } from "../../../enums/TipoComparacaoEnum";
import { TipoMovimentacaoEnum } from "../../../enums/TipoMovimentacaoEnum";
import { IFiltroComparacoesProps } from "../../../interfaces/IFiltroComparacoesProps";
import './FiltroData.scss';

const FiltroComparacoes: FC<IFiltroComparacoesProps> = (props: IFiltroComparacoesProps) => {

	const handleChangeMovimentacao = (event: SelectChangeEvent) => {
		const newValue = event.target.value;
		props.setTipoMovimentacao(newValue);
	};
	const handleChangeComparacao = (event: SelectChangeEvent) => {
		const newValue = event.target.value;
		props.setTipoComparacao(newValue);
	};

	return (
		<div className="card-filters">
			<div className="filter">
				<FormControl
					sx={{m: 1, width: '23vh'}}
					size="small"
				>
					<InputLabel
						id="movimentacoes"
					>
						Movimentações
					</InputLabel>
					<Select
						id="select-movimentacoes"
						value={props.tipoMovimentacao}
						onChange={handleChangeMovimentacao}
						defaultValue={TipoMovimentacaoEnum.POSITIVO.toString()}
					>
						<MenuItem
							key={"POSITIVAS"}
							value={TipoMovimentacaoEnum.POSITIVO.toString()}
						>
							Rendimentos
						</MenuItem>
						<MenuItem
							key={"NEGATIVAS"}
							value={TipoMovimentacaoEnum.NEGATIVO.toString()}
						>
							Despesas
						</MenuItem>
					</Select>
				</FormControl>
			</div>
			<div className="filter">
				<FormControl
					sx={{m: 1, width: '23vh'}}
					size="small"
				>
					<InputLabel
						id="comparacao"
					>
						Comparação
					</InputLabel>
					<Select
						id="select-comparacao"
						value={props.tipoComparacao}
						onChange={handleChangeComparacao}
						defaultValue={TipoComparacaoEnum.TRESMESES.toString()}
					>
						<MenuItem
							key={"3"}
							value={TipoComparacaoEnum.TRESMESES.toString()}
						>
							Ùltimos 3 meses
						</MenuItem>
						<MenuItem
							key={"6"}
							value={TipoComparacaoEnum.SEISMESES.toString()}
						>
							Ùltimos 6 meses
						</MenuItem>
						<MenuItem
							key={"12"}
							value={TipoComparacaoEnum.UMANO.toString()}
						>
							Ùltimos 12 meses
						</MenuItem>
					</Select>
				</FormControl>
			</div>
		</div>
	)
}

export default FiltroComparacoes;