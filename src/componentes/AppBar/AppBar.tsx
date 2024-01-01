import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, Typography } from '@mui/material';
import "./AppBarStyle.scss";

const NavBar = () => {
	return (
		<div className='app-bar'>
			<div className='icons'>
				<IconButton>
					<MenuIcon sx={{fontSize: "5vh"}}/>
				</IconButton>
			</div>
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