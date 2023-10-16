import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import './Card.css';
const BrokerCards = ({ name, imgUrl, phone, email }) => {
  return (
   
        <Card style={{ width: '18rem', border:"2px #ededed", margin:'50px',boxShadow:"0 4px 8px 0 rgba(0,0,0,0.2)"}}  >
          {imgUrl !== "notFound" &&
            <Card.Img variant="top" src={imgUrl} alt={name} className='brokerImg'/>
          }
          {imgUrl == "notFound" &&
            <Card.Img variant="left" src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg' alt={name} className='brokerImg'/>
          }

          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              <div>
              <span><PhoneIcon /></span> <span>{phone}</span>
              </div>
              <div>
              <span><MailIcon /></span> <span>{email}</span>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
    
  )
}
export default BrokerCards;