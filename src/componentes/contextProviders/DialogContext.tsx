import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { createContext, ReactNode, useContext, useState } from "react";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children: React.ReactElement<any, any> },
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

interface DialogContextProps {
	showDialog: (message: string) => void;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");

	const showDialog = (msg: string) => {
		setMessage(msg);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<DialogContext.Provider value={{ showDialog }}>
			{children}
			{/* Dialog Global */}
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted onClose={handleClose}
				fullWidth
				sx={{ zIndex: 1500 }}
			>
				<DialogTitle>Descrição</DialogTitle>
				<DialogContent>
					<DialogContentText>{message}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Fechar</Button>
				</DialogActions>
			</Dialog>
		</DialogContext.Provider>
	);
};

export const useDialog = () => {
	const context = useContext(DialogContext);
	if (!context) {
		throw new Error("useDialog deve ser usado dentro de um DialogProvider");
	}
	return context;
};
