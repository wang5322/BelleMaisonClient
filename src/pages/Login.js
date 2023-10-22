import React, { useState, useContext } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "./Users.css";

function Login() {
  const { authState, setAuthState, setOTP} = useContext(AuthContext);
  //facebook login
  // const facebook = () => {
  //   window.open(`${process.env.REACT_APP_HOST_URL}/auth/facebook`, "_self");
  // };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().min(5).max(55).email().required(),
    password: Yup.string().min(6).max(8).required(),
  });

  let navigate = useNavigate();
  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_HOST_URL}/api/users/login`, data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            email: response.data.email,
            id: response.data.id,
            role: response.data.role,
            approval: response.data.approval,
            status: true,
          });
          console.log("login page id saved as " + authState);
          if (response.data.role !== "admin") {
            navigate("/");
          } else {
            navigate("/admin/users");
          }
        }
      });
  };

  function nagigateToOtp() {
    if (authState.email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);
      setOTP(OTP);

      axios
        .post("http://localhost:3005/users/send_recovery_email", {
          OTP,
          recipient_email: authState.email,
        })
        .then(() => navigate("/users/otpInput"))
        .catch(console.log);
      return;
    }
    return alert("Please enter your email"); 
  }
  return (
    <main className="main-content">
      <div className="centerContainer">
        <h2 className="m-3">Choose a Login Method</h2> 
        <div className="wrapper">
           {/*<div className="formContainer">
            <label>Username:</label>
            <input className="inputCreatePost" type="text" onChange={(event) => {setUsername(event.target.value);}}/>
            <label>Password:</label>
            <input className="inputCreatePost" type="password" onChange={(event) => { setPassword(event.target.value);}}/>

            <button onClick={login}> Login </button>
        </div> */}
          {/* <div className="left">
            <div className="loginButton facebook" onClick={facebook}>
              <FacebookIcon />
              Facebook
            </div>
          </div>
          <div className="center">
            <div className="line" />
            <div className="or">OR</div>
          </div> */}
          {/* <div className="right"> */}
          <div>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form className="formContainer">
                <label>Email: </label>
                <ErrorMessage name="email" component="span" className="spanred" />
                <Field
                  className="inputCreatePost"
                  name="email"
                  placeholder="Ex. 123@abc.com"
                />

                <label>password: </label>
                <ErrorMessage
                  name="password"
                  component="span"
                  className="spanred"
                />
                <Field
                  className="inputCreatePost"
                  type="password"
                  name="password"
                  placeholder="Your password "
                />

                  <a
                    href="#"
                    onClick={() => nagigateToOtp()}
                    className="text-gray-800"
                  >
                    Forgot password?
                  </a>
                <button type="submit">Login</button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
