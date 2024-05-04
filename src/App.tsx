import { ThemeProvider, createTheme } from '@mui/material';
import { useState } from 'react';
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

	const [userId, setUserId] = useState<string | null>(localStorage.getItem('googleId'));
	const setId = (id: string) =>  {
		localStorage.setItem('googleId', id);
		setUserId(id);
	}

	return (
		<ThemeProvider theme={darkTheme}>
			<Routes>
				<Route path="/" element={
					<Home
						googleId={userId}
						setId={setId}
					/>
				} />
				<Route path="/login" element={
					<Login
						googleId={userId}
						setId={setId}
					/>
				} />
				<Route path="/home" element={
					<Home
						googleId={userId}
						setId={setId}
					/>
				}/>
				<Route path="/analitico" element={
					<Analitico
						googleId={userId}
						setId={setId}
					/>
				}/>
			</Routes>
		</ThemeProvider>
		
	);
}

export default App;
