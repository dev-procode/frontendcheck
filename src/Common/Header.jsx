import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import "../styles/style.css";
import "../styles/media.css";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();
  const idToken = localStorage.getItem("idToken");
  const company_name = localStorage.getItem("company_name");
  const username = localStorage.getItem("username");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleLogout = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("cognito_id");
    localStorage.removeItem("company_name");
    localStorage.removeItem("username");
    handleClose();
    if (company_name) {
      navigate("/customerlogin");
    } else {
      navigate("/login");
    }

    window.location.reload();
  };
  const checkUsertypeoperator = () => {
    if (idToken) {
      if (company_name) {
        navigate(idToken ? "/operator/today" : "/customerlogin");
      } else {
        setShow(true);
      }
    } else {
      navigate("/login");
    }
  };
  const checkUsertypecustomerr = () => {
    if (idToken) {
      if (!company_name) {
        navigate(idToken ? "/reservationTrip" : "/login");
      } else {
        setShow(true);
      }
    } else {
      navigate("/customerlogin");
    }
  };
  const checkUsertypeRevcustomerr = () => {
    if (idToken) {
      if (!company_name) {
        navigate(idToken ? "/reservationTrip" : "/customerlogin");
      } else {
        setShow(true);
      }
    } else {
      navigate("/customerlogin");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hello {username} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            {" "}
            Currently you are logged as {company_name ? "operator" : "customer"}
          </h4>
          <h5>
            If you want to visit {company_name ? "customer" : "operator"} tab
            please logout and login as {company_name ? "customer" : "operator"}{" "}
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
      <header className="w-100 sticky-top mainHeader">
        <nav className="navbar navbar-dark mod-nav  navbar-expand-lg">
          <div className="container">
            <a className="navbar-brand logoBg" href="/">
              <img src={logo} alt="" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon">
                <i className="far fa-bars"></i>
              </span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-center"
              id="navbarNavDropdown"
            >
              <div className="d-md-none close-btn">x</div>
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Charters
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Shuttles
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item" onClick={checkUsertypeoperator}>
                  <a className="" aria-current="page" href="#">
                    Operators
                  </a>
                </li>
                <li className="nav-item" onClick={checkUsertypecustomerr}>
                  <a className="" aria-current="page" href="#">
                    Customer
                  </a>
                </li>
                <li className="nav-item" onClick={checkUsertypeRevcustomerr}>
                  <a className="" aria-current="page" href="#">
                    Reservation
                  </a>
                </li>
                <li className="nav-item">
                  <a className="" aria-current="page" href="#">
                    About Us
                  </a>
                </li>

                <li className="nav-item">
                  <a className="" href="#">
                    Blog
                  </a>
                </li>
                <li className="nav-item">
                  <a className="" href="#">
                    Careers
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    More
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="operator/vehicles">
                        Vehicle
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            {idToken ? (
              <button class="loginBtn" onClick={handleLogout}>
                <img src="assets/images/logout.png" alt="" /> Logout
              </button>
            ) : (
              <button
                className="loginBtn"
                onClick={() => navigate("/userlogin")}
              >
                <i className="fa-solid fa-key"></i> Login
              </button>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
