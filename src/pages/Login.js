import React, { useState, useContext } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "./Users.css";

function Login() {
  const { authState, setAuthState } = useContext(AuthContext);

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
      .post("http://localhost:3005/api/users/login", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            email: response.data.email,
            id: response.data.id,
            role: response.data.role,
            approval: response.data.broker_approval,
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

  return (
    <main className="main-content">
    <div className="centerContainer">
      <h2>Login</h2>
      {/* <div className="formContainer">
            <label>Username:</label>
            <input className="inputCreatePost" type="text" onChange={(event) => {setUsername(event.target.value);}}/>
            <label>Password:</label>
            <input className="inputCreatePost" type="password" onChange={(event) => { setPassword(event.target.value);}}/>

            <button onClick={login}> Login </button>
        </div> */}
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
          <ErrorMessage name="password" component="span" className="spanred" />
          <Field
            className="inputCreatePost"
            type="password"
            name="password"
            placeholder="Your password "
          />
          <button type="submit">Login</button>
        </Form>
      </Formik>
      
    </div>
    </main>
  );
}

export default Login;
