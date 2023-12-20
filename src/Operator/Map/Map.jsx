import React from 'react'
import HeaderSecond from '../../Common/HeaderSecond'
import Sidebar from '../Sidebar/Sidebar'

const Map = () => {
  return (
    <div>
        <HeaderSecond/>
        <section className="">
        <div className="container">
            <div className="row">
                <Sidebar/>
                <div className="col-lg-9">
                    <div className="dbRgt">
                        <div className="mapBg">
                            <div className="mapLeft">
                                <div className="mapTop">
                                    <a href="" className="angleft"><i className="fa-solid fa-angle-left"></i></a>
                                    <div className="mainLocation">
                                        <h6>Washington  --  Philadelphia</h6>
                                        <p>15-06-2023, 10:pm</p>
                                    </div>
                                    <div className="mapAddress">
                                        <div className="mapadd2 addressLocate">
                                            <span className="mapbox2"></span>
                                            <h6>Washington, DC</h6>
                                            <p>Pickup time 15-06-2023, 6:00pm <br/>EDT</p>
                                        </div>
                                        <div className="mapadd2 addressLocate">
                                            <span className="mapbox2"></span>
                                            <h6>Washington, DC</h6>
                                            <p>Pickup time 15-06-2023, 6:00pm <br/>EDT</p>
                                        </div>
                                        <div className="mapadd2 addressLocate">
                                            <span className="mapbox2"></span>
                                            <h6>Washington, DC</h6>
                                            <p>Pickup time 15-06-2023, 6:00pm <br/>EDT</p>
                                        </div>
                                        <div className="mapadd2 addressLocate">
                                            <span className="mapbox2"></span>
                                            <h6>Washington, DC</h6>
                                            <p>Pickup time 15-06-2023, 6:00pm <br/>EDT</p>
                                        </div>
                                        <div className="mapadd2 addressLocate">
                                            <span className="mapbox2"></span>
                                            <h6>Washington, DC</h6>
                                            <p>Pickup time 15-06-2023, 6:00pm <br/>EDT</p>
                                        </div>
                                        <div className="mapadd2 addressLocate">
                                            <span className="mapbox2"></span>
                                            <h6>Washington, DC</h6>
                                            <p>Pickup time 15-06-2023, 6:00pm <br/>EDT</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mapBtm">
                                    <p>Automated price: <strong>$6,732.00</strong> </p>
                                    <p>Actual Awarded price: <strong>$6,058.00</strong></p>
                                    <div className="mapBtns">
                                        <a href="">Change Price</a>
                                        <button className="commonButton">Mark as Sold Out</button>
                                    </div>
                                </div>
                            </div>
                            <div className="mainMap">
                                <span className="expire"><i className="fa-regular fa-stopwatch"></i> Expires in 4d 19hrs 9m</span>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.03605924756!2d-74.30932818346731!3d40.69753996510636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1687583790508!5m2!1sen!2sin" width="" height="450" style={{"border":0 }}allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    </section>
      
    </div>
  )
}

export default Map
