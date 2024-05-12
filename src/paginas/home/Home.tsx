import { ThemeProvider, createTheme } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "../../componentes/AppBar/AppBar";
import Calendario from "../../componentes/home/calendario/Calendario";
import InformacoesDoDia from "../../componentes/home/informacoesDoDiaCard/InformacoesDoDia";
import DialogDescricaoMovimentacao from "../../componentes/home/informacoesDoDiaCard/dialogDescricaoMovimentacao/DialogDescricaoMovimentacao";
import InformacoesDoMes from "../../componentes/home/informacoesDoMesCard/InformacoesDoMes";
import ModalAddMovimentacao from "../../componentes/home/modalAddMovimentacao/ModalAddMovimentacao";
import useModalAddMovimentacao from "../../componentes/home/modalAddMovimentacao/UseModalAddMovimentacao";
import ModalApagaMovimentacao from "../../componentes/home/modalRemoveMovimentacao/ModalApagaMovimentacao";
import useModalRemoveMovimentacao from "../../componentes/home/modalRemoveMovimentacao/UseModalRemoveMovimentacao";
import { TipoMovimentacaoEnum } from '../../enums/TipoMovimentacaoEnum';
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import { IMovimentacao } from "../../interfaces/IMovimentacao";
import './Home.module.scss';

const Home: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [idMovimentacao, setIdMovimentacao] = useState<number | undefined>(undefined);
	const [data, setData] = useState(new Date());
	const [categoria, setCategoria] = useState("");
	const [valor, setValor] = useState("");
	const [descricao, setDescricao] = useState("");
	const [edit, setEdit] = useState(false);
	const {isOpenModalAdd, closeModalAdd} = useModalAddMovimentacao();
	const {isOpenModalRemove, closeModalRemove} = useModalRemoveMovimentacao();
	const [isOpenDialogDescricao, setIsOpenDialogDescricao] = useState(false);
	const [tipo, setTipo] = useState(TipoMovimentacaoEnum.POSITIVO);
	const [movimentacaoApagar, setMovimentacaoApagar] = useState<IMovimentacao | null>(null);
	const isMounted = useRef(true);
	const navigate = useNavigate();

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		if (!props.googleId && isMounted.current) {
			navigate("/login")
		}
	}, [props.googleId])

	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	const propsCalendario = (date: Date) => {
		setSelectedDate(date);
	};
	const propsModalAddRendimento = () => {
		setTipo(TipoMovimentacaoEnum.POSITIVO);
		setEdit(false);
		closeModalAdd();
	}
	const propsModalAddDespesa = () => {
		setTipo(TipoMovimentacaoEnum.NEGATIVO);
		setEdit(false);
		closeModalAdd();
	}
	const propsModalApagaRendimento = (movimentacaoApagar: IMovimentacao) => {
		movimentacaoApagar.tipoMovimentacao.toUpperCase() === TipoMovimentacaoEnum.POSITIVO
			? setTipo(TipoMovimentacaoEnum.POSITIVO)
			: setTipo(TipoMovimentacaoEnum.NEGATIVO);
		closeModalRemove();
		setMovimentacaoApagar(movimentacaoApagar);
	}

	const propsDialogDescricao = (description: string) => {
		setIsOpenDialogDescricao(true);
		setDescricao(description);
	}

	const closeDialogDescricao = () => {
		setIsOpenDialogDescricao(false);
	}

	const handleEditMovimentacao = (idMovimentacao: number | undefined, data: Date, valor: string,
			categoria: string, descricao: string, tipo: TipoMovimentacaoEnum) => {
		setIdMovimentacao(idMovimentacao)
		setEdit(true)
		setTipo(tipo)
		setData(data);
		setCategoria(categoria);
		setValor(valor);
		setDescricao(descricao);
		closeModalAdd();
	}

	return (
		<div className="home">
			<ThemeProvider theme={darkTheme}>
				<AppBar
					modulo="Home"
					urlPicture={props.urlPicture}
				/>
				<div style={{ display: 'flex', height: "93.3vh" }}>
					<div style={{
						flexDirection: 'column',
						display: 'flex',
						flex: "0.7"
					}}>
						<Calendario
							googleId={props.googleId}
							onDayClick={propsCalendario}
							closeModalAdd={closeModalAdd}
							closeModalRemove={closeModalRemove}
						/>
						<InformacoesDoMes
							googleId={props.googleId}
							selectedDate={selectedDate}
							modalAddRendimento={propsModalAddRendimento}
							modalAddDespesa={propsModalAddDespesa}
							modalApagaMovimentacao={propsModalApagaRendimento}
						/>
					</div>
					<div style={{flex: "0.3", display: "flex"}}>
						<InformacoesDoDia
							googleId={props.googleId}
							selectedDate={selectedDate}
							modalAddRendimento={propsModalAddRendimento}
							modalAddDespesa={propsModalAddDespesa}
							modalApagaMovimentacao={propsModalApagaRendimento}
							dialogDescricao={(description) => propsDialogDescricao(description)}
							handleEditMovimentacao={handleEditMovimentacao}
						/>
					</div>
				</div>
				<ModalAddMovimentacao
					googleId={props.googleId}
					isOpen={isOpenModalAdd}
					closeModal={closeModalAdd}
					tipo= {tipo}
					edit={edit}
					idMovimentacao={idMovimentacao}
					date={data}
					categoria={categoria}
					valor={valor}
					descricao={descricao}
					selectedDate={selectedDate}
				/>
				<ModalApagaMovimentacao
					googleId={props.googleId}
					isOpen={isOpenModalRemove}
					tipo={tipo}
					closeModalRemove={closeModalRemove}
					movimentacao={movimentacaoApagar}
				/>
				<DialogDescricaoMovimentacao
					openDialog={isOpenDialogDescricao}
					description={descricao}
					onClose={closeDialogDescricao}
				/>
			</ThemeProvider>
		</div>
	);
}

export default Home;