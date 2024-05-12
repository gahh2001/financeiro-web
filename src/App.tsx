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
	const [urlPicture, setUrlPicture] = useState<string | null>(localStorage.getItem('urlPicture'));
	const setId = (id: string) => {
		localStorage.setItem('googleId', id);
		setUserId(id);
	}
	const setPicure = (url: string) => {
		localStorage.setItem('urlPicture', url);
		setUrlPicture(url);
	}

	return (
		<ThemeProvider theme={darkTheme}>
			<Routes>
				<Route path="/" element={
					<Home
						googleId={userId}
						setId={setId}
						setPicture={setPicure}
						urlPicture={urlPicture}
					/>
				} />
				<Route path="/login" element={
					<Login
						googleId={userId}
						urlPicture={urlPicture}
						setId={setId}
						setPicture={setPicure}
					/>
				} />
				<Route path="/home" element={
					<Home
						googleId={userId}
						urlPicture={urlPicture}
						setId={setId}
						setPicture={setPicure}
					/>
				}/>
				<Route path="/analitico" element={
					<Analitico
						googleId={userId}
						urlPicture={urlPicture}
						setId={setId}
						setPicture={setPicure}
					/>
				}/>
			</Routes>
		</ThemeProvider>
	);
}

export default App;
