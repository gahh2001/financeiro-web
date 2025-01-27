import { Alert, Link, Snackbar, SnackbarCloseReason, Typography } from "@mui/material";
import { FC, useState } from "react";

const AlertPolitica: FC = () => {
	const [open, setOpen] = useState(localStorage.getItem('alertPrivacidade') !== "concordo");

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: SnackbarCloseReason,
	) => {
		if (reason === 'clickaway') {
		return;
		}
		setOpen(false);
		localStorage.setItem('alertPrivacidade', "concordo");
	};

	return (
		<Snackbar open={open} onClose={handleClose}>
			<Alert
				onClose={handleClose}
				severity="info"
				variant="filled"
				sx={{ width: '100%' }}
			>
			<Typography>
				Ao utilizar este site, você concorda com a {frasePolitica()}
			</Typography>
			</Alert>
		</Snackbar>
	);

	function frasePolitica() {
		return (
			<Link href="/politica-de-privacidade" color={"#2f2f31"}>Política de privacidade</Link>
		);
	}
}

export default AlertPolitica;