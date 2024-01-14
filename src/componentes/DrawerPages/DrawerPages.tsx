import { AssessmentOutlined, CalendarMonth } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TemporaryDrawer() {
	const [state, setState] = useState(false);

	const toggleDrawer = (state: boolean) =>
		(event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}
			setState(state);
		};

	const navigate = useNavigate();

	const handleNavigate = (address: string) => {
		navigate(address);
	};

	return (
		<div>
			<Fragment key={"drawer"}>
				<div className='icons'>
					<IconButton onClick={toggleDrawer(true)}>
						<MenuIcon sx={{fontSize: "5vh"}}/>
					</IconButton>
				</div>
				<Drawer
					anchor="left"
					open={state}
					onClose={toggleDrawer(false)}
				>
					<Box
						sx={{ width: 250 }}
						role="presentation"
						onClick={toggleDrawer(false)}
					>
						<List>
							<ListItem key={"inicio"}>
								<ListItemButton onClick={() => handleNavigate("/home")}>
									<ListItemIcon>
										<CalendarMonth/>
									</ListItemIcon>
									<ListItemText primary={"Início"}/>
								</ListItemButton>
							</ListItem>
							<ListItem key={"analitico"}>
								<ListItemButton onClick={() => handleNavigate("/analitico")}>
									<ListItemIcon>
										<AssessmentOutlined/>
									</ListItemIcon>
									<ListItemText primary={"Analítico"}/>
								</ListItemButton>
							</ListItem>
						</List>
					</Box>
				</Drawer>
			</Fragment>
		</div>
	);
}