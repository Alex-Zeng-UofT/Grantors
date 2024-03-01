import { Route, Routes } from "react-router-dom";
import Navbar from "./components/nav-bar/Navbar";
import Home from "./components/home-page/nav-bar/Home";
import Login from "./components/login-page/Login";
import SignUp from "./components/signup-page/SignUp";
import { UserContextProvider, useUserContext } from "./components/contexts/userContext";
import { User, UserType } from "./components/interfaces/user";
import { useEffect, useState } from "react";


function App() {

  /* Testing here */
  const testUser: User = {id: 1, type: UserType.Admin, username: "testName"};
  const {user, setUser} = useUserContext();

  return (
    <div className="App" style={AppStyle}>
      {UserContextProvider(
        <Routes>
            <Route path="/" element={<Navbar prop1="test" prop2={[]} prop3={false}/>}>
              <Route index element={<Home />} />
              <Route path="about" element={<Home />} />
              <Route path="services" element={<Home />} />
              <Route path="gallery" element={<Home />} />
              <Route path="contact" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
          </Routes>
        )}
    </div>
  );
}

export default App;

const AppStyle = {
  height: "100vh",
  width: "100vw",
}
