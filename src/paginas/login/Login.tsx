import './login.scss';

import { Button } from '@mui/material';
import { useAtom } from 'jotai';
import { FC, Fragment, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { googleIdAtom, modalLogin } from '../../atoms/atom';
import Footer from '../../componentes/footer/Footer';
import ModalLogin from '../../componentes/login/ModalLogin';
import imgAnalitico from '../../images/analitico.png';
import imgHome from '../../images/home.png';
import imgPlanos from '../../images/planejamentos.png';
import { IGoogleIdProps } from '../../interfaces/IGoogleIdProps';

const Login: FC = () => {
	const [googleId] = useAtom(googleIdAtom);
	const navigate = useNavigate();
	const [, setOpen] = useAtom(modalLogin);

	useEffect(() => {
		if (googleId && googleId !== "") {
			navigate("/home");
		}
	}, [googleId]);
	
	return (
		<Fragment>
			<div className='login'>
				<div className="nome-site">
					MyWallet Pro
				</div>
				<div className="imagens">
					<div className="card-imagem">
						<div className="titulo-imagem">Fique no controle</div>
						<div className="text-imagem">
							Registre suas movimentações financeiras, crie categorias,
							visualize seu calendário, acompanhe o seu saldo e muito mais!
						</div>
						<img
							src={imgHome}
							alt="Página Home"
						/>
						<Button onClick={() => setOpen(true)}>
							Começar
						</Button>
					</div>
					<div className="card-imagem">
						<img
							src={imgPlanos}
							alt="Página Home"
							/>
						<div className="titulo-imagem">Crie planejamentos</div>
						<div className="text-imagem">
							Defina metas, limites, acompanhe o seu progresso e veja
							como você se sai nos seus planejamentos.
						</div>
						<Button onClick={() => setOpen(true)}>
							Planejar
						</Button>
					</div>
					<div className="card-imagem">
						<div className="titulo-imagem">De olho nos gráficos</div>
						<div className="text-imagem">
							Acompanhe o andamento das suas movimentações, veja
							comparações, evoluções, fique por dentro do desempenho da sua rotina financeira.
						</div>
						<img
							src={imgAnalitico}
							alt="Página Home"
						/>
						<Button onClick={() => setOpen(true)}>
							Começar
						</Button>
					</div>
				</div>
				<ModalLogin/>
			</div>
			<Footer/>
		</Fragment>
	);
}

export default Login;