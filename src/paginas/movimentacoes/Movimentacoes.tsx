import dayjs, { Dayjs } from "dayjs";
import { useAtom } from "jotai";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { accessToken } from "../../atoms/atom";
import AppBar from "../../componentes/AppBar/AppBar";
import Dica from "../../componentes/dicas/Dica";
import Footer from "../../componentes/footer/Footer";
import DialogDescricaoMovimentacao from "../../componentes/home/informacoesDoDiaCard/dialogDescricaoMovimentacao/DialogDescricaoMovimentacao";
import FiltrosMovimentacoes from "../../componentes/movimentacoes/FiltrosMovimentacoes";
import ListaMovimentacoes from "../../componentes/movimentacoes/ListaMovimentacoes";
import { TipoMovimentacaoEnum } from "../../enums/TipoMovimentacaoEnum";
import './Movimentacoes.scss';

const Movimentacoes: FC = () => {
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
	const [openDicaMovimentacao, setOpenDicaMovimentacao] = useState(localStorage.getItem('dicaMovimentacao') !== "ok");
	const [isOpenDialogDescricao, setIsOpenDialogDescricao] = useState(false);
	const [descricao, setDescricao] = useState("");
	const [tipo, setTipo] = useState<string>(TipoMovimentacaoEnum.TODOS.toString());
	const [categorias, setCategorias] = useState(["Todas"]);
	const [accessTokenAtom] = useAtom(accessToken);
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
		if (!accessTokenAtom && isMounted.current) {
			navigate("/login")
		}
	}, [accessTokenAtom]);

	return (
		<Fragment>
			<AppBar
				modulo="Movimentações"
			/>
			<div className="movimentacoes">
				<Dica
					frase='Aqui você pode visualizar todas as suas movimentações, filtrando por períodos, tipo e categoria'
					codigo="dicaMovimentacao"
					open={openDicaMovimentacao}
					setOpen={setOpenDicaMovimentacao}
				/>
				<div className="card">
					<FiltrosMovimentacoes
						categorias={categorias}
						setCategorias={setCategoriasProps}
						dataInicio={dataInicio}
						setDataInicio={setDataInicioProps}
						dataFim={dataFim}
						setDataFim={setDataFimProps}
						tipo={tipo}
						setTipo={setTipoProps}
						dialogDescricao={(description) => propsDialogDescricao(description)}
					/>
					<ListaMovimentacoes
						categorias={categorias}
						dataInicio={dataInicio}
						dataFim={dataFim}
						tipo={tipo}
						dialogDescricao={(description) => propsDialogDescricao(description)}
					/>
				</div>
			</div>
			<Footer/>
			<DialogDescricaoMovimentacao
				openDialog={isOpenDialogDescricao}
				description={descricao}
				onClose={closeDialogDescricao}
			/>
		</Fragment>
	);
}

export default Movimentacoes;