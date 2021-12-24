import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Meta from "../components/Meta";
// import banner from "../images/formsite_banner.png";
// import footer from "../images/footer.png";

const Home = () => {
  return (
    <>
      <Meta />
      {/* <img fluid={"true"} src={banner} alt='Formsite Map'></img> */}
      <h1>Formsite</h1>
      <p>Attestation form website</p>
      <p>&nbsp;</p>
      <footer>
        <Container style={{ overflow: "hidden" }}>
          <Row>
            <Col>
              {/* <img
                fluid={"true"}
                src={footer}
                alt='Formsite map'
              ></img> */}
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Home;
