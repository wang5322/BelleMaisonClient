import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Card, FloatingLabel, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import Axios from "axios";
import "../css/main.css";
import MDBCard from "../components/MDBCard";
import CertiGallery from "../components/PropUpdateImageList";
import * as Yup from "yup";

function BrokerProfile() {
  //   const id = 15;
  const [brokerId, setBrokerId] = useState("");
  const [broker, setBroker] = useState({});
  const [files, setFiles] = useState([]);
  const [profile, setProfile] = useState({});
  const [certificates, setCertificates] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // Set the selected image to the data URL
        setSelectedImage(reader.result);
      };
    }
  };

  const uploadFiles = (isCertificate) => {
    if (files && files.length > 0) {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("images", file);
      });
      console.log("====button clicked====");

      console.log("Broker Id is", brokerId);
      formData.append("brokerId", brokerId);
      if (isCertificate) {
        formData.append("isCertificate", isCertificate);
      }
      Axios.post(`${process.env.REACT_APP_HOST_URL}/api/pictures`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          console.log("pictureId", response.data.id);
          window.location.reload();
        })
        .catch((error) => {
          if (error.response.data.message) {
            handleShow(error.response.data.message);
          } else {
            handleShow(
              "There is an error occured while adding profile picture"
            );
          }
        });
      setFiles([]);
      // window.location.reload();
    } else {
      console.log("No files selected");
    }
  };

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
          page="broker"
          isActive={property.isActive}
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
          page="broker"
          features={property.features}
        />
      );
    }
  });

  //Error Modal section
  const [show, setShow] = useState({ error: "", status: false });
  const handleClose = () => setShow({ error: "", status: false });
  const handleShow = (errorMessage) =>
    setShow({ error: errorMessage, status: true });

  //Profile Modal section
  const [showProfileEdit, setProfileEdit] = useState(false);
  const handleProfileClose = () => {
    setProfileEdit(false);
    setSelectedImage(null);
  };
  const handleProfileShow = () => setProfileEdit(true);

  const deleteProfile = (profilId) => {
    Axios.delete(`${process.env.REACT_APP_HOST_URL}/api/pictures/${profilId}`)
      .then(() => {
        setProfile({});
      })
      .catch((error) => {
        if (error.response.data.message) {
          handleShow(error.response.data.message);
        } else {
          handleShow(
            "There is an error occured while deleting profile picture"
          );
        }
      });
  };
  //Get broker info & properties info
  useEffect(() => {
    // console.log("======entered useEffect=========");
    Axios.get(`${process.env.REACT_APP_HOST_URL}/api/users/byId`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        setBroker(response.data);
        setBrokerId(response.data.id);
        const certificatePictures = [];

        //Seperate profile picture and certificate pictures
        if (response.data.Pictures.length > 0) {
          for (let i = 0; i < response.data.Pictures.length; i++) {
            if (!response.data.Pictures[i].isCertificate) {
              setProfile(response.data.Pictures[i]);
            } else {
              //use array instead of setState in a loop, due to the asynchronous nature of state updates
              certificatePictures.push(response.data.Pictures[i]);
            }
          }
          // Update certificates state after the loop
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

    Axios.get(`${process.env.REACT_APP_HOST_URL}/api/properties/byBroker`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const formik = useFormik({
    enableReinitialize: true, // Allow the form to reinitialize when initial values change
    initialValues: {
      name: broker ? broker.name : "",
      phone: broker ? broker.phone : "",
      address: broker ? broker.address : "",
      email: broker ? broker.email : "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(100, "Maximum length for address is 100 characters")
        .required("Please enter name"),
      address: Yup.string()
        .max(360, "Maximum length for address is 360 characters")
        .nullable(),
      phone: Yup.string()
        .matches(phoneRegExp, "Please enter a valid phone number")
        .min(10, "must be 10 digits")
        .max(10, "must be 10 digits")
        .nullable(),
      email: Yup.string().email("Please enter a valid email").required(),
    }),
    onSubmit: (values) => {
      try {
        Axios.patch(
          `${process.env.REACT_APP_HOST_URL}/api/users/byId/`,
          values,
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        ).then(() => {
          alert("profile info updated");
        });
      } catch (error) {
        if (error.response && error.response.data.message) {
          // TODO: Replace with modal
          alert(error.response.data.message);
        } else {
          alert("There is an error occurred while uploading property");
        }
      }
    },
  });

  return (
    <div>
      <Container>
        {/* Profile info & profile picture section*/}
        <Row>
          <h1>Broker Profile</h1>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <span
              style={{
                color: broker.broker_approval === 1 ? "black" : "red",
                textDecoration: "underline",
              }}
            >
              {broker.broker_approval === 1
                ? "Your account is approved"
                : "Upload certificates to get approved"}
            </span>
          </div>
        </Row>
        <Card className="mt-4">
          <Form onSubmit={formik.handleSubmit}>
            <Row className="brokerInfo px-3 py-3">
              <Col md={7} className="leftInfo">
                {/* name */}
                <Form.Group>
                  <Form.Label>Name:</Form.Label>
                  <FloatingLabel controlId="form.name" label="Broker name">
                    {" "}
                    <Form.Control
                      name="name"
                      type="text"
                      className="mb-2"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    ></Form.Control>
                  </FloatingLabel>
                </Form.Group>
                {/* phone */}
                <Form.Group>
                  <Form.Label>Phone:</Form.Label>
                  <FloatingLabel
                    controlId="form.name"
                    label="Broker phone number"
                  >
                    {" "}
                    <Form.Control
                      name="phone"
                      type="text"
                      className="mb-2"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                    ></Form.Control>
                  </FloatingLabel>
                </Form.Group>
                {/* address */}
                <Form.Group>
                  <Form.Label>Address:</Form.Label>
                  <FloatingLabel controlId="form.name" label="Office address">
                    {" "}
                    <Form.Control
                      name="address"
                      type="text"
                      className="mb-2"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                    ></Form.Control>
                  </FloatingLabel>
                </Form.Group>
                {/* email */}
                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <FloatingLabel controlId="form.name" label="Email">
                    {" "}
                    <Form.Control
                      name="email"
                      type="text"
                      className="mb-2"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    ></Form.Control>
                  </FloatingLabel>
                </Form.Group>
                <Button type="submit" variant="dark">
                  Save profile changes
                </Button>
              </Col>
              <Col
                md={5}
                className="mt-5 rightProfilePic justify-content-center"
              >
                <Row className="justify-content-center">
                  <div
                    style={{
                      width: "230px",
                      height: "210px",
                      overflow: "hidden",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
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
                </Row>
                <Row className="d-flex justify-content-center">
                  <div className="d-flex justify-content-center">
                    {profile && Object.keys(profile).length !== 0 ? (
                      <Button
                        className="mt-3"
                        variant="outline-danger"
                        onClick={() => {
                          deleteProfile(profile.id);
                        }}
                      >
                        Delete profile
                      </Button>
                    ) : (
                      <Button className="mt-3" onClick={handleProfileShow}>
                        Add Profile
                      </Button>
                    )}
                  </div>
                </Row>
              </Col>
            </Row>
          </Form>
        </Card>
        <hr></hr>
        {/* Certificate Section */}
        <Row className="certificate">
          <h2>Certificate</h2>
          <h5>Upload your certificates to get approved</h5>

          <Form className="mb-3">
            <Form.Group>
              {/* <Form.Label>Upload certificates</Form.Label> */}
              <div className="d-flex">
                {" "}
                <div style={{ width: "600px" }}>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={handleImageChange}
                  ></Form.Control>
                </div>
                <Button
                  variant="dark"
                  className="mx-2"
                  type="submit"
                  onClick={() => uploadFiles(1)}
                >
                  Submit certificates
                </Button>
              </div>
            </Form.Group>

            <CertiGallery
              pictures={certificates}
              setPictures={setCertificates}
            ></CertiGallery>
          </Form>
        </Row>

        <hr></hr>
        {/* PropertyList Section */}
        <Row className="propertyList">
          <div className="mt-2">
            <h2>Properties posted</h2>
            {broker.broker_approval === 1 && (
              <div>
                <Button variant="dark" href="/postProperty">
                  Add porperty
                </Button>
              </div>
            )}
          </div>
          <div className="card-container">{displayProperties}</div>

          <hr></hr>
        </Row>

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

        {/* Profile Modal rendering */}
        <Modal show={showProfileEdit} onHide={handleProfileClose}>
          <Modal.Header>
            <Modal.Title>Choose your profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Display the selected image */}
            {selectedImage && (
              <Row className="justify-content-center my-2">
                <h2>Selected Profile</h2>
                <div
                  style={{
                    width: "200px",
                    height: "180px",
                    overflow: "hidden",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img className="profile" src={selectedImage} alt="Selected" />
                </div>
              </Row>
            )}
            <Form>
              <Form.Group>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Form.Group>
              <Button className="mt-3" onClick={uploadFiles}>
                Upload
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="bluButton"
              variant="secondary"
              onClick={handleProfileClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default BrokerProfile;
