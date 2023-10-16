import React from "react";
import { Alert } from "react-bootstrap";

const ErrorMessageAlert = ({ field, formik }) => {
  const fieldName = field.name; // Assuming 'field' is a Formik field object

  return (
    <>
      {formik.touched[fieldName] && formik.errors[fieldName] ? (
        <Alert variant="danger" className="error-message my-1">
          {formik.errors[fieldName]}
        </Alert>
      ) : null}
    </>
  );
};

export default ErrorMessageAlert;
