import React from "react";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Users.css";

export default function () {
  const { email, otp } = useContext(AuthContext);
  const [timerCount, setTimer] = React.useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);
  let navigate = useNavigate();

//   function resendOTP() {
//     if (disable) return;
//     axios
//       .post("http://localhost:5000/send_recovery_email", {
//         OTP: otp,
//         recipient_email: email,
//       })
//       .then(() => setDisable(true))
//       .then(() => alert("A new OTP has succesfully been sent to your email."))
//       .then(() => setTimer(60))
//       .catch(console.log);
//   }

  function verfiyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      navigate("/users/resetPass");
      return;
    }
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;
  }

//   React.useEffect(() => {
//     let interval = setInterval(() => {
//       setTimer((lastTimerCount) => {
//         lastTimerCount <= 1 && clearInterval(interval);
//         if (lastTimerCount <= 1) setDisable(false);
//         if (lastTimerCount <= 0) return lastTimerCount;
//         return lastTimerCount - 1;
//       });
//     }, 1000); //each count lasts for a second
//     //cleanup the interval on complete
//     return () => clearInterval(interval);
//   }, [disable]);

  return (
    <main className="main-content">
        <div className="centerContainer">
            <h2 className="m-3">Email Verification</h2> 
            <div className="wrapper">
                <div className="">
                    <div className="optInfo">
                        <p>We have sent a code to your email {email}</p>
                    </div>

                    <div>
                        <form>
                            <div className="otpContainer">

                                <div className="">
                                    <input maxLength="1" className="" type="text" name="" id=""
                                        onChange={(e) =>
                                            setOTPinput([
                                                e.target.value,
                                                OTPinput[1],
                                                OTPinput[2],
                                                OTPinput[3],
                                            ])
                                        }
                                    ></input>
                                </div>
                                <div className="">
                                        <input maxLength="1" className="" type="text" name="" id=""
                                            onChange={(e) =>
                                                setOTPinput([
                                                OTPinput[0],
                                                e.target.value,
                                                OTPinput[2],
                                                OTPinput[3],
                                                ])
                                            }
                                        ></input>
                                </div>
                                <div className="">
                                        <input maxLength="1" className="" type="text" name="" id=""
                                            onChange={(e) =>
                                                setOTPinput([
                                                OTPinput[0],
                                                OTPinput[1],
                                                e.target.value,
                                                OTPinput[3],
                                                ])
                                            }
                                        ></input>
                                </div>
                                <div className="">
                                    <input maxLength="1" className="" type="text" name="" id=""
                                        onChange={(e) =>
                                            setOTPinput([
                                            OTPinput[0],
                                            OTPinput[1],
                                            OTPinput[2],
                                            e.target.value,
                                            ])
                                        }
                                    ></input>
                                </div>
                            </div>

                            <div className="">
                                <div style={{margin:20, fontSize:20}}>
                                    <a
                                        onClick={() => verfiyOTP()}
                                        className=""
                                    >
                                        Verify Account
                                    </a>
                                </div>

                                {/* <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Didn't recieve code?</p>{" "}
                                        <a
                                            className="flex flex-row items-center"
                                            style={{
                                                color: disable ? "gray" : "blue",
                                                cursor: disable ? "none" : "pointer",
                                                textDecorationLine: disable ? "none" : "underline",
                                            }}
                                            onClick={() => resendOTP()}
                                        >
                                            {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                                        </a>
                                </div> */}
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
}