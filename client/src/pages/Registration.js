import React, { useState } from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import './Users.css';

function Registration(){

    const [error, setError] = useState("");

    let navigate = useNavigate();

    const initialValues ={
        email:"",
        password:"",
        role:"buyer"
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().min(5).max(55).email().required(),
        password: Yup.string().min(6).max(8).required(),
        role: Yup.string().required('Please select a role'),
    });

    const onSubmit = (data)=>{
        console.log("data.role = ", data.role )
        if(!data.role){
            alert("Please Select Role!");
            return;
        }
        axios.post("http://localhost:3005/api/users", data)
        .then((response)=>{
            if (response.data.error){
                alert(response.data.error);
            }else{
                navigate("/login");
            }
        }).catch((err)=>{
            console.error('Client-Side Error:', err);
            setError(err.response.data.message);
            return;
        });
    };

    return (
        <div className="centerContainer">
            <h2>Registration</h2>
            {error && <span className="spanred" >Error: {error}</span>}
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Email: </label>
                    <ErrorMessage name="email" component="span" className="spanred"/>
                    <Field className="inputCreatePost" name="email" placeholder="Ex. 123@abc.com"/>
                    
                    <label>password: </label>
                    <ErrorMessage name="password" component="span" className="spanred"/>
                    <Field className="inputCreatePost" type="password" name="password" placeholder="Your password "/>

                    <div id="my-radio-group">Register as: </div>
                    <div role="group" aria-labelledby="my-radio-group">
                        <ErrorMessage name="role" component="span" className="spanred"/>
                        <label>
                            <Field type="radio" className='regRadio' name="role" value="buyer" />
                            Buyer
                        </label>
                        <label>
                            <Field type="radio" className='regRadio' name="role" value="broker" />
                            Broker
                        </label>
                    </div>

                    <button type="submit">Register</button>
                </Form>
            </Formik>
        </div>
    )
    
}

export default Registration;