import React, { useContext,useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form, Formik, Field } from "formik";
import * as Yup from 'yup';
import "./BuyerProfile.css";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";
import {Modal, Button } from 'react-bootstrap';
import Card from "../components/MDBCard";

function BuyerProfile() {
  let navigate=useNavigate();
  const [user, setUser] = useState({});
  //const { id } = useParams();
  const { authState } = useContext(AuthContext);
  const id = authState.id;
  const [favorites, setFavourites]=useState([]);
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object().shape({
    name: Yup.string().nullable(),
    email: Yup.string().email().required(),
    phone: Yup.string().matches(phoneRegExp, 'please enter a valid phone number').min(10, "must be 10 digits").max(10, "must be 10 digits").nullable(),
  });

  //Error Modal section
  const [show, setShow] = useState({ error: "", status: false });
  const handleClose = () => setShow({ error: "", status: false });
  const handleShow = (errorMessage) =>
  setShow({ error: errorMessage, status: true });

  const onSubmit = (data) => {
    axios.patch(`${process.env.REACT_APP_HOST_URL}/api/users/byId`, data,
    { 
      headers: { accessToken: localStorage.getItem("accessToken")}}
    ).then((res) =>{
      console.log(data);
      handleShow("profile updated successfully");
    });
  }
  useEffect(() => {
    if(!localStorage.getItem("accessToken")){
      navigate("/login")
    }else{
      axios.get(`${process.env.REACT_APP_HOST_URL}/api/users/byId`,
      { headers: { accessToken: localStorage.getItem("accessToken") } }
    ).then((res) => {
      setUser(res.data);
      
    })
    
      .catch((error) => {
        handleShow("there is an error");
      });
    
    }
     axios.get(`${process.env.REACT_APP_HOST_URL}/api/favorites`,
     { headers: { accessToken: localStorage.getItem("accessToken") } }
     ).then((res)=>{
      setFavourites(res.data);
     }) 
    
  }, []);

  const displayFavorites = favorites.map((value,key)=>{
    if(Array.isArray(value.Property.Pictures) && value.Property.Pictures.length>0){
      const imageUrl = value.Property.Pictures[0]?.imageUrl;
      return(
        <>
        <Card key={key} id={value.Property.id} img={imageUrl} address={value.Property.address} city={value.Property.city} type={value.Property.type}
            bedrooms={value.Property.bedrooms} bathrooms={value.Property.bathrooms}
            year_built={value.Property.year_built} price={value.Property.price} features={value.Property.features} />
        </>
      )
    }else{
      return(
        <>
        <Card key={key} id={value.Property.id} img={'notFound'} address={value.Property.address} city={value.Property.city} type={value.Property.type}
            bedrooms={value.Property.bedrooms} bathrooms={value.Property.bathrooms}
            year_built={value.Property.year_built} price={value.Property.price} features={value.Property.features} />
        </>
      )
    }
  })

  return (

    <Container className="userProfile">

      <Formik enableReinitialize= {true}
       initialValues={{ name: user.name, email: user.email, phone: user.phone }}
       onSubmit={onSubmit} validationSchema={validationSchema}>

        <Form className='userPanel'>
          <Row>
            <Col>
          <h1>My Profile</h1>
          </Col>
          <Col>
          <button type="submit">change my profile</button>
         
          {/* <button>change password</button> */}
          </Col>
          </Row>
          <label>Name: </label>
          <Field id="buyerInfor" name="name" />
          <label>Email: </label>
          <Field id="buyerInfor" name="email" />
          <label>Phone: </label>
          <Field id="buyerInfor" name="phone" />

        </Form>
      </Formik>
      <div className="listFavorite">
      <h2 className='mt-4' >My Favorite Properties</h2>
      <div className='card-container'> 
        
        {displayFavorites}
        
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

    </Container>

  )
}

export default BuyerProfile
