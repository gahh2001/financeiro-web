import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, Typography } from '@mui/material';
import DrawerPages from '../menu/Menu';
import "./AppBarStyle.scss";

const NavBar = () => {
	return (
		<div className='app-bar'>
			<DrawerPages/>
			<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}/>
			<div className='icons'>
				<IconButton>
					<SettingsIcon sx={{fontSize: "4vh"}}/>
				</IconButton>
				<IconButton>
					<AccountCircleIcon sx={{fontSize: "4vh"}}/>
				</IconButton>
			</div>
		</div>
	);
}

export default NavBar