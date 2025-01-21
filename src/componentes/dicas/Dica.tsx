import CloseIcon from '@mui/icons-material/Close';
import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material";
import { FC } from "react";
import { IDicasProps } from "../../interfaces/IDicasProps";
import './Dica.scss';

const Dica: FC<IDicasProps> = (props: IDicasProps) => {
	return (
		<Collapse in={props.open} sx={{width: "60%"}}>
			<Alert
				action={
					<IconButton
					aria-label="close"
					color="inherit"
					size="small"
					onClick={() => {
						localStorage.setItem('openDicaInformacoesdia', "ok");
						props.setOpenDicaInformacoesdia(false);
					}}
					>
					<CloseIcon fontSize="inherit" />
					</IconButton>
				}
				sx={{ mb: 2 }}
				severity="info"
			>
				<AlertTitle>Dica</AlertTitle>
				Aqui você fica no controle sobre todas as movimentaçõe diárias
			</Alert>
		</Collapse>
	);
}

export default Dica