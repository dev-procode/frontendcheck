import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Common/Header";
import loginimg from "../../assets/images/loginimg.jpg";

const LoginBoth = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />

      <section className="loginBg">
        <div className="container">
          <div className="row">
            <div className="col-md-6 loginImg">
              <img src={loginimg} alt="" />
            </div>
            <div className="col-md-6">
              <div className="row centercontemt">
                <div
                  className="col-md-5 togglelink"
                  onClick={() => navigate("/login")}
                >
                  <h4>I am an oprerator</h4>
                </div>
                <div
                  className="col-md-5 togglelink"
                  onClick={() => navigate("/customerlogin")}
                >
                  <h4>I am a Customer</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginBoth;
