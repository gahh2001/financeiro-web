import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AlertProvider } from './componentes/contextProviders/AlertProvider';
import './index.css';

ReactDOM.render(
	<BrowserRouter>
		<AlertProvider>
			<App />
		</AlertProvider>
	</BrowserRouter>,
	document.getElementById('root')
);
