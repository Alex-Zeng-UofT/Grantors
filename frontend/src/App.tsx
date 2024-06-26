import { Route, Routes } from "react-router-dom";
import Navbar from "./components/nav-bar/Navbar";
import Home from "./components/home-page/nav-bar/Home";
import Login from "./components/login-page/Login";
import SignUp from "./components/signup-page/SignUp";
import { UserContextProvider } from "./components/contexts/userContext";
import {CreateGrant, EditGrant} from "./components/admin-grant-managment";
import GrantBrowse from "./components/grant-browse/GrantBrowse";
import AdminApplicationList from "./components/home-page/nav-bar/admin-dashboard/AdminApplicationList";
import GrantPage from "./components/grant-page/GrantPage";
import ClientApplicationList from "./components/home-page/nav-bar/client-dashboard/ClientApplicationList";
import AdminGrants from "./components/home-page/nav-bar/admin-dashboard/admin-grants/AdminGrants";
import SavedGrants from "./components/saved-grants/SavedGrants";
import GrantApply from "./components/grant-apply/GrantApply";
import ApplicationReview from "./components/applications/admin/ApplicationReview";
import DefaultPage from "./components/home-page/nav-bar/default-page/DefaultPage";
import { GrantStatsPage } from "./components/grant-stats-page/GrantStatsPage";
import TestFileDisplay from "./components/files/TestFileDisplay";
import ApplicationView from "./components/home-page/nav-bar/client-dashboard/ApplicationView"
import NotFoundPage from "./components/not-found-page/NotFoundPage";
import SubmittedView from "./components/home-page/nav-bar/client-dashboard/SubmittedApplicationView"
import Settings from "./components/settings-page/Settings";
import React, { useEffect } from 'react';
import Background from "./components/background/Background";
import FundingView from "./components/applications/admin/fundingView"
import { MessageBoard } from "./components/messages/message-board/MessageBoard";
import UserList from "./components/user-list/UserList/UserList";
import EditUser from "./components/settings-page/EditUser";
import MilestonesPage from "./components/milestones-page/MilestonesPage";
import { MessageView } from "./components/messages/MessageView";
import UserStats from "./components/user-list/UserList/UserStats";



function App() {

	useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.altKey || event.metaKey) && event.key === 'h') {
                window.location.href = '/'; 
            }
			if ((event.altKey || event.metaKey) && event.key === 'g') {
                window.location.href = '/grants'; 
            }
			if ((event.altKey || event.metaKey) && event.key === 'i') {
                window.location.href = '/applications'; 
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

	return (
		<div className="App w-full h-full">
			
			{UserContextProvider(
				<div>
					<Background />

					<Routes>
						<Route path="/" element={<Navbar />}>
							<Route index element={<Home />} />
							<Route path="about" element={<DefaultPage />} />
							<Route path="files" element={<TestFileDisplay />} />
							<Route path="login" element={<Login />} />
							<Route path="signup" element={<SignUp adminCreate={false}/>} />
							<Route path="newUser" element={<SignUp adminCreate={true}/>} />
							<Route path="createGrant" element={<CreateGrant />} />
							<Route path="editGrant/:grantID" element={<EditGrant />} />
							<Route path="users" element={<UserList />} />
							<Route path="users/:userID/" element={<EditUser/>} />
							<Route path="users/:userID/stats" element={<UserStats/>} />
							<Route path="grants" element={<GrantBrowse />} />
							<Route path="grants/:grantID" element={<GrantPage />} />
							<Route path="admin/grants" element={<AdminGrants />} />
							<Route path="admin/grants/:grantID" element={<EditGrant />} />
							<Route path="saved" element={<SavedGrants />} />
							<Route path=":organization/applications" element={<AdminApplicationList/>} />
							<Route path="applications" element={<ClientApplicationList />} />
							<Route path="grants/:grantID/apply" element={<GrantApply />} /> 
							<Route path="application/:applicationID/review" element={<ApplicationReview />} />
							<Route path="applications/:applicationID/funding" element={<FundingView />} />
							<Route path="applications/:applicationID" element={<ApplicationView />} />
							<Route path="applications/submitted/:applicationID" element={<SubmittedView/>} />
							<Route path="messages" element={<MessageBoard />} />
							<Route path="messages/:messageID" element={<MessageView />} />
							<Route path="milestones" element={<MilestonesPage />} />
							<Route path="settings" element={<Settings />} />
							<Route path="*" element={<NotFoundPage />} />
							<Route path="/stats" element={<GrantStatsPage />} />
					</Route>
					</Routes>
				</div>
			)}
		</div>
	);
};

export default App;