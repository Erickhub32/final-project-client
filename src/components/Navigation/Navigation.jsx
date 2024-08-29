import './Navigation.css'
import OverlayTooltip from "../OverlayTooltip/OverlayTooltip"
import { useContext, useState } from "react"
import { Button, Form, Nav, Offcanvas } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import 'bootstrap-icons/font/bootstrap-icons.css'

const Navigation = () => {

  const { loggedUser, logoutUser } = useContext(AuthContext)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <Button variant="white" onClick={handleShow} className="Hamburger m-3">
        <i className="bi bi-list" style={{ fontSize: '1.5rem' }} ></i>
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="start" style={{ width: '250px', backgroundColor: '#ffffff' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <OverlayTooltip tooltipText={'Go to posts page'} id={'user-tooltip'} placement={'bottom'}>
              <Link to="/" style={{ color: '#000', textDecoration: 'none' }} onClick={handleClose}>
                Meetspot
              </Link>
            </OverlayTooltip>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to={'/aboutus'} style={{ color: '#000' }} onClick={handleClose}><i className="bi bi-people" ></i> About Us</Nav.Link>

            {loggedUser ? (
              <>
                <Nav.Link as={Link} to={'/create-post'} style={{ color: '#000' }} onClick={handleClose}><i className="bi bi-plus-square"></i> New Post</Nav.Link>
                <Nav.Link as={Link} onClick={() => { handleClose(), logoutUser() }} to={'/'} style={{ color: '#000' }}><i className="bi bi-box-arrow-in-left" ></i> Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to={'/signup'} style={{ color: '#000' }} onClick={handleClose}><i className="bi bi-file-earmark-person"></i> Signup</Nav.Link>
                <Nav.Link as={Link} to={'/login'} style={{ color: '#000' }} onClick={handleClose}><i className="bi bi-box-arrow-in-right"></i> Login</Nav.Link>
              </>
            )}
          </Nav>

          {loggedUser && (
            <div className="mt-auto">

              <OverlayTooltip tooltipText={'Go to profile page'} id={'user-tooltip'} placement={'bottom'}>
                <Link as={Link} to={'/profile'} style={{ color: '#000', textDecoration: 'none' }} onClick={handleClose} >
                  <div className="d-flex align-items-center" style={{ color: '#000' }}>
                    <img src={loggedUser.avatar} alt={loggedUser.nick} style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginRight: '10px'
                    }}
                      className='mt-5'
                    />
                    <strong className='mt-5'>@{loggedUser.nick}</strong>
                  </div>
                </Link>
              </OverlayTooltip>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Navigation
