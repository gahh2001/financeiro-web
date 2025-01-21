import { Typography } from "@mui/material";
import { FC, Fragment } from "react";
import AppBar from "../../componentes/AppBar/AppBar";
import Footer from "../../componentes/footer/Footer";
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import './Politica.scss';

const Politica: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
	return (
		<Fragment>
			<AppBar
				modulo="Política de privacidade"
				urlPicture={props.urlPicture}
				setId={props.setId}
				setPicture={props.setPicture}
			/>
			<div className="politica">
				<div className="card-politica">
					<Typography variant="h5">Proteção e Privacidade dos Seus Dados</Typography>
					<Typography>
						A sua privacidade é extremamente importante para nós. Ao utilizar o login com sua conta Google em nosso 
						site, coletamos apenas as informações necessárias para oferecer uma experiência personalizada e segura. 
						Gostaríamos de esclarecer como esses dados são tratados:
					</Typography>
					<Typography>
						<b>Informações Coletadas</b>: Quando você realiza o login com sua conta Google, armazenamos 
						apenas informações básicas, como seu nome, endereço de e-mail e foto de perfil. Essas informações são 
						utilizadas exclusivamente para identificar sua conta e personalizar sua experiência em nossa plataforma.
					</Typography>
					<Typography>
						<b>Segurança e Confidencialidade:</b> Todos os dados coletados são armazenados de maneira segura, 
						utilizando tecnologia de ponta para garantir que suas informações permaneçam protegidas contra acessos 
						não autorizados. Implementamos medidas rigorosas de segurança para proteger seus dados.
					</Typography>
					<Typography>
						<b>Uso dos Dados:</b> As informações que coletamos são usadas apenas para fins internos e para melhorar nossos 
						serviços. Garantimos que os dados não serão compartilhados, vendidos ou divulgados a terceiros sob nenhuma 
						circunstância, a menos que sejamos obrigados por lei.
					</Typography>
					<Typography>
						<b>Consentimento e Alterações</b>: Ao utilizar nosso serviço, você concorda com a coleta e uso das 
						informações conforme descrito nesta política de privacidade. Qualquer alteração futura na nossa política 
						será comunicada de forma clara e antecipada, para que você esteja sempre ciente de como tratamos suas 
						informações.
					</Typography>
					<Typography>
						Nos comprometemos a proteger sua privacidade e oferecer um ambiente seguro para você aproveitar ao máximo 
						nossos serviços. Se tiver dúvidas ou preocupações, não hesite em entrar em contato.
					</Typography>
				</div>
			</div>
			<Footer/>
		</Fragment>
	);
}

export default Politica;