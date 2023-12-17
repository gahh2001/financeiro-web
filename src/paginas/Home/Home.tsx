import { ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import Calendario from '../../componentes/Calendario/Calendario';
import InformacoesDoDia from '../../componentes/InformacoesDoDiaCard/InformacoesDoDia';
import DialogDescricaoMovimentacao from "../../componentes/InformacoesDoDiaCard/dialogDescricaoMovimentacao/DialogDescricaoMovimentacao";
import InformacoesDoMes from '../../componentes/InformacoesDoMesCard/InformacoesDoMes';
import ModalAddMovimentacao from '../../componentes/ModalAddMovimentacao/ModalAddMovimentacao';
import useModalAddMovimentacao from "../../componentes/ModalAddMovimentacao/UseModalAddMovimentacao";
import ModalApagaMovimentacao from "../../componentes/ModalRemoveMovimentacao/ModalApagaMovimentacao";
import useModalRemoveMovimentacao from "../../componentes/ModalRemoveMovimentacao/UseModalRemoveMovimentacao";
import { TipoMovimentacaoEnum } from '../../enums/TipoMovimentacaoEnum';
import { IMovimentacao } from "../../interfaces/IMovimentacao";
import './Home.module.scss';

export const Home = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
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

	const handleEditMovimentacao = (data: Date, valor: string, categoria: string,
			descricao: string, tipo: TipoMovimentacaoEnum) => {
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
				<div style={{ display: 'flex', height: "100vh" }}>
					<div style={{
						flexDirection: 'column',
						display: 'flex',
						flex: "0.7"
					}}>
						<Calendario
							onDayClick={propsCalendario}
							closeModalAdd={closeModalAdd}
							closeModalRemove={closeModalRemove}
						/>
						<InformacoesDoMes
							selectedDate={selectedDate}
							modalAddRendimento={propsModalAddRendimento}
							modalAddDespesa={propsModalAddDespesa}
							modalApagaMovimentacao={propsModalApagaRendimento}
						/>
					</div>
					<div style={{flex: "0.3", display: "flex"}}>
						<InformacoesDoDia
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
					isOpen={isOpenModalAdd}
					closeModal={closeModalAdd}
					tipo= {tipo}
					edit={edit}
					date={data}
					categoria={categoria}
					valor={valor}
					descricao={descricao}
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
			</ThemeProvider>
		</div>
	);
}

export default Home;