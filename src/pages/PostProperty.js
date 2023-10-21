import React, { useState } from "react";
import { useFormik } from "formik";
import { Row, Col, Form, Container, Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Axios from "axios";
import * as Yup from "yup";
import UploadPropForm from "../components/UploadPropForm";
import { useNavigate } from "react-router-dom";
import imageFileResizer from "../helpers/ImageFileResizer";

function PostProperty() {
  const Navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]);

  const fileSelected = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const MultipleFileSelected = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setGalleryFiles(selectedFiles);
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
      const galleryFormData = new FormData();
      //resize to thumbnail
      for (const file of files) {
        const resizedImage = await imageFileResizer(file, 450, 400, 100, 0);
        formData.append("images", resizedImage);
        console.log("=====resizedImage=====", resizedImage);
      }

      //resize pictures in gallery
      for (const galleryFile of galleryFiles) {
        const resizedImage = await imageFileResizer(
          galleryFile,
          900,
          900,
          100,
          0
        );
        galleryFormData.append("images", resizedImage);
        console.log("=====resizedImage=====", resizedImage);
      }
      console.log("button clicked");
      console.log("Property values are:", values);

      try {
        const response = await Axios.post(
          `${process.env.REACT_APP_HOST_URL}/api/properties`,
          values,
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        );
        console.log("Property Id is", response.data.id);
        const propertyId = response.data.id;
        formData.append("propertyId", propertyId);

        await Axios.post(
          `${process.env.REACT_APP_HOST_URL}/api/pictures/addThumbnail`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        galleryFormData.append("propertyId", propertyId);
        await Axios.post(
          `${process.env.REACT_APP_HOST_URL}/api/pictures`,
          galleryFormData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        setFiles([]);
        Navigate(`/myProfile/broker`);
      } catch (error) {
        if (error.response && error.response.data.message) {
          // TODO: Replace with modal
          alert(error.response.data.message);
        } else {
          alert("There is an error occurred while uploading property");
        }
      }

      console.log("clicked submit button");
    },
  });

  return (
    <React.Fragment>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="12">
            <Card className="shadow-lg mt-2 d-flex justify-content-center">
              <Row px="2" mt="5">
                <h1 className="row mt-3 offset-1">Post New Listing</h1>
              </Row>
              <Form onSubmit={formik.handleSubmit}>
                <UploadPropForm
                  formik={formik}
                  onFileSelected={fileSelected}
                  onMultipleFileSelected={MultipleFileSelected}
                ></UploadPropForm>
                <div className="px-2 justify-content-start py-4">
                  <Button variant="info" className="col-md-3" type="Submit">
                    Create
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default PostProperty;
