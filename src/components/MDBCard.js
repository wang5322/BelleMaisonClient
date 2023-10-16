import React from "react";
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
  features,
}) => {
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
          {/* <a>
                <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                </a> */}
        </MDBRipple>
        <MDBCardBody>
          <MDBCardTitle>${price}</MDBCardTitle>
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
            <Button
              variant="dark"
              className="mx-2"
              onClick={() => handleUpdate(id)}
            >
              Update
            </Button>
          )}
        </MDBCardBody>
      </MDBCard>
    </>
  );
};

export default Card;
