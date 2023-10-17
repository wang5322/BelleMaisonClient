import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useEffect } from "react";
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import FacebookIcon from '@mui/icons-material/Facebook';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function AppFooter(){

    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);
  
    function goTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  
    return (
        <Container fluid>
            <Row>
                <Col>
                    <div>
                        <h4>Contact Us:</h4>
                            <div>Email: <p><MailOutlineIcon/> BelleMaison@gmail.com</p></div>
                            <div>Phone:<p><PhoneIcon/> +1 (514) 567-9876</p></div>

                    </div>
                </Col>
                <Col>
                    <div className="copyright">&BelleMaison All Right Reserved.</div>
                </Col>
                <Col>
                    <div className="socials">
                        <ul>
                            <li><a href="https://www.facebook.com"><FacebookIcon/></a></li> 
                            <li><a href="https://www.twitter.com"><TwitterIcon/></a></li>
                            <li><a href="https://www.linkedin.com"><LinkedInIcon /></a></li>
                        </ul>
                    </div>
                    <div>
                        {
                            showTopBtn && (
                            <div className="go-top" onClick={goTop}></div>
                            )
                        }
                    </div>
                </Col>
            </Row>
        </Container>

    )
}