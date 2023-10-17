import React from "react";
import Card from "react-bootstrap/Card";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import "./Card.css";
import { useNavigate } from "react-router-dom";
const BrokerCards = ({ brokerId, name, imgUrl, phone, email }) => {
  const navigate = useNavigate();
  return (
    <Card
      style={{
        width: "19rem",
        border: "2px #ededed",
        margin: "50px",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      }}
    >
      {imgUrl !== "notFound" && (
        <Card.Img variant="top" src={imgUrl} alt={name} className="brokerImg" />
      )}
      {imgUrl === "notFound" && (
        <Card.Img
          variant="left"
          src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
          alt={name}
          className="brokerImg"
        />
      )}

      <Card.Body
        style={{ cursor: "pointer" }}
        onClickCapture={() => {
          navigate(`/broker/${brokerId}`);
        }}
      >
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          <div>
            <span>
              <PhoneIcon />
            </span>{" "}
            <span>{phone}</span>
          </div>
          <div>
            <span>
              <MailIcon />
            </span>{" "}
            <span>{email}</span>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default BrokerCards;
