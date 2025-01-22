import CloseIcon from '@mui/icons-material/Close';
import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material";
import { FC } from "react";
import { IDicasProps } from "../../interfaces/IDicasProps";
import './Dica.scss';

const Dica: FC<IDicasProps> = (props: IDicasProps) => {
	return (
		<Collapse style={{ display: props.open ? "block" : "none" }} in={props.open}>
			<Alert
				action={
					<IconButton
					aria-label="close"
					color="inherit"
					size="small"
					onClick={() => {
						localStorage.setItem(props.codigo, "ok");
						props.setOpen(false);
					}}
					>
					<CloseIcon fontSize="inherit" />
					</IconButton>
				}
				sx={{ mb: 2 }}
				severity="info"
			>
				<AlertTitle>Dica</AlertTitle>
				{props.frase} 👇
			</Alert>
		</Collapse>
	);
}

export default Dica