import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Row, Container } from "react-bootstrap";
import Axios from "axios";
import ModalMessage from "../components/ModalMessage";

function PropUpdateImageList({ pictures, setPictures, type }) {
  //Error&Message Modal section
  const [show, setShow] = useState({ message: "", status: false });
  const handleClose = () => {
    setShow({ message: "", status: false });
    window.location.reload();
  };
  const handleShow = (message) => setShow({ message: message, status: true });

  //   const navigate = useNavigate();
  //   const [updatedPictures, setUpdatedPictures] = useState([]);
  // console.log("certificates===", pictures);
  const deleteImage = (id) => {
    console.log("image deleted");
    Axios.delete(`${process.env.REACT_APP_HOST_URL}/api/pictures/${id}`)
      .then((response) => {
        const deletedPicId = response.data.id;
        const updated = pictures.filter(
          (picture) => picture.id !== deletedPicId
        );

        setPictures(updated);
      })
      .catch((error) => {
        if (error.response && error.response.data.message) {
          // TODO: Replace with modal
          handleShow(error.response.data.message);
        } else {
          handleShow("There is an error occurred while uploading property");
        }
      });
  };
  return (
    <React.Fragment>
      <Container>
        <hr />
        <Row className="my-3 px-4">
          {" "}
          {type === "thumbnail" ? <h3> Head Picture</h3> : <h3> Gallery</h3>}
        </Row>

        <Row className="justify-content-center">
          {pictures.map((picture) => {
            return (
              <Card
                key={picture.id}
                style={{ width: "15rem" }}
                className="mx-1 my-1"
              >
                <Card.Img
                  variant="top"
                  src={picture.imageUrl}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />

                <Card.Body className="justify-content-end">
                  <Button
                    variant="outline-danger"
                    onClickCapture={() => {
                      deleteImage(picture.id);
                    }}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            );
          })}

          {/* Modal message rendering */}
          <ModalMessage show={show} handleClose={handleClose}></ModalMessage>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default PropUpdateImageList;
