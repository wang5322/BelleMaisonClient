import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";
import "./Card.css";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Axios from "axios";

const Card = ({
  id,
  img,
  address,
  city,
  type,
  bedrooms,
  bathrooms,
  year_built,
  price,
  page,
  isActive,
  features,
}) => {
  // const [isPropActive, setIsPropActive] = useState(true); // toggle property state
  let navigate = useNavigate();

  const handleNavigate = (id) => {
    if (id) {
      navigate(`/property/${id}`);
    } else {
      navigate(`/`);
    }
  };

  const handleUpdate = (id) => {
    if (id) {
      navigate(`/updateProperty/${id}`);
    } else {
      navigate(`/`);
    }
  };

  
  const formattedPrice = price
    ? price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'CAD',
        maximumFractionDigits: 0,
      })
    : 'Price not available'; 

  const toggleActivation = (propertyId) => {
    const newStatus = isActive == 1 ? 0 : 1;
    Axios.patch(
      `${process.env.REACT_APP_HOST_URL}/api/properties/byId/${propertyId}`,
      { isActive: newStatus },
      { headers: { accessToken: localStorage.getItem("accessToken") } }
    )
      .then((response) => {
        if (response.data.error) {
          alert("error in toggling property");
          return;
        }
        // setIsPropActive(!isPropActive);

        alert(`Property is ${isActive == 1 ? `deactivated` : `activated`}`);
        isActive = 0;
        window.location.reload();
      })
      .catch((error) => {
        alert("error in toggling property");
      });
  };
  return (
    <>
      <MDBCard className="propCard" key={id}>
        <MDBRipple
          rippleColor="light"
          rippleTag="div"
          className="bg-image hover-overlay"
        >
          {img !== "notFound" && (
            <img
              className="card-img"
              src={img}
              alt={type}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
              }}
            />
          )}
          {img === "notFound" && (
            <img
              className="card-img"
              src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
              alt={type}
            />
          )}
        </MDBRipple>
        <MDBCardBody>
          <MDBCardTitle>{formattedPrice}</MDBCardTitle>
          <div className="propertyInfo">
            <p>
              {type} Built at: {year_built}
            </p>
            <p>
              {address} , {city}
            </p>
            {/* <p>bedrooms: {bedrooms} , bathrooms: {bathrooms}</p> */}
            <span>
              <BedIcon />
              Bedrooms: {bedrooms}
            </span>
            <br></br>
            <span>
              <BathtubIcon />
              Bathrooms: {bathrooms}{" "}
            </span>
            {/* <p>{features}</p> */}
          </div>
          <Button variant="dark" onClick={() => handleNavigate(id)}>
            View
          </Button>
          {page === "broker" && (
            <>
              {" "}
              <Button
                variant="dark"
                className="mx-2"
                onClick={() => handleUpdate(id)}
              >
                Update
              </Button>
              <Button
                variant={isActive == 1 ? "outline-danger" : "outline-dark"}
                onClickCapture={() => {
                  toggleActivation(id);
                }}
              >
                {isActive == 1 ? "Deactivate" : "Activate"}
              </Button>
            </>
          )}
        </MDBCardBody>
      </MDBCard>
    </>
  );
};

export default Card;
