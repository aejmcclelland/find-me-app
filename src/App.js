import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './App.css';
import Geocoding from './Geocoding';
import Map from './Map';

export function App() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home">City Tripper</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export function Content() {
  const [selectedResult, setSelectedResult] = useState('');
  const handleResultClick = (result) => {
    setSelectedResult(result);
  };
  return (
    <Container className="Container">
      <Row className="Row">
        <Col lg={6}>
          <div className="Content">
            <Geocoding onResultClick={handleResultClick} />
          </div>
        </Col>
        <Col lg={6}>
          <Map selectedResult={selectedResult} />
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default App;
