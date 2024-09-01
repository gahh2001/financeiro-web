import { FC } from "react";
import { useNavigate } from "react-router-dom";
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
				<div className="voltar">
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
			<div className="card-r">
				<div className="titulo-card-r">
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
			<div className="card-l">
				<div className="titulo-card-l">
					Contato 📍
				</div>
				<img src={email} alt="" /> E-mail: gabrielgoulart2001@gmail.com <br />
				<img src={git} alt="" /> GitHub: <a href="https://github.com/gahh2001" target="_blank">github.com/gahh2001</a> <br />
				<img src={linkedin} alt="" /> Linkedin: <a href="https://www.linkedin.com/in/gabriel-oliveira-goulart-48641319b/" target="_blank">linkedin.com/in/gabriel-oliveira-goulart</a> <br />
				<img src={instagram} alt="" /> Instagram: <a href="https://www.instagram.com/gabriel_o_goulart/" target="_blank">instagram.com/gabriel_o_goulart/</a>
			</div>
			<div className="card-r">
				<div className="titulo-card-r">
					Privacidade 🤐
				</div>
				Mesmo sendo independente e gratuito, o meu projeto respeita a privacidade dos usuários.
				Você já deve imaginar que eu possuo acesso ao banco de dados, mas cada registro nele
				é identificado unicamente pelo id do usuário no Google, portanto, não posso saber nem
				o nome da conta atrelada ao registro. Fique à vontade para utilizar a ferramenta de
				forma séria e despreocupada, afinal, eu mesmo uso ela para minha organização financeira.
			</div>
			<div className="card-l">
				<div className="titulo-card-l">
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