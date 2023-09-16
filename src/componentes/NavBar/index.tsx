import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';


const NavBar = () => {
  return (
	<Box sx={{ flexGrow: 1 }}>
	<AppBar position="static" enableColorOnDark >
	  <Toolbar>
		 <IconButton
			size="large"
			edge="start"
			color="inherit"
			aria-label="menu"
			sx={{ mr: 2 }}
		 >
			<MenuIcon fontSize="large" />
		 </IconButton>
		 <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}/>
		<IconButton  >
			<SettingsIcon fontSize="large" />
		</IconButton>
		<IconButton>
			<AccountCircleIcon fontSize="large" />
		</IconButton>
	  </Toolbar>
	</AppBar>
 </Box>
);
}

export default NavBar