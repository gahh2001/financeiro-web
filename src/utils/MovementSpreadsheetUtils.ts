import writeXlsxFile from "write-excel-file/browser";
import { TipoMovimentacaoEnum } from "../enums/TipoMovimentacaoEnum";
import { Movimentacao } from "../types/Movimentacao";

const toSpreadsheetDate = (date: Date) => {
	const movementDate = new Date(date);
	return isNaN(movementDate.getTime())
		? null
		: new Date(Date.UTC(movementDate.getUTCFullYear(), movementDate.getUTCMonth(), movementDate.getUTCDate()));
}

export const downloadMovementsSpreadsheet = (movements: Movimentacao[], fileName: string) =>
	writeXlsxFile(movements, {
		sheet: "Movimentações",
		stickyRowsCount: 1,
		columns: [
			{
				header: { value: "Categoria", fontWeight: "bold" },
				cell: (movement) => ({ value: movement.nomeCategoriaMovimentacao || "" }),
				width: 25
			},
			{
				header: { value: "Descrição", fontWeight: "bold" },
				cell: (movement) => ({ value: movement.descricaoMovimentacao || "" }),
				width: 45
			},
			{
				header: { value: "Valor", fontWeight: "bold" },
				cell: (movement) => Number.isFinite(movement.valor)
					? {
						value: movement.valor,
						type: Number,
						format: "#,##0.00",
						textColor: movement.tipoMovimentacao === TipoMovimentacaoEnum.POSITIVO.toString() ? "#42B84A" : "#AD4331"
					}
					: null,
				width: 15
			},
			{
				header: { value: "Data", fontWeight: "bold" },
				cell: (movement) => {
					const date = toSpreadsheetDate(movement.dataMovimentacao);
					return date && { value: date, type: Date, format: "dd/mm/yyyy" };
				},
				width: 12
			}
		]
	}).toFile(fileName);