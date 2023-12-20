import React from "react";
import Header from "../../Common/Header";
import pt1 from "../../assets/images/pt1.jpg";
import pt2 from "../../assets/images/pt2.jpg";
import pt3 from "../../assets/images/pt3.jpg";
import pt4 from "../../assets/images/pt4.jpg";
import pt5 from "../../assets/images/pt5.jpg";
import pt6 from "../../assets/images/pt6.jpg";
import co1 from "../../assets/images/co1.jpg";
import co2 from "../../assets/images/co2.jpg";
import co3 from "../../assets/images/co3.jpg";
import Footer from "../../Common/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <section className="mainBanner">
        <div className="container">
          <div className="row">
            <div className="col-md-6">&nbsp;</div>
            <div className="col-md-6 bannertxt">
              <h2>
                Charter A Bus In Under
                <br /> 60 Seconds
              </h2>
              <button className="commonButton">Get a Quote</button>
              <h4>Or</h4>
              <p>
                <i className="fa-solid fa-phone"></i> 1-855-920-2287
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="charterinfo">
        <div className="container">
          <div className="row">
            <div className="col-md-4 charterSec">
              <div className="chartertopblock">
                <h3>
                  500 <span>+</span>
                </h3>
                <p>Bus Companies</p>
              </div>
            </div>
            <div className="col-md-4 charterSec">
              <div className="chartertopblock">
                <h3>
                  25 <span>+</span>
                </h3>
                <p>Cities Nationwide</p>
              </div>
            </div>
            <div className="col-md-4 charterSec">
              <div className="chartertopblock">
                <h3>
                  3,000 <span>+</span>
                </h3>
                <p>Buses</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="partnertop">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p>
                1,000+ companies already rely on CharterSUB for their bus
                charters.
              </p>
              <div className="partntoplogo">
                <a href="">
                  <img src={pt1} alt="" />
                </a>
                <a href="">
                  <img src={pt2} alt="" />
                </a>
                <a href="">
                  <img src={pt3} alt="" />
                </a>
                <a href="">
                  <img src={pt4} alt="" />
                </a>
                <a href="">
                  <img src={pt5} alt="" />
                </a>
                <a href="">
                  <img src={pt6} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="chooseoption">
        <div className="container">
          <div className="copinn">
            <div className="row">
              <div className="col-lg-6">
                <div className="chooseOptimg">
                  <img src={co1} alt="" />
                </div>
              </div>
              <div className="col-lg-6 coptxt">
                <h3>Compare Prices &amp; Ratings</h3>
                <p>
                  When you fill in your trip details, CharterSUB instantly
                  calculates price quotes from different vendors in your area
                  and displays them along with ratings, reviews and pictures of
                  the buses.
                </p>
                <button className="commonButton">Get a Quote</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="chooseoption">
        <div className="container">
          <div className="copinn">
            <div className="row">
              <div className="col-lg-6 order-lg-2">
                <div className="chooseOptimg coptimg2">
                  <img src={co2} alt="" />
                </div>
              </div>
              <div className="col-lg-6 coptxt order-lg-1">
                <h3>Shuttles</h3>
                <p>
                  CharterSUB offers private shuttle solutions for organizations
                  of any size. Easily create safe shuttle programs to transport
                  your employees to and from work.
                </p>
                <button className="commonButton">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="chooseoption pb-5">
        <div className="container">
          <div className="copinn">
            <div className="row">
              <div className="col-lg-6">
                <div className="chooseOptimg">
                  <img src={co3} alt="" />
                </div>
              </div>
              <div className="col-lg-6 coptxt">
                <h3>Charters</h3>
                <p>
                  We created the first and only marketplace that provides
                  real-time quotes and availability. Now you can book all your
                  team’s buses under one centralized platform, in as little as
                  60 seconds.
                </p>
                <button className="commonButton">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Home;
