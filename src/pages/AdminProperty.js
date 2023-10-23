import React, { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./Admin.css";
import { Link } from "react-router-dom";
import ModalMessage from "../components/ModalMessage";

function AdminProperty() {
  const [propertyList, setPropertyList] = useState([]);
  const [activeProperty, setActiveProperty] = useState(1);

  //Error&Message Modal section
  const [show, setShow] = useState({ message: "", status: false });
  const handleClose = () => {
    setShow({ message: "", status: false });
    window.location.reload();
  };
  const handleShow = (message) => setShow({ message: message, status: true });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST_URL}/api/properties`)
      .then((res) => {
        setPropertyList(res.data);
      })
      .catch((err) => {
        if (err.response.data.status !== 404) {
          handleShow("no records found!");
          return;
        }
      });
  }, [activeProperty]);
  const deactive = (propertyid) => {
    axios
      .patch(
        `${process.env.REACT_APP_HOST_URL}/api/properties/byId/${propertyid}`,
        { isActive: 0 },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((res) => {
        if (res.data.error) {
          handleShow("error in approving user");
          return;
        }
        console.log(res);
        setActiveProperty(activeProperty + 1);
        handleShow("property is deactived");
      })
      .catch((err) => {
        handleShow("error in deactive property");
      });
  };
  return (
    <div className="adminTable">
      <Row>
        <Col>
          <h1>Property Management</h1>
        </Col>
        <Col>
          <h2>
            <Link to="/admin/users">To User Management</Link>
          </h2>
        </Col>
      </Row>
      <Table responsive bordered hover className="userTable">
        <thead>
          <tr>
            <th>id</th>
            <th>broker_id</th>
            <th>address</th>
            <th>city</th>
            <th>postal</th>
            <th>type</th>
            <th>isActive</th>
            <th>Action</th>
          </tr>
          {propertyList.map((value, key) => {
            return (
              <tr>
                <td>{value.id}</td>
                <td>{value.broker_id}</td>
                <td>{value.address}</td>
                <td>{value.city}</td>
                <td>{value.postal}</td>

                <td>{value.type}</td>

                <td>{value.isActive}</td>

                <td>
                  <Button
                    variant="outline-warning"
                    onClick={() => {
                      deactive(value.id);
                    }}
                  >
                    Deactive
                  </Button>
                </td>
              </tr>
            );
          })}
        </thead>
      </Table>
      {/* Modal message rendering */}
      <ModalMessage show={show} handleClose={handleClose}></ModalMessage>
    </div>
  );
}

export default AdminProperty;
