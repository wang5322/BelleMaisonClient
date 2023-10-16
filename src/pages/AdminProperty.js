import React, { useEffect, useState } from "react";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import "./Admin.css"
import { Link } from 'react-router-dom';

function AdminProperty() {
    const [propertyList, setPropertyList] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3005/api/properties").then((res) => {
            setPropertyList(res.data);
        }).catch((err) => {
            if (err.response.data.status !== 404) {
                alert("no records found!");
                return
            }
        })
    }, []);
    return (
        <div className="adminTable">
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

                                <td><Button variant="outline-warning">Deactive</Button></td>
                            </tr>
                        )

                    })}

                </thead>
            </Table>
        </div>
    )
}

export default AdminProperty
