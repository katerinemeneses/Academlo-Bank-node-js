import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../store/actions/user.actions';
import classes from './header.module.css';

const Header = () => {

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handdleChangeAccount = () => {
		dispatch(logout())
		navigate('/login')
	}

	return (
		<header className={classes.header}>
			<div className={classes.brand}>
				<a href="/">Academlo Bank</a>
			</div>

			<nav className={classes.navigation}>
				<ul>
					<li>
						<button 
							className={classes.changeAccount} 
							onClick={handdleChangeAccount}
						>
							Change Account
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
