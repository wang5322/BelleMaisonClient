//import { BsFillBagFill } from "react-icons/bs";
import './Card.css';
import React from 'react';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const myCard = ({ img, address, city, type, bedrooms, bathrooms, year_built, price, features }) => {
  return (
    <>
        {/* <div className="card">
            <img src='https://mdbootstrap.com/img/new/standard/nature/111.webp' alt={year_built} className="card-img" />
            <div className="card-details">
                <h3 className="card-title">${price}</h3>
                <div className="propertyInfo">
                    <h6>{type} Built at: {year_built}</h6>
                    <h6>{address} , {city}</h6>
                    <h6>bedrooms: {bedrooms} , bathrooms: {bathrooms}</h6>
                    <h6>{features}</h6>
                </div>
            </div>
        </div> */}
      <Card>
        <Card.img variant="top" className='card-img' src={img} fluid alt={type} 
                      // onError={({currentTarget})=>{
                      //   currentTarget.onerror=null; 
                      //   currentTarget.src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'}} 
        />
          <Card.Body>
            <Card.Title>${price}</Card.Title>
            <Card.Text>
                <p>{type} Built at: {year_built}</p>
                <p>{address} , {city}</p>
                {/* <p>bedrooms: {bedrooms} , bathrooms: {bathrooms}</p> */}
                <span><BedIcon />Bedrooms: {bedrooms}</span><br></br>
                <span><BathtubIcon />Bathrooms: {bathrooms} </span>
                {/* <p>{features}</p> */}
            </Card.Text>
            {/* <Button variant="primary" href='/property'>Detail</Button> */}
        </Card.Body>
      </Card>
    </>
  );
};

export default myCard;