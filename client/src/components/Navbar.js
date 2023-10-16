import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { AuthContext } from "../helpers/AuthContext";
import { useContext } from "react";

function OffcanvasNavbar() {
  const { setAuthState } = useContext(AuthContext);
  const { authState } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      email: "",
      id: 0,
      role: "",
      approval: 0,
      status: false,
    });
  };

  return (
    <>
      <Navbar key="md" expand="md" className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand href="#">BelleMaison</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-"md"`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-"md"`}
            aria-labelledby={`offcanvasNavbarLabel-expand-"md"`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-"md"`}>
                BelleMaison
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-start flex-grow-1 pe-3">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/brokerList">FindBroker</Nav.Link>
                {/* <Nav.Link href="#action2">Search</Nav.Link> */}
                {authState.status && authState.role ==="broker" &&  <Nav.Link href="/postProperty">PostProperty</Nav.Link>}

                {/* <NavDropdown
                  title="More"
                  id={`offcanvasNavbarDropdown-expand-"md"`}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown> */}
                {authState.status ? (
                  <span mt={4} className="d-flex justify-content-end mt-2">
                    <h6>Hello, {authState.email} </h6>{" "}
                    {authState.status && (
                      <>
                      <Button size="sm" onClick={logout}>
                        {" "}
                        Logout
                      </Button>
                      
                     
                      </>
                    )}
                  </span>
                ) : (
                  <>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                  </>
                )}
                {authState.role ==="broker" && (
                  <Nav.Link href="/myProfile/broker">my profile</Nav.Link>
                )}
                {authState.role ==="buyer" && (
                   <Nav.Link href="/myProfile/user">my profile</Nav.Link>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default OffcanvasNavbar;
