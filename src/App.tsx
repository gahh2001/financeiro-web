import { ThemeProvider, createTheme } from '@mui/material';
import { useAtom } from 'jotai';
import { Navigate, Route, Routes } from 'react-router-dom';
import { accessToken } from './atoms/atom';
import AlertPolitica from './componentes/alertPolitica/AlertPolitica';
import About from './paginas/about/About';
import Analitico from './paginas/analitico/Analitico';
import Configuracoes from './paginas/configuracoes/Configuracoes';
import Home from './paginas/home/Home';
import Login from './paginas/login/Login';
import Movimentacoes from './paginas/movimentacoes/Movimentacoes';
import Planejamentos from './paginas/planejamento/Planejamentos';
import Politica from './paginas/politica/Politica';
import { DialogProvider } from './componentes/contextProviders/DialogContext';

function App() {
	const [, setAccessToken] = useAtom(accessToken);
	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	setAccessToken(localStorage.getItem('accessToken'));

	return (
		<ThemeProvider theme={darkTheme}>
			<DialogProvider>
				<Routes>
					<Route path="/login" element={ <Login/>} />
					<Route path="/home" element={<Home/>}/>
					<Route path="/analitico" element={<Analitico/>}/>
					<Route path="/movimentacoes" element={<Movimentacoes/>}/>
					<Route path="/configuracoes" element={<Configuracoes/>}/>
					<Route path="/about-me" element={<About/>}/>
					<Route path="/planejamentos" element={<Planejamentos/>}/>
					<Route path="/politica-de-privacidade" element={<Politica/>}/>
					<Route path="*" element={<Navigate to="/home" replace />} />
				</Routes>
				<AlertPolitica/>
			</DialogProvider>
		</ThemeProvider>
	);
}

export default App;
