import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Meta from "../components/Meta";
import banner from "../images/dynalife_edmonton.png";
import footer from "../images/footer.png";

const Home = () => {
  return (
    <>
      <Meta />
      <img fluid src={banner} alt='Dynalife Edmonton map'></img>
      <h1>Dynalife</h1>
      <p>Dynalife Attestation form website</p>
      <p>
        This is a sample website showcasing the abilities of the form
        applcation.
      </p>
      <p>&nbsp;</p>
      <footer>
        <Container style={{ overflow: "hidden" }}>
          <Row>
            <Col>
              <img fluid src={footer} alt='Dynalife Edmonton map'></img>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Home;
