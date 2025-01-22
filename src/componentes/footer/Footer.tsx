import { Link, Typography } from "@mui/material";
import { FC } from "react";
import './Footer.scss';

const Footer: FC = () => {
	return (
		<div className="footer">
			<Typography variant="h5"> MyWallet Pro</Typography>
			<Link href="/about-me" variant="subtitle2">Sobre o desenvolvedor</Link>
			<Link href="/politica-de-privacidade" variant="subtitle2">Política de privacidade</Link>
		</div>
	);
}

export default Footer;