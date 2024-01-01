import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { Fragment, useState } from 'react';

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

	return (
		<div>
			<Fragment key={"drawer"}>
				<Button onClick={toggleDrawer(true)}>Testeeeeee</Button>
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
							<ListItem key={"inicio"} disablePadding>
								<ListItemButton>
									<ListItemIcon>
									</ListItemIcon>
									<ListItemText primary={"Início"}/>
								</ListItemButton>
							</ListItem>
						</List>
					</Box>
				</Drawer>
			</Fragment>
		</div>
	);
}