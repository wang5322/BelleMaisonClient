import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import MDBCard from "../components/MDBCard";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

function BrokerInfoPage() {
  const { id } = useParams();
  //   const [brokerId, setBrokerId] = useState("");
  const [broker, setBroker] = useState({});
  const [profile, setProfile] = useState({});
  const [certificates, setCertificates] = useState([]);
  const [properties, setProperties] = useState([]);

  //Get broker info & properties info
  useEffect(() => {
    // TODO:use id param
    Axios.get(`${process.env.REACT_APP_HOST_URL}/api/users/brokerInfo/${id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        // console.log("====entered response======");
        console.log("user Info======", response.data);
        setBroker(response.data);
        const certificatePictures = [];
        //Seperate profile picture and certificate pictures
        if (response.data.Pictures.length > 0) {
          for (let i = 0; i < response.data.Pictures.length; i++) {
            if (!response.data.Pictures[i].isCertificate) {
              setProfile(response.data.Pictures[i]);
            } else {
              certificatePictures.push(response.data.Pictures[i]);
            }
          }
          setCertificates(certificatePictures);
        }
      })
      .catch((error) => {
        alert(error);
        // if (error.response.data.message) {
        //   handleShow(error.response.data.message);
        // } else {
        //   handleShow("There is an error occured while getting broker info");
        // }
      });

    let filteredProperties = [];
    Axios.get(`${process.env.REACT_APP_HOST_URL}/api/properties`)
      .then((response) => {
        const numberId = parseInt(id, 10); // id that passed from params is a string
        // Filter out elements where brokerId is not equal to id
        filteredProperties = response.data.filter((property) => {
          console.log(
            "property.broker_id:",
            property.broker_id,
            typeof property.broker_id
          );
          console.log("id:", id, typeof id);
          return property.broker_id === numberId;
        });
        // Now, filteredProperties contains only elements where brokerId === id
        console.log("filteredProperties===", filteredProperties);
        setProperties(filteredProperties);
      })
      .catch((error) => {
        alert(error);
      });
  }, [id]);

  const displayProperties = properties.map((property) => {
    if (Array.isArray(property.Pictures) && property.Pictures.length > 0) {
      // Access the first picture's imageUrl
      const imageUrl = property.Pictures[0].imageUrl;
      return (
        <MDBCard
          key={property.id}
          id={property.id}
          img={imageUrl}
          address={property.address}
          city={property.city}
          type={property.type}
          bedrooms={property.bedrooms}
          bathrooms={property.bathrooms}
          year_built={property.year_built}
          price={property.price}
          features={property.features}
        />
      );
    } else {
      return (
        <MDBCard
          key={property.id}
          id={property.id}
          img={"notFound"}
          address={property.address}
          city={property.city}
          type={property.type}
          bedrooms={property.bedrooms}
          bathrooms={property.bathrooms}
          year_built={property.year_built}
          price={property.price}
          features={property.features}
        />
      );
    }
  });
  return (
    <div>
      <Container>
        <Card className="broker-info mb-4">
          <Row>
            <Col className="picture-left" md={4}>
              <div className="px-5 py-5">
                <img
                  className="profile"
                  src={
                    profile && Object.keys(profile).length !== 0
                      ? profile.imageUrl
                      : "https://cdn.vectorstock.com/i/preview-1x/21/23/avatar-photo-default-user-icon-person-image-vector-47852123.jpg"
                  }
                  alt="Selected"
                />
              </div>
            </Col>
            <Col className="info-right" md={8}>
              <h2 className="mt-5">{broker.name}</h2>
              <hr></hr>
              <h4>{broker.phone}</h4>
              <h5>{broker.email}</h5>
              <p className="mt-5">{broker.address}</p>
            </Col>
          </Row>
        </Card>
        <Row classNmae="certificate">
          {/* <div className="d-flex justify-content-center"> */}
          <div className="d-flex flex-column align-items-center">
            <h2>Certificates</h2>
            <div className="certificates">
              {certificates && Object.keys(certificates).length !== 0
                ? certificates.map((certificate) => (
                    <img
                      style={{ width: "300px" }}
                      key={certificate.id}
                      src={certificate.imageUrl}
                      alt="Certificate"
                    />
                  ))
                : null}
            </div>
          </div>
          <hr></hr>
        </Row>
        <Row className="property-list">
          <div className="d-flex flex-column align-items-center">
            <h2>Broker's properties</h2>
            <div className="card-container">{displayProperties}</div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default BrokerInfoPage;
