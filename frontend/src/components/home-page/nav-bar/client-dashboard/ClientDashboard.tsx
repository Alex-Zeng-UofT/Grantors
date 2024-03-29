import { useUserContext } from '../../../contexts/userContext';
import ButtonIcon from '../../../displays/ButtonIcon/ButtonIcon';
import { Cog6ToothIcon, ArrowRightStartOnRectangleIcon, DocumentMagnifyingGlassIcon, StarIcon, 
	ListBulletIcon, TrophyIcon, ChartBarIcon,
	InboxIcon} from '@heroicons/react/24/solid';
import search from '../../../../images/search.png'
import ApplicationIcon from '../../../displays/ApplicationIcon/ApplicationIcon';
import { Link } from 'react-router-dom';
import { ClientDashboardProps } from './ClientDashboardProps';
import UserController from '../../../../controllers/UserController';


const ClientDashboard = ({}: ClientDashboardProps) => {
	const {user, setUser} = useUserContext();

	const logout = () => {
		setUser(null);
		UserController.logoutUser();
	}

	return (
		<div className="dashboard-container w-full h-full">

			<div className='flex flex-row justify-between px-10 pb-8 pt-1'>
				<div className='flex flex-col items-start bg-white'>
					<h1 className='text-6xl text-primary w-fit'>
						Dashboard
					</h1>
					<h2 className='text-4xl text-secondary w-fit flex items-center flex-col'>
						Welcome, {user?.username}!
						<div className='bg-primary h-[4px] -mt-4 w-[100%]'/>
					</h2>
				</div>
				<Link to='/messages'>
					<ButtonIcon heroicon={<InboxIcon/>} label={"Messages"} text={user?.preferences.hc ? 'text-white' : 'text-black'}/>
				</Link>
			</div>

			<div className="client-butons flex justify-evenly items-center py-10">
				<Link to="/saved" tabIndex={-1}>
					<ButtonIcon heroicon={<StarIcon />} label="Saved Grants" text={user?.preferences.hc ? 'text-white' : 'text-black'}/>
				</Link>
				<Link to="/milestones" tabIndex={-1}>
					<ButtonIcon heroicon={<TrophyIcon />} label="Milestones" text={user?.preferences.hc ? 'text-white' : 'text-black'}/>
				</Link>
				<Link to="/stats">
				<ButtonIcon heroicon={<ChartBarIcon />} label="Statistics" text={user?.preferences.hc ? 'text-white' : 'text-black'}/>
				</Link>
				<Link to='/settings' tabIndex={-1}>
					<ButtonIcon heroicon={<Cog6ToothIcon/>} label={"Settings"} text={user?.preferences.hc ? 'text-white' : 'text-black'}/>
				</Link>
				<Link to="/" tabIndex={-1}>
					<ButtonIcon heroicon={<ArrowRightStartOnRectangleIcon />} label="Log out" callback={logout} text={user?.preferences.hc ? 'text-white' : 'text-black'}/>
				</Link>
			</div>
			
			<div className="application-buttons flex justify-evenly items-center h-1/4 pt-[5vh]">
				<Link to="/grants" tabIndex={-1}>
					<ApplicationIcon
					heroicon={<ListBulletIcon className="h-40 w-40"/>}
					label="View Available Grants" />
				</Link>
				<Link to="/applications" tabIndex={-1}>
					<ApplicationIcon heroicon={<DocumentMagnifyingGlassIcon className="h-40 w-40"/>} label="My Applications" />
				</Link>
			</div>
		</div>
	);
};

export default ClientDashboard