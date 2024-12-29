import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import './About.scss';
import email from './email.png';
import git from './github.png';
import instagram from './instagram.png';
import linkedin from './linkedin.png';

const About: FC = () => {
	const navigate = useNavigate();
	const voltar = () => {
		navigate("/home");
	};

	return (
		<div className="about">
			<div className="header">
				<div className="voltar-header">
					<button
						onClick={() =>
							voltar()
						}
					>
						Voltar para Home
					</button>
				</div>
				<div className="titulo">
					Bem-vindo ao meu projeto!
				</div>
			</div>
			<div className="card">
				<div className="titulo-card">
					Sobre este projeto 🎯
				</div>
				Este projeto tem como finalidade atual disponibilizar uma ferramenta de gestão
				financeira pessoal para todas as pessoas que se interessam nesta funcionalidade.
				Este projeto surgiu com a ideia de criar uma aplicação para praticar e aprimorar
				meus conhecimentos em tecnologias de desenvolvimento. Com o desenvolver da ferramenta,
				percebi que disponibilizá-la ao público seria muito interessante, e assim o projeto
				evoluiu de uma simples API para uma ferramenta completa com diversos recursos bacanas.
				<br /> <br /> Por enquanto a ferramenta tem acesso liberado para todos, e não possui
				nenhuma espécie de monetização, todos os custos para mantê-la são encarados como um
				investimento em minhas próprias habilidades e também na minha carreira como programador.
				Se você tiver alguma sugestão de melhoria ou correção para esta aplicação, sinta-se
				a vontade para sugerir através dos contatos abaixo.
			</div>
			<div className="card">
				<div className="titulo-card">
					Contato 📍
				</div>
				<img src={email} alt="" /> <Link to="gabrielgoulart2001@gmail.com" target="_blank"/> gabrielgoulart2001@gmail.com <br />
				<img src={git} alt="" /> <Link to="https://github.com/gahh2001" target="_blank">github.com/gahh2001</Link> <br />
				<img src={linkedin} alt="" /> <Link to="https://www.linkedin.com/in/gabriel-oliveira-goulart-48641319b/" target="_blank">linkedin.com/in/gabriel-oliveira-goulart</Link> <br />
				<img src={instagram} alt="" /> <Link to="https://www.instagram.com/gabriel_o_goulart/" target="_blank">instagram.com/gabriel_o_goulart/</Link>
			</div>
			<div className="card">
				<div className="titulo-card">
					Privacidade 🤐
				</div>
				Mesmo sendo independente e gratuito, o meu projeto respeita a privacidade e segurança dos usuários.
				Por utilizar a autenticação com o Google, seu login está seguro contra terceiros. Fique à vontade para utilizar a ferramenta de
				forma séria e despreocupada para sua organização financeira.
			</div>
			<div className="card">
				<div className="titulo-card">
					Tecnologias 👨‍💻
				</div>
				Se você tiver curiosidade sobre as tecnologias utilizadas, segue a lista: <br/> <br/>
				- Quarkus/Java <br/>
				- Postgres<br/>
				- Docker<br/>
				- React/TS<br/>
				- Material UI<br/>
			</div>
		</div>
	)
}

export default About;