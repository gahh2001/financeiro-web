import { FC } from "react";
import './about.scss';

const About: FC = () => {
	return (
		<div className="about">
			<div className="titulo">
				Bem-vindo ao meu projeto!
			</div>
			<div className="card-sobre-projeto-r">
				<div className="titulo-card-r">
					Sobre este projeto 🎯
				</div>
				Este projeto tem como finalidade atual disponibilizar uma ferramenta de gestão financeira pessoal
				para todas as pessoas que se interessam nesta funcionalidade. Este projeto surgiu com a ideia de
				criar uma aplicação para praticar e aprimorar meus conhecimentos em tecnologias de desenvolvimento.
				Com o desenvolver da ferramenta, percebi que disponibilizá-la ao público seria muito interessante,
				e assim o projeto evoluiu de uma simples API para uma ferramenta completa com diversos recursos
				bacanas. <br /> <br /> Por enquanto a ferramenta tem acesso liberado para todos, e não possui nenhuma espécie de
				monetização, todos os custos para mantê-la são encarados como um investimento em minhas próprias
				habilidades e também na minha carreira como programador.
				Se você tiver alguma sugestão de melhoria ou correção para esta aplicação, sinta-se a vontade para
				sugerir através dos contatos abaixo.
			</div>
			<div className="card-sobre-projeto-l">
				<div className="titulo-card-l">
					Contato 
				</div>
				E-mail: gabrielgoulart2001@gmail.com <br />
				GitHub: <a href="https://github.com/gahh2001" target="_blank">github.com/gahh2001</a> <br />
				Linkedin: <a href="https://www.linkedin.com/in/gabriel-oliveira-goulart-48641319b/" target="_blank">linkedin.com/in/gabriel-oliveira-goulart</a> <br />
				Instagram: <a href="https://www.instagram.com/gabriel_o_goulart/" target="_blank">instagram.com/gabriel_o_goulart/</a>
			</div>
		</div>
	)
}

export default About;