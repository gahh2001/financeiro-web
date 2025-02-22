import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AlertProvider } from './componentes/alert/AlertProvider';

ReactDOM.render(
	<BrowserRouter>
		<AlertProvider>
			<App />
		</AlertProvider>
	</BrowserRouter>,
	document.getElementById('root')
);
