import { useState } from "react";

export default function useModalRemoveMovimentacao() {
	const [isOpenModalRemove, setisOpen] = useState(false);

	const closeModalRemove = () => {
		setisOpen(!isOpenModalRemove);
	};

	return {
		isOpenModalRemove,
		closeModalRemove
	};
}
