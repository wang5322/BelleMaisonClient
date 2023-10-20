import React, { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';
import "./Admin.css";
import { Link } from "react-router-dom";

function AdminUser() {
  const [userList, setUserList] = useState([]);
  const [brokerApproval, setBrokerApproval] = useState(0);
  const [activeUser, setActiveUser] = useState(1);
  const [message, setMessage] = useState(null);
  const showAlert = (message) => {
    setMessage(message);
    // setTimeout(() => setMessage(null), 3000);
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST_URL}/api/users`)
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        if (err.response.data.status !== 404) {
          showAlert("no records found!");
          return;
        }
      });
  }, [brokerApproval, activeUser]);
 

  const approve = (userid, approvalStatus) => {
    axios
      .patch(
        `${process.env.REACT_APP_HOST_URL}/api/users/admin/update`,
        { id: userid, broker_approval: approvalStatus },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((res) => {
        if (res.data.error) {
         showAlert("error in approving user");
          return;
        }
        console.log(res);
        setBrokerApproval(brokerApproval + 1);
        showAlert("user status is updated");
      })
      .catch((err) => {
        showAlert("error in approving user");
      });
  };
  const deactive = (userid, activeStatus) => {
    axios
      .patch(
        `${process.env.REACT_APP_HOST_URL}/api/users/admin/update`,
        { id: userid, is_active: activeStatus },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((res) => {
        if (res.data.error) {
          showAlert("error in approving user");
          return;
        }
        console.log(res);
        setActiveUser(activeUser + 1);
        showAlert("user status is updated");
      })
      .catch((err) => {
        showAlert("error in deactive user");
      });
  }
  return (
    
    <div className="adminTable">
  {message && <Alert variant="danger" onClose={() => setMessage(null)} dismissible>{message}</Alert>}
      <Row>
        <Col>
          <h1>User Management</h1>
        </Col>
        <Col>
          <h2>
            <Link to="/admin/properties">To Property Management</Link>
          </h2>
        </Col>
      </Row>
    
      <Table responsive bordered hover className="userTable">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Address</th>
            <th>isApproval</th>
            <th colSpan={2}>Action</th>
          </tr>
          {userList.map((value, key) => {
            return (
              <tr>
                <td>{value.id}</td>
                <td><Link to={`/broker/${value.id}`} style={{ color: 'black', textDecoration: 'none' }}>{value.name}</Link></td>
                <td>{value.email}</td>
                <td>{value.phone}</td>
                <td>{value.role}</td>

                <td>
                  {value.address},{value.city},{value.postal}
                </td>

                <td>{value.broker_approval}</td>

                <td>

                  {value.broker_approval === 0 ? (
                    <Button
                      variant="success"
                      onClick={() => {
                        approve(value.id, 1);
                      }}
                    >
                      Approve
                    </Button>
                  ) : (
                    <Button
                      variant="outline-success"
                      onClick={() => {
                        approve(value.id, 0);
                      }}
                    >
                      Disapprove
                    </Button>
                  )}
                </td>

                <td>
                {!value.is_active ? (
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
            );
          })}
        </thead>
      </Table>
    </div>
  );
}

export default AdminUser;
