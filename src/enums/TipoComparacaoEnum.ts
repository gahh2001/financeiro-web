enum TipoComparacaoEnum{
	TRESMESES = "TRESMESES",
	SEISMESES = "SEISMESES",
	UMANO = "UMANO"
}

export function obtemNumeroEnum(tipo: string): number {
	switch (tipo) {
		case "TRESMESES":
			return 3;
		case "SEISMESES":
			return 6;
		default:
			return 12;
	}
}

export { TipoComparacaoEnum };

