import './login.scss';

import { Button } from '@mui/material';
import { useAtom } from 'jotai';
import { FC, Fragment, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { accessToken, modalLogin } from '../../atoms/atom';
import Footer from '../../componentes/footer/Footer';
import ModalLogin from '../../componentes/login/ModalLogin';
import imgAnalitico from '../../images/analitico.png';
import imgHome from '../../images/home.png';
import imgPlanos from '../../images/planejamentos.png';

const Login: FC = () => {
	const [accessTokenAtom] = useAtom(accessToken);
	const navigate = useNavigate();
	const [, setOpen] = useAtom(modalLogin);

	useEffect(() => {
		if (accessTokenAtom && accessTokenAtom !== "") {
			navigate("/home");
		}
	}, [accessTokenAtom]);

	return (
		<Fragment>
			<div className='login-container'>
				<div className='login-content'>
					<div className="hero-section">
						<h1 className="nome-site">MyWallet Pro</h1>
						<p className="subtitulo">
							Acompanhe, planeje e evolua. O controle total da sua vida financeira em um só lugar.
						</p>
						<Button 
							className="btn-primary" 
							variant="contained" 
							size="large"
							onClick={() => setOpen(true)}
						>
							Acessar Minha Conta
						</Button>
					</div>
					<div className="features-grid">
						<div className="card-feature">
							<img src={imgHome} alt="Dashboard inicial" />
							<h2 className="titulo-feature">Fique no controle</h2>
							<p className="text-feature">
								Registre suas movimentações financeiras, crie categorias,
								visualize seu calendário, acompanhe o seu saldo e muito mais!
							</p>
						</div>
						<div className="card-feature">
							<img src={imgPlanos} alt="Tela de Planejamento" />
							<h2 className="titulo-feature">Crie planejamentos</h2>
							<p className="text-feature">
								Defina metas, limites, acompanhe o seu progresso e veja
								como você se sai nos seus planejamentos.
							</p>
						</div>
						<div className="card-feature">
							<img src={imgAnalitico} alt="Gráficos analíticos" />
							<h2 className="titulo-feature">De olho nos gráficos</h2>
							<p className="text-feature">
								Acompanhe o andamento das suas movimentações, veja
								comparações, evoluções e fique por dentro do seu desempenho.
							</p>
						</div>
					</div>
				</div>
				<ModalLogin />
			</div>
			<Footer />
		</Fragment>
	);
}

export default Login;