import { ThemeProvider, createTheme } from '@mui/material';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { googleIdAtom } from './atoms/atom';
import AlertPolitica from './componentes/alertPolitica/AlertPolitica';
import { IGoogleIdProps } from './interfaces/IGoogleIdProps';
import About from './paginas/about/About';
import Analitico from './paginas/analitico/Analitico';
import Configuracoes from './paginas/configuracoes/Configuracoes';
import Dividas from './paginas/dividas/Movimentacoes';
import EducacaoFinanceira from './paginas/educação financeira/Movimentacoes';
import Empreendedores from './paginas/empreendedores/Movimentacoes';
import FonteRenda from './paginas/fonterenda/Movimentacoes';
import Home from './paginas/home/Home';
import Inflacao from './paginas/inflação/Movimentacoes';
import MercadoImobiliario from './paginas/mercadoimobiliario/Movimentacoes';
import Movimentacoes from './paginas/movimentacoes/Movimentacoes';
import Planejamentos from './paginas/planejamento/Planejamentos';
import PlanejamentoPessoal from './paginas/planejamentopessoal/Movimentacoes';
import Politica from './paginas/politica/Politica';
import Previdencia from './paginas/previdencia/Movimentacoes';
import Psicologiafinanceira from './paginas/psicologia financeira/Movimentacoes';
import TecnologiaFinanceira from './paginas/tecnologia financeira/Movimentacoes';

function App() {
	const [, setGoogleId] = useAtom(googleIdAtom);
	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	setGoogleId(localStorage.getItem('googleId'));
	const [urlPicture, setUrlPicture] = useState<string | null>(localStorage.getItem('urlPicture'));

	const setId = (id: string) => {
		localStorage.setItem('googleId', id);
	}
	const setPicure = (url: string) => {
		localStorage.setItem('urlPicture', url);
		setUrlPicture(url);
	}
	const props: IGoogleIdProps = {
		setId: setId,
		setPicture: setPicure,
		urlPicture: urlPicture
	}

	return (
		<ThemeProvider theme={darkTheme}>
			<Routes>
				{/* <Route path="/login" element={ <Login {...props} />} /> */}
				<Route path="/home" element={<Home {...props} />}/>
				<Route path="/analitico" element={<Analitico {...props} />}/>
				<Route path="/movimentacoes" element={<Movimentacoes {...props} />}/>
				<Route path="/dividas" element={<Dividas {...props} />}/>
				<Route path="/educacao-financeira" element={<EducacaoFinanceira {...props} />}/>
				<Route path="/empreendedores" element={<Empreendedores {...props} />}/>
				<Route path="/fonte-renda" element={<FonteRenda {...props} />}/>
				<Route path="/inflacao" element={<Inflacao {...props} />}/>
				<Route path="/mercado-imobiliario" element={<MercadoImobiliario {...props} />}/>
				<Route path="/planejamento-pessoal" element={<PlanejamentoPessoal {...props} />}/>
				<Route path="/previdencia" element={<Previdencia {...props} />}/>
				<Route path="/psicologia-financeira" element={<Psicologiafinanceira {...props} />}/>
				<Route path="/tecnologia-financeira" element={<TecnologiaFinanceira {...props} />}/>
				<Route path="/configuracoes" element={<Configuracoes {...props} />}/>
				<Route path="/about-me" element={<About {...props} />}/>
				<Route path="/planejamentos" element={<Planejamentos {...props}/>}/>
				<Route path="/politica-de-privacidade" element={<Politica {...props} />}/>
				<Route path="*" element={<Navigate to="/home" replace />} />
			</Routes>
			<AlertPolitica/>
		</ThemeProvider>
	);
}

export default App;
