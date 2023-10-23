import React, { useEffect, useState } from "react";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import "./Admin.css"
import { Link } from 'react-router-dom';

function AdminProperty() {
    const [propertyList, setPropertyList] = useState([]);
    const [activeProperty, setActiveProperty] = useState(1);
    const [message, setMessage] = useState(null);
    const showAlert = (message) => {
        setMessage(message);
        // setTimeout(() => setMessage(null), 3000);
    };
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_HOST_URL}/api/properties`).then((res) => {
            setPropertyList(res.data);
        }).catch((err) => {
            if (err.response.data.status !== 404) {
                showAlert("no records found!");
                return
            }
        })
    }, [activeProperty]);
    const deactive = (propertyid, activeStatus) => {
        axios
            .patch(
                `${process.env.REACT_APP_HOST_URL}/api/properties/byId/${propertyid}`,
                { id: propertyid,isActive: activeStatus },
                { headers: { accessToken: localStorage.getItem("accessToken") } }
            )
            .then((res) => {

                if (res.data.error) {
                    showAlert("error in approving user");
                    return;
                }
                console.log(res);
                setActiveProperty(activeProperty + 1);
                showAlert("property is deactived");
            })
            .catch((err) => {
                showAlert("error in deactive property");
            });
    }
    return (
        <div className="adminTable">
            {message && <Alert variant="danger" onClose={() => setMessage(null)} dismissible>{message}</Alert>}
            <Row>
                <Col>
                    <h1>Property Management</h1>
                </Col>
                <Col>
                    <h2><Link to="/admin/users">To User Management</Link></h2>
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

                                <td>{!value.isActive ? (
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => {
                                            deactive(value.id, 1);
                                        }}
                                    >
                                        Active
                                    </Button>
                                ) : (
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            deactive(value.id, 0);
                                        }}
                                    >
                                        deactive
                                    </Button>
                                )}
                                </td>
                            </tr>
                        )

                    })}

                </thead>
            </Table>
        </div>
    )
}

export default AdminProperty;
