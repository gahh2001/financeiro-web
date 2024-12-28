import { useAtom } from "jotai";
import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleIdAtom } from "../../atoms/atom";
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
	const [movimentacoesDoMes, setMovimentacoesDoMes] = useState<IMovimentacao[]>([]);
	const [edit, setEdit] = useState(false);
	const {isOpenModalAdd, closeModalAdd} = useModalAddMovimentacao();
	const {isOpenModalRemove, closeModalRemove} = useModalRemoveMovimentacao();
	const [isOpenDialogDescricao, setIsOpenDialogDescricao] = useState(false);
	const [tipo, setTipo] = useState(TipoMovimentacaoEnum.POSITIVO);
	const [movimentacaoApagar, setMovimentacaoApagar] = useState<IMovimentacao | null>(null);
	const [visivel, setVisivel] = useState(false);
	const isMounted = useRef(true);
	const navigate = useNavigate();
	const [googleId] = useAtom(googleIdAtom);

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		if (!googleId && isMounted.current) {
			navigate("/login")
		}
	}, [googleId]);

	const propsMovimentcoesMes = (movimentacoes: IMovimentacao[]) => {
		setMovimentacoesDoMes(movimentacoes)
	}
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
	const setVisible = () => {
		setVisivel(!visivel);
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
			<AppBar
				modulo="Home"
				urlPicture={props.urlPicture}
				setId={props.setId}
				setPicture={props.setPicture}
			/>
			<div style={{ display: 'flex', height: "93.3vh", marginTop: '6.5vh' }}>
				<div style={{
					flexDirection: 'column',
					display: 'flex',
					flex: "0.7"
				}}>
					<Calendario
						isOpenModalAdd={isOpenModalAdd}
						isOpenModalRemove={isOpenModalRemove}
						onDayClick={propsCalendario}
						atualizaMovimentacoesMes={propsMovimentcoesMes}
						movimentacoesMes={movimentacoesDoMes}
					/>
					<InformacoesDoMes
						selectedDate={selectedDate}
						movimentacoesMes={movimentacoesDoMes}
						modalAddRendimento={propsModalAddRendimento}
						modalAddDespesa={propsModalAddDespesa}
						modalApagaMovimentacao={propsModalApagaRendimento}
						visivel={visivel}
					/>
				</div>
				<div style={{flex: "0.3", display: "flex"}}>
					<InformacoesDoDia
						selectedDate={selectedDate}
						movimentacoesMes={movimentacoesDoMes}
						isOpenModalAdd={isOpenModalAdd}
						isOpenModalRemove={isOpenModalRemove}
						modalAddRendimento={propsModalAddRendimento}
						modalAddDespesa={propsModalAddDespesa}
						modalApagaMovimentacao={propsModalApagaRendimento}
						dialogDescricao={(description) => propsDialogDescricao(description)}
						handleEditMovimentacao={handleEditMovimentacao}
						setVisible={setVisible}
						visivel={visivel}
					/>
				</div>
			</div>
			<ModalAddMovimentacao
				isOpen={isOpenModalAdd}
				tipo= {tipo}
				edit={edit}
				idMovimentacao={idMovimentacao}
				date={data}
				categoria={categoria}
				valor={valor}
				descricao={descricao}
				selectedDate={selectedDate}
				movimentacoesMes={movimentacoesDoMes}
				closeModal={closeModalAdd}
				atualizaMovimentacoesMes={propsMovimentcoesMes}
			/>
			<ModalApagaMovimentacao
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
		</div>
	);
}

export default Home;