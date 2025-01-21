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
import Home from './paginas/home/Home';
import Login from './paginas/login/Login';
import Movimentacoes from './paginas/movimentacoes/Movimentacoes';
import Planejamentos from './paginas/planejamento/Planejamentos';
import Politica from './paginas/politica/Politica';

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
				<Route path="/login" element={ <Login {...props} />} />
				<Route path="/home" element={<Home {...props} />}/>
				<Route path="/analitico" element={<Analitico {...props} />}/>
				<Route path="/movimentacoes" element={<Movimentacoes {...props} />}/>
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
