import { FC, Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAppBarProps } from '../../interfaces/IAppBarProps';
import DrawerPages from '../menu/Menu';
import "./AppBarStyle.scss";

const AppBar: FC<IAppBarProps> = (props: IAppBarProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleConfig = () => {
		navigate("/configuracoes");
	}
	const logout = () => {
		localStorage.removeItem('googleId');
		localStorage.removeItem('urlPicture');
		props.setId("");
		props.setPicture("");
		navigate("/login");
	}

	return (
		<div className='app-bar'>
			<DrawerPages/>
			<div className="modulo">
				{props.modulo}
			</div>
			<Fragment>
			</Fragment>
		</div>
	);
}

export default AppBar