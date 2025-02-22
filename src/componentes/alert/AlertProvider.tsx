import { Alert, Snackbar } from "@mui/material";
import React, { createContext, ReactNode, useContext, useState } from "react";

type AlertSeverity = "success" | "error" | "warning" | "info";

interface AlertContextProps {
	showAlert: (message: string, severity?: AlertSeverity) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState<AlertSeverity>("success");

	const showAlert = (msg: string, sev: AlertSeverity = "success") => {
		setMessage(msg);
		setSeverity(sev);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<AlertContext.Provider value={{ showAlert }}>
			{children}
			{/* Snackbar Global */}
			<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={severity} variant="filled">
					{message}
				</Alert>
			</Snackbar>
		</AlertContext.Provider>
	);
};

export const useAlert = () => {
	const context = useContext(AlertContext);
	if (!context) {
		throw new Error("useAlert deve ser usado dentro de um AlertProvider");
	}
	return context;
};
