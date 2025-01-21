import { Link, Typography } from "@mui/material";
import { FC } from "react";
import './Footer.scss';

const Footer: FC = () => {
	return (
		<div className="footer">
			<Typography variant="h5"> Carteira Online</Typography>
			<Link href="/about-me" variant="subtitle1">Sobre o desenvolvedor</Link>
		</div>
	);
}

export default Footer;