import { Divider } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "../../componentes/AppBar/AppBar";
import DialogDescricaoMovimentacao from "../../componentes/home/informacoesDoDiaCard/dialogDescricaoMovimentacao/DialogDescricaoMovimentacao";
import { TipoMovimentacaoEnum } from "../../enums/TipoMovimentacaoEnum";
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import './Movimentacoes.scss';
import FiltrosMovimentacoes from "./componentes/FiltrosMovimentacoes";
import ListaMovimentacoes from "./componentes/ListaMovimentacoes";

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
	const [isOpenDialogDescricao, setIsOpenDialogDescricao] = useState(false);
	const [descricao, setDescricao] = useState("");
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
	const propsDialogDescricao = (description: string) => {
		setIsOpenDialogDescricao(true);
		setDescricao(description);
	}
	const closeDialogDescricao = () => {
		setIsOpenDialogDescricao(false);
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
						dialogDescricao={(description) => propsDialogDescricao(description)}
					/>
					<Divider orientation="vertical"/>
					<ListaMovimentacoes
						categorias={categorias}
						dataInicio={dataInicio}
						dataFim={dataFim}
						googleId={props.googleId}
						tipo={tipo}
						dialogDescricao={(description) => propsDialogDescricao(description)}
					/>
				</div>
			</div>
			<DialogDescricaoMovimentacao
				openDialog={isOpenDialogDescricao}
				description={descricao}
				onClose={closeDialogDescricao}
			/>
		</Fragment>
	);
}

export default Movimentacoes;