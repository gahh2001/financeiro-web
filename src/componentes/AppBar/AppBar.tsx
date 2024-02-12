import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';
import { FC } from 'react';
import DrawerPages from '../menu/Menu';
import "./AppBarStyle.scss";

const NavBar: FC<{modulo: string}> = (modulo) => {
	return (
		<div className='app-bar'>
			<DrawerPages/>
			<div className="modulo">
				<h1>
					{modulo.modulo}
				</h1>
			</div>
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