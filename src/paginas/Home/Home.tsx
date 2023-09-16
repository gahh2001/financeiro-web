import Calendario from '../../componentes/Calendario/Calendario';
import NavBar from '../../componentes/NavBar';
import InformacoesDoDia from '../../componentes/InformacoesDoDiaCard/InformacoesDoDia';
import InformacoesDoMes from '../../componentes/InformacoesDoMesCard/InformacoesDoMes';
import './Home.module.scss'

export const Home = () => {
	return (
		<div className="home">
			<div style={{ display: 'flex'}}>
				<div style={{ display: 'block',
					flexDirection: 'column',
					width: "70%",
					height: "100%" }}>
					<Calendario />
					<InformacoesDoMes />
				</div>
				<div style={{width: "29.9%", height: "100%"}}>
					<InformacoesDoDia />
				</div>
			</div>
		</div>
	);
}

export default Home;