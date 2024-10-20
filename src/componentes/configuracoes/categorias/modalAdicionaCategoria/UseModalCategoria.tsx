import { useState } from "react";

export default function useModalCategoria() {
	const [isOpenModalAdd, setisOpen] = useState(false);

	const closeModalCategoria = () => {
		setisOpen(!isOpenModalAdd);
	};

	return {
		isOpenModalAdd,
		closeModalCategoria
	};
}