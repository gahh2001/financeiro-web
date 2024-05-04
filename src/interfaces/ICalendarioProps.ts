export type  ICalendarioProps = {
	googleId: string | null;
	onDayClick: (selectedDate: Date) => void;
	closeModalAdd: () => void;
	closeModalRemove: () => void;
}