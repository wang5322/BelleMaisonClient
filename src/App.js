import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Switch is replaced by Routes
import TestPicture from "./pages/TestPicture";
import SingleProperty from "./pages/SingleProperty";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PostProperty from "./pages/PostProperty";
import BrokerList from "./pages/BrokerList";
import BuyerProfile from "./pages/BuyerProfile";
import BrokerProfile from "./pages/BrokerProfile";
import AdminProperty from "./pages/AdminProperty";
import AdminUser from "./pages/AdminUser";
import Navbar2 from "./components/Navbar";
import PageNotFound from './pages/PageNotFound';
import { AuthContext } from "./helpers/AuthContext";
import { useContext } from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import AppFooter from './components/Footer';

import UpdateProperty from "./pages/UpdateProperty";

function App() {
  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    role: "",
    approval: 0,
    status: false,
  });

  // useEffect(() => {
  //   // This effect will run whenever authState changes
  //   console.log('======authState has changed:==========', authState);

  //   // You can perform actions based on the new authState here
  // }, [authState]);

  useEffect(()=>{
    axios.get(`http://localhost:3005/api/users/auth`, {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }).then((response)=>{
      if(response.data.error){
        setAuthState({...authState, status: false});
      }else{
        setAuthState({
          email: response.data.email,
          id: response.data.id,
          role: response.data.role,
          approval: response.data.broker_approval,
          status: true,
        });
      }
    });
  },[]);

  return (
    <div className="app-container">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        {/* <Navbar /> */}
        <Navbar2 />
        <Router>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/testPicture" exact element={<TestPicture />} />
            <Route path="/property/:id" exact element={<SingleProperty />} />
            <Route path="/register" exact element={<Registration />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/brokerList" exact element={<BrokerList />} />
            <Route path="/postProperty" exact element={<PostProperty />} />
            <Route path="/updateProperty/:id" exact element={<UpdateProperty />} />
            <Route path="/myProfile/user" exact element={<BuyerProfile />} />
            <Route path="/myProfile/broker" exact element={<BrokerProfile />} />
            <Route path="*" exact element={<PageNotFound />} />
            <Route path="/admin/users" exact element={<AdminUser />} />
            <Route path="/admin/properties" exact element={<AdminProperty />} />
          </Routes>
        </Router>
        <footer id="footer">
          <AppFooter />
        </footer>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
