import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  DistanceMatrixService,
  GoogleMap,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { setKey, fromAddress } from "react-geocode";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ImageGallery from "react-image-gallery";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { AuthContext } from "../helpers/AuthContext";
import Calculator from "../components/Calculator";
import BrokerCard from "../components/BrokerCard";
import "../Property.css";

const SingleProperty = () => {
  const [pictures, setPictures] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);

  //save favourite
  const [liked, setLiked] = useState(false);

  //map
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  // set key for react-geocode
  setKey(process.env.REACT_APP_GOOGLE_API_KEY);

  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [destination, setDestination] = useState({ lat: 0, lng: 0 });
  const [property, setProperty] = useState({});
  const [distance, setDistance] = useState(0);
  let loggedInUserId = 0;

  const { id } = useParams();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_HOST_URL}/api/users/auth`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            email: response.data.email,
            id: response.data.id,
            role: response.data.role,
            approval: response.data.broker_approval,
            status: true,
          });
          loggedInUserId = response.data.id;
        }
        return axios.get(`${process.env.REACT_APP_HOST_URL}/api/pictures/byProp/${id}`)
      })
      .then((response) => {
        let tempPictures = [];
        response.data.forEach((x) => {
          tempPictures.push({
            original: x.imageUrl,
            thumbnail: x.imageUrl,
          });
        });
        setPictures(tempPictures);
        return axios.get(`${process.env.REACT_APP_HOST_URL}/api/properties/byId/${id}`)
      })
      .then((res) => {
        setProperty(res.data);
        setLiked(res.data.Favorites.some(favorite => favorite.user_id === loggedInUserId));
        const tempAddress = `${res.data.address},${res.data.city}`;
        return fromAddress(tempAddress);
      })
      .then((res) => {
        setCenter(res.results[0].geometry.location);
        return fromAddress("4330 Sherbrooke St W, Westmount, Quebec H3Z 1E2");
      })
      .then((res) => {
        setDestination(res.results[0].geometry.location);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const likeAProperty = (property_id) => {
    if (authState.status) {
      axios.post(
          `${process.env.REACT_APP_HOST_URL}/api/favorites`,
          { property_id: property_id },
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        )
        .then((res) => {
          setLiked(res.data.liked);
          if (res.data.liked) {
            return {
              ...property,
              Favorites: [{ ...property.Favorite, user_id: authState.id }],
            };
          } else {
            const likesArray = property.Favorites;
            likesArray.pop();
            return { ...property, Favorites: likesArray };
          }
        });
    } else {
      alert("please login before like");
    }
  };

  return (
    <div className="property">
      <Container className="mt-5 mb-5">
        <Row>
          <div className="col-lg-12">
            <div className="fd-top property-detail-content">
              <div>
                <h3 className="property-detail-title">House for sale</h3>
                <p className="address">
                  <FmdGoodIcon />
                  {property.address}, {property.city}, {property.postal}
                </p>
              </div>
              <div>
                {liked ? (
                  <FavoriteIcon
                    onClick={() => {
                      likeAProperty(property.id);

                    }}
                    className="likeBttn"
                  // className={liked ? "likeBttn" : "unlikeBttn"}

                  />
                ) : (
                  <FavoriteBorderIcon
                    onClick={() => {
                      likeAProperty(property.id);

                    }}
                    className="unlikeBttn"
                  // className={liked ? "likeBttn" : "unlikeBttn"}

                  />

                )
                }
                <span className="price">${property.price}</span>
              </div>
            </div>
            <ImageGallery
              flickThreshold={0.5}
              slideDuration={0}
              items={pictures}
              showNav={false}
              showFullscreenButton={true}
              showPlayButton={false}
            />
          </div>
          <Row>
            <div className="col-lg-8">
              <div className="property-item">
                <h4>Description</h4>
                <p>{property.description}</p>
              </div>
              <div className="property-item property-detail">
                <h4>Features</h4>
                <div className="row">
                  <div className="col-lg-4">
                    <span>{property.rooms} Rooms </span>
                  </div>
                  <div className="col-lg-4">
                    <span>
                      <BathtubIcon />
                      Bathrooms{" "}
                    </span>
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className="col-lg-4">
                    <span>
                      <BedIcon />
                      Bedrooms:{" "}
                    </span>
                    <span>{property.bedrooms}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4">
                    <span>Year built: </span>
                    <span>{property.year_built}</span>
                  </div>
                  <div className="col-lg-4">
                    <span>Building Style: </span>
                    <span>{property.type}</span>
                  </div>
                  <div className="col-lg-4">
                    <span>{property.features}</span>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Row>

        <Row>
          <Col md={6}>
            <div
              className="Calculator"
              style={{ maxWidth: 500, margin: "1rem auto" }}
            >
              <div>
                <h2>Mortgage Calculator</h2>
                <Calculator />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <h2>result</h2>
          </Col>
        </Row>
        {/* </Container>
      <Container className="mt-5 mb-5"> */}
        <Row>
          <Col md={6}>
            <h2>View on Map</h2>
            <p>distance to John Abott College: {distance}</p>
          </Col>

          <Col md={6}>
            <div className="SingleProperty">
              {!isLoaded ? (
                <h1>Loading...</h1>
              ) : (
                <GoogleMap
                  mapContainerClassName="map-container"
                  center={center}
                  zoom={10}
                >
                  <MarkerF
                    position={center}
                    icon="http://maps.google.com/mapfiles/kml/pal2/icon10.png"
                  />
                  <MarkerF
                    position={destination}
                    icon="http://maps.google.com/mapfiles/kml/pal2/icon10.png"
                  />
                  <DistanceMatrixService
                    options={{
                      origins: [center],
                      destinations: [destination],
                      travelMode: "DRIVING",
                    }}
                    callback={(response) => {
                      const distance = response.rows[0].elements[0].distance;
                      if (distance) setDistance(distance.text);
                    }}
                  />
                </GoogleMap>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SingleProperty;
