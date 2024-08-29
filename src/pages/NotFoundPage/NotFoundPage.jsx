import { Container } from 'react-bootstrap';

const NotFoundPage = () => {

  return (
    <div className="NotFoundPage d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Container className="text-center">
        <h1 className="Error">Error 404</h1>
        <p className="Text">The page that you are looking for does not exist.</p>

      </Container>
    </div>
  );
};

export default NotFoundPage;