import { Divider } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { FC, Fragment, useState } from "react";
import AppBar from "../../componentes/AppBar/AppBar";
import { TipoMovimentacaoEnum } from "../../enums/TipoMovimentacaoEnum";
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import './Movimentacoes.scss';
import FiltrosMovimentacoes from "./componentes/FiltrosMovimentacoes";

const Movimentacoes: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
	const [dataInicio, setDataInicio] = useState<Dayjs | null>(dayjs());
	const [dataFim, setDataFim] = useState<Dayjs | null>(dayjs());
	const [tipo, setTipo] = useState<string>(TipoMovimentacaoEnum.TODOS.toString());
	const [categorias, setCategorias] = useState(["Todas"]);

	const setDataInicioProps = (newValue: Dayjs | null) => {
		setDataInicio(newValue);
	}
	const setDataFimProps = (newValue: Dayjs | null) => {
		setDataFim(newValue);
	}
	const setCategoriasProps = (value: string[]) => {
		setCategorias(value);
	}
	const setTipoProps = (value: string) => {
		setTipo(value);
	}

	return (
		<Fragment>
			<AppBar
				modulo="Movimentações"
				urlPicture={props.urlPicture}
				setId={props.setId}
				setPicture={props.setPicture}
			/>
			<div className="movimentacoes">
				<div className="card">
					<FiltrosMovimentacoes
						categorias={categorias}
						setCategorias={setCategoriasProps}
						dataInicio={dataInicio}
						setDataInicio={setDataInicioProps}
						dataFim={dataFim}
						setDataFim={setDataFimProps}
						googleId={props.googleId}
						tipo={tipo}
						setTipo={setTipoProps}
					/>
					<Divider orientation="vertical"/>
					
				</div>
			</div>
		</Fragment>
	);
}

export default Movimentacoes;