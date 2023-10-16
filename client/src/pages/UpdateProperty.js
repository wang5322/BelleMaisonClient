import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Row, Col, Form, Container, Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Axios from "axios";
import * as Yup from "yup";
import UploadPropForm from "../components/UploadPropForm";
import { useParams } from "react-router-dom";
import PropUpdateImageList from "../components/PropUpdateImageList";

function UpdateProperty() {
  let { id } = useParams();
  const [files, setFiles] = useState([]);
  const [property, setProperty] = useState({});
  const [pictures, setPictures] = useState([]);

  const fileSelected = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const formik = useFormik({
    initialValues: {
      price: "",
      address: "",
      city: "",
      year_built: "",
      postal: "",
      bedrooms: 0,
      bathrooms: 0,
      rooms: 0,
      type: "",
      lotArea: "",
      parking: 0,
      features: "",
      description: "",
      isActive: 1,
    },
    validationSchema: Yup.object({
      price: Yup.number("Price must be a whole number").required(
        "Price is required"
      ),
      address: Yup.string()
        .required("Address is required")
        .min(5, "Must be at least 5 characters")
        .max(100, "Maximum length for address is 100 characters"),
      city: Yup.string().max(40, "Maxium length for city is 40 characters"),
      year_built: Yup.number(),
      postal: Yup.string()
        .required("Postal is required")
        .matches(
          /[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d/,
          "Postal is in H3X 3HE format"
        ),
      bedrooms: Yup.number().required("Bedroom number is required"),
      bathrooms: Yup.number().required("Bathroom number is required"),
      rooms: Yup.number().required("Total room number is required"),
      type: Yup.string().required("Building type is required"),
      lotArea: Yup.number().required("Lot area is required"),
      parking: Yup.number().required("Parking number is required"),
      features: Yup.string().max(
        1000,
        "The length of description is over the maximum 1000 characters"
      ),
      description: Yup.string().max(
        4000,
        "The length of description is over the maximum 4000 characters"
      ),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("images", file);
      });
      // console.log("button clicked");
      // console.log("Property values are:", values);
      // TODO: use update
      try {
        await Axios.put(
          `http://localhost:3005/api/properties/byId/${id}`,
          values,
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        );
        if (files) {
          console.log("Property Id is", id);
          const propertyId = id;
          formData.append("propertyId", propertyId);

          await Axios.post("http://localhost:3005/api/pictures", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          setFiles([]);
          window.location.reload();
        }
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

  useEffect(() => {
    console.log("=====Entered useEffect for update property====");
    Axios.get(`http://localhost:3005/api/properties/byId/${id}`)
      .then((response) => {
        setProperty(response.data);
      })
      .catch((error) => {
        if (error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert(`There is an error occured while getting property ${id}`);
        }
      });
    Axios.get(`http://localhost:3005/api/pictures/byProp/${id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
      .then((response) => {
        setPictures(response.data);
      })
      .catch((error) => {
        if (error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert(
            `There is an error occured while getting pictures for property ${id}`
          );
        }
      });
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="12">
            <Card className="shadow-lg mt-2 d-flex justify-content-center">
              <Row className="mt-5 px-4">
                <h1>Upate Property no.{id}</h1>
              </Row>
              <Form onSubmit={formik.handleSubmit}>
                <UploadPropForm
                  formik={formik}
                  onFileSelected={fileSelected}
                  property={property}
                ></UploadPropForm>

                <div className="px-2 justify-content-start py-4">
                  <Button variant="info" className="col-md-3" type="Submit">
                    Update
                  </Button>
                </div>
              </Form>
              <PropUpdateImageList
                pictures={pictures}
                setPictures={setPictures}
              ></PropUpdateImageList>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default UpdateProperty;
