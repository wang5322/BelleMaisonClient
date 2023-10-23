import React from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Users.css";
import { useState } from "react";
import { Modal,Button } from "react-bootstrap";

export default function ResetPass() {
    const { email } = useContext(AuthContext);
    let navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    //Error Modal section
    const [show, setShow] = useState({ error: "", status: false });
    const handleClose = () => setShow({ error: "", status: false });
    const handleShow = (errorMessage) =>
    setShow({ error: errorMessage, status: true });

    function changePassword() {
        console.log("change password");
        if(password!==confirmPassword){
            setErrorMessage('Password not match!'); // Set the error message
            return;
        }
        axios
            .patch(`${process.env.REACT_APP_HOST_URL}/api/users/resetpass`,
                { email: email, password: password },
            )
            .then((response) => {
                if (response.data=='true') {
                    handleShow("Your password succesfully set, you can login now")
                    navigate("/login");
                } else {
                    handleShow(response.data.error);
                }
            });
        
    }

  return (
    <main className="main-content">
        <div className="centerContainer">
            <h2> Change Password</h2>
            <div className="wrapper">
                <div>
                    <div>
                        <div>
                            <label htmlFor="password" className="pasLabel">
                                New Password
                            </label>
                            <input onChange={(e) =>setPassword(e.target.value)} type="password" 
                                name="password" id="password" placeholder="••••••••" required="">
                            </input>
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="pasLabel">
                                Confirm password
                            </label>
                            <input onChange={(e) =>setConfirmPassword(e.target.value)} type="password"
                                name="confirm-password" id="confirm-password" placeholder="••••••••" required="">
                            </input>
                        </div>
                    </div>

                    <div>
                        {errorMessage&&<div className="spanred">{errorMessage}</div>}
                        <button className="passBtn" onClick={() => changePassword()}> Reset passwod</button>
                    </div>
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