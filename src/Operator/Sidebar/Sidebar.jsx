import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  function openNav() {
    document.getElementById("mySidepanel").style.width = "70%";
  }

  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }
  return (
    <div className="col-lg-3">
      <button className="sideBtn" onClick={openNav}>
        ☰
      </button>
      <div className="dbnav" id="mySidepanel">
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
          ×
        </a>
        <ul className="navbar-nav" id="navb">
          <li class="nav-item">
            <Link to="/operator/today">Today</Link>
          </li>
          <li class="nav-item">
            <Link to="/operator/marketplace">Marketplace</Link>
          </li>
          <li class="nav-item">
            <Link to="/operator/booking">Bookings</Link>
          </li>
          <li class="nav-item">
            <Link to="/operator/availability">Availability</Link>
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

            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <Link to="/operator/vehicles" className="icongr">
                  <i className="fa-solid fa-car"></i> Vehicles
                </Link>
              </li>
              <li>
                <Link to="/operator/garages" className="icongr">
                  <i className="fa-regular fa-garage"></i> Garages
                </Link>
              </li>
              <li>
                <Link to="/operator/team" className="icongr">
                  <i className="fa-solid fa-people-group"></i> Team
                </Link>
              </li>
              <li>
                <Link to="/operator/rates" className="icongr">
                  <i className="fa-regular fa-circle-dollar"></i> Rates
                </Link>
              </li>
              <li>
                <Link to="/operator/company" className="icongr">
                  <i className="fa-regular fa-buildings"></i> Company
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
