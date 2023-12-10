import { useState } from "react";

export default function useModalAddMovimentacao() {
	const [isOpenModalAdd, setisOpen] = useState(false);

	const closeModalAdd = () => {
		setisOpen(!isOpenModalAdd);
	};

	return {
		isOpenModalAdd,
		closeModalAdd
	};
}
