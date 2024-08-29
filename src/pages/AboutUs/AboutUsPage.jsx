import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import CustomMap from "../../components/CostumMap/CostumMap"

const AboutUsPage = () => {

  return (
    <Container fluid className="d-flex flex-column align-items-center min-vh-100 mt-4">
      <Row className="g-4 justify-content-center w-100">
        <Col xs={9} sm={6} md={4} lg={3} className="d-flex justify-content-center mb-3">
          <Card border="dark" className="mb-3" style={{ width: '16rem', height: 'auto', overflow: 'hidden' }}>
            <Card.Img
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              variant="top"
              src="https://res.cloudinary.com/drpusr9cu/image/upload/v1724837820/vm5dx2xyqjvl225rbxzs.jpg"
            />
            <Card.Body>
              <Card.Title style={{ fontSize: '1.2rem' }}>Alexandra Garcia</Card.Title>
              <Card.Text style={{ fontSize: '0.8rem', lineHeight: '1.2rem', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                🌟 Full-Stack Developer passionate about creating digital experiences.
                Love design, development, and exploring new trends.
                Enjoy trying out new recipes when not coding.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={9} sm={6} md={4} lg={3} className="d-flex justify-content-center mb-3">
          <Card border="dark" className="mb-3" style={{ width: '16rem', height: 'auto', overflow: 'hidden' }}>
            <Card.Img
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              variant="top"
              src="https://res.cloudinary.com/drpusr9cu/image/upload/v1724838265/tysay5suhqu1jyj4swat.jpg"
            />
            <Card.Body>
              <Card.Title style={{ fontSize: '1.2rem' }}>John Arevalo</Card.Title>
              <Card.Text style={{ fontSize: '0.8rem', lineHeight: '1.2rem', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                🚀 Full-Stack Developer
                Specialist in solving complex problems and building efficient solutions.
                Passionate about technology and continuous learning.
                In my free time, I enjoy sports and nature.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} className="d-flex justify-content-center mb-3">
          <Form.Text className="text-center">
            Encuéntranos en Ironhack: Paseo de la Chopera, 14 <br/> Matadero - Casa del Lector, Nave Ironhack, 28045 Madrid
          </Form.Text>
        </Col>

        <Col xs={12} className="d-flex justify-content-center mb-5">
          <CustomMap style={{ width: '100%', height: '300px', borderRadius: '8px' }} />
        </Col>
      </Row>
    </Container>

  )
}
export default AboutUsPage

