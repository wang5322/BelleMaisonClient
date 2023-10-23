import React, { useContext } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Modal,Button } from "react-bootstrap";
import * as Yup from "yup";
import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "./Users.css";
import { useState } from "react";

function Login() {
  const { authState, setAuthState, setOTP, email, setEmail} = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');

  const initialValues = {
    email: "",
    password: "",
  };

  //Error Modal section
  const [show, setShow] = useState({ error: "", status: false });
  const handleClose = () => setShow({ error: "", status: false });
  const handleShow = (errorMessage) =>
  setShow({ error: errorMessage, status: true });
  
  const validationSchema = Yup.object().shape({
    email: Yup.string().min(5).max(55).email().required(),
    password: Yup.string().min(6).max(8),
  });

  let navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('onSubmit');
    axios
      .post(`${process.env.REACT_APP_HOST_URL}/api/users/login`, data)
      .then((response) => {
        if (response.data.error) {
          // alert(response.data.error);
          handleShow(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            email: response.data.email,
            id: response.data.id,
            role: response.data.role,
            approval: response.data.approval,
            status: true,
          });

          if (response.data.role !== "admin") {
            navigate("/");
          } else {
            navigate("/admin/users");
          }
        }
      });
  };

  function nagigateToOtp(email) {
    setEmail(email);
    if (email) {
      console.log("email=",email);
      axios
        .get(`${process.env.REACT_APP_HOST_URL}/api/users/checkemail/${email}`)
        .then((response) => {
          console.log('in then block',response.data.status);
            setErrorMessage('');
        })
        .catch((err)=>{
            if(err.response.status==516){
              setErrorMessage("This email does not exist in our system.")
              return;
            }
        });
      

      const OTP = Math.floor(Math.random() * 9000 + 1000);
      setOTP(OTP);

      axios
        .post(`${process.env.REACT_APP_HOST_URL}/api/users/send_recovery_email`, {
          OTP,
          recipient_email: email,
        })
        .then(() => navigate("/users/otpInput"))
        .catch(console.log);
      return;
    }else{
      setErrorMessage('Please input your email address!');
    }
  }

  return (
    <main className="main-content">
      <div className="centerContainer">
        <h2 className="m-3">Please Login</h2> 
        <div className="wrapper">
          <div className="left">
            <a
              href={`${process.env.REACT_APP_HOST_URL}/api/passport/facebook`}
              className="loginButton facebook"
            >
              <FacebookIcon />
              Facebook
            </a>
          </div>

          <div className="center">
            <div className="line" />
            <div className="or">OR</div>
          </div>
          
          <div className="right">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {(formikProps) => (
                  <Form className="formContainer">
                    {errorMessage&&<div className="spanred">{errorMessage}</div>}
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
                        onClick={() => {
                          const email = formikProps.values.email; 
                          nagigateToOtp(email)}}
                        className="text-gray-800"
                        style={{margin:30}}
                      >
                        Forgot password?
                      </a>
                    <button type="submit">Login</button>
                  </Form>
              )}
            </Formik>
          </div>
        </div>
        {/* Modal rendering */}
        <Modal show={show.status} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Oops!</Modal.Title>
          </Modal.Header>
          <Modal.Body>{show.error}</Modal.Body>
          <Modal.Footer>
            <Button
              className="bluButton"
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </main>
  );
}

export default Login;
