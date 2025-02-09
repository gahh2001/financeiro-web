import { Logout, Settings } from '@mui/icons-material';
import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { useAtom } from 'jotai';
import { FC, Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accessToken, pictureAtom } from '../../atoms/atom';
import { IAppBarProps } from '../../interfaces/IAppBarProps';
import DrawerPages from '../menu/Menu';
import "./AppBarStyle.scss";

const AppBar: FC<IAppBarProps> = (props: IAppBarProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [picture, setPicture] = useAtom(pictureAtom);
	const [, setAccessToken] = useAtom(accessToken);
	const navigate = useNavigate();

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleConfig = () => {
		navigate("/configuracoes");
	};
	const logout = () => {
		navigate("/login");
		localStorage.removeItem('accessToken');
		localStorage.removeItem('urlPicture');
		setAccessToken("");
		setPicture("");
	};

	return (
		<div className='app-bar'>
			<DrawerPages/>
			<div className="modulo">
				{props.modulo}
			</div>
			<Fragment>
				<Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
					<Tooltip title="Configurações">
						<IconButton
							onClick={handleClick}
							size="small"
							sx={{ ml: 2 }}
							aria-controls={open ? 'account-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
						>
							<Avatar
								src={picture || ''}
								sx={{ width: "5.5vh", height: "5.5vh" }}
							></Avatar>
						</IconButton>
					</Tooltip>
				</Box>
				<Menu
					anchorEl={anchorEl}
					id="account-menu"
					open={open}
					onClose={handleClose}
					onClick={handleClose}
					slotProps={{
						paper: {
						 elevation: 0,
						 sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 1.5,
							'& .MuiAvatar-root': {
							 width: 32,
							 height: 32,
							 ml: -0.5,
							 mr: 1,
							},
							'&::before': {
							 content: '""',
							 display: 'block',
							 position: 'absolute',
							 top: 0,
							 right: 14,
							 width: 10,
							 height: 10,
							 bgcolor: 'background.paper',
							 transform: 'translateY(-50%) rotate(45deg)',
							 zIndex: 0,
							},
						 },
						},
					 }}
					transformOrigin={{ horizontal: 'right', vertical: 'top' }}
					anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				>
					<MenuItem onClick={handleConfig}>
						<ListItemIcon>
							<Settings fontSize="small" />
						</ListItemIcon>
						Configurações
					</MenuItem>
					<MenuItem onClick={logout}>
						<ListItemIcon>
							<Logout fontSize="small" />
						</ListItemIcon>
						Sair
					</MenuItem>
				</Menu>
			</Fragment>
		</div>
	);
}

export default AppBar