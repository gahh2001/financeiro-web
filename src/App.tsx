import { ThemeProvider, createTheme } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Analitico from './paginas/analitico/Analitico';
import Home from './paginas/home/Home';
import Login from './paginas/login/login';

function App() {
	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	return (
		<ThemeProvider theme={darkTheme}>
			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="/login" element={<Login/>} />
				<Route path="/home" element={<Home/>}/>
				<Route path="/analitico" element={<Analitico/>}/>
			</Routes>
		</ThemeProvider>
		
	);
}

export default App;
