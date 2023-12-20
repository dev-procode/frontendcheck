import React from "react";
import HeaderSecond from "../../Common/HeaderSecond";
import { useNavigate } from "react-router-dom";

const CostSecond = () => {
  const navigate = useNavigate();
  return (
    <div>
      <HeaderSecond />
      <section class="costbg">
        <div class="costLft">
          <div class="costinn">
            <div class="bookingNavigate costnavigate">
              <button class="active">
                <span>Trip</span>
              </button>
              <button class="active">
                <span>Cost</span>
              </button>
              <button>
                <span>Reserve</span>
              </button>
            </div>
            <div class="costMiddle">
              <button class="commonButton" onClick={() => navigate("/cost")}>
                <i class="fa-solid fa-reply"></i> Go Back
              </button>
              <div class="costB">
                <h6 style={{color:"green",paddingLeft:"15px"}}>Succefully submitted your request</h6>
              </div>
              {/* <form class="costB">
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label><span>*</span> name</label>
                                <input type="text" class="form-control" />
                            </div>
                            <div class="col-md-6">
                                <label>&nbsp;</label>
                                <input type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-12">
                                <label>Company/Organization</label>
                                <input type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-12">
                                <label><span>*</span> Email Address</label>
                                <input type="email" class="form-control" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <label>Phone Number</label>
                                <input type="text" class="form-control" />
                            </div>
                        </div>
                        
                        <div class="captchabg">
                            <div class="g-recaptcha" data-sitekey="6Lel4Z4UAAAAAOa8LO1Q9mqKRUiMYl_00o5mXJrR"></div>
                        </div>
                        
                    </form>
                    <button class="commonButton" onclick="window.location.href = 'reserved.html';" onClick={()=>navigate('/reserved')}>Submit your Iternerary</button> */}
            </div>
          </div>
        </div>
        <div class="costMap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.03605924756!2d-74.30932818346731!3d40.69753996510636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1687583790508!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default CostSecond;
