import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { FC, Fragment, ReactElement, Ref, forwardRef } from 'react';

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
	children: ReactElement<any, any>;
	},
	ref: Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

interface DialogDescricaoProps {
	openDialog: boolean;
	description: string;
	onClose: () => void;
}

const DialogDescricaoMovimentacao: FC<DialogDescricaoProps> =
	({openDialog, description, onClose}) => {

	const handleClose = () => {
		onClose();
	};

	return (
		<Fragment>
			<Dialog
				open={openDialog}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
				fullWidth
			>
				<DialogTitle>{"Descrição"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						{description}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Fechar</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}

export default DialogDescricaoMovimentacao