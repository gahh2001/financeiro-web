import { Divider } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import AppBar from "../../componentes/AppBar/AppBar";
import { TipoMovimentacaoEnum } from "../../enums/TipoMovimentacaoEnum";
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import './Movimentacoes.scss';
import FiltrosMovimentacoes from "./componentes/FiltrosMovimentacoes";
import ListaMovimentacoes from "./componentes/ListaMovimentacoes";
import { useNavigate } from "react-router-dom";

const Movimentacoes: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
	const [dataInicio, setDataInicio] = useState<Dayjs | null>(() => {
		const inicioMes = new Date();
		inicioMes.setDate(1);
		return dayjs(inicioMes);
	});
	const [dataFim, setDataFim] = useState<Dayjs | null>(() => {
		const fimMes = new Date();
		fimMes.setMonth(fimMes.getMonth() + 1);
		fimMes.setDate(0);
		return dayjs(fimMes);
	});
	const [tipo, setTipo] = useState<string>(TipoMovimentacaoEnum.TODOS.toString());
	const [categorias, setCategorias] = useState(["Todas"]);
	const isMounted = useRef(true);
	const navigate = useNavigate();

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

	useEffect(() => {
		if (!props.googleId && isMounted.current) {
			navigate("/login")
		}
	}, [props.googleId]);

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
					<ListaMovimentacoes
						categorias={categorias}
						dataInicio={dataInicio}
						dataFim={dataFim}
						googleId={props.googleId}
						tipo={tipo}
					/>
				</div>
			</div>
		</Fragment>
	);
}

export default Movimentacoes;