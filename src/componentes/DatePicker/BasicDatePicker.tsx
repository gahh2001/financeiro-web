import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function BasicDatePicker() {

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DatePicker />
		</LocalizationProvider>
	);
}