import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Common/Header";
import loginimg from "../../assets/images/loginimg.jpg";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "./UserPool";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const [iconflag, setIconflag] = useState(false);
  const [show, setShow] = useState(false);
  const [emaildata, setEmailData] = useState();
  const [code, setCode] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => handleSubmit(values),
    validationSchema: yup.object({
      email: yup.string().email().required("Email is required"),
      password: yup
        .string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .required("Password is required"),
    }),
  });
  const emailVerification = () => {
    var userData = {
      Username: emaildata,
      Pool: UserPool,
    };

    var cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        toast.error(err.message);
        console.log("err", err);
      } else {
        toast.success("Successful");
        console.log("data", result);
        handleClose();
      }
    });
  };
  const resendEmailCode = () => {
    console.log("abddd");
    if (emaildata) {
      var userData = {
        Username: emaildata,
        Pool: UserPool,
      };

      var cognitoUser = new CognitoUser(userData);
      cognitoUser.resendConfirmationCode((err, result) => {
        if (err) {
          toast.error(err.message);
          console.log("err", err);
        } else {
          toast.success("Successful");
          console.log("data", result);
        }
      });
    } else {
      toast.error("Please enter your email");
    }
  };
  const handleSubmit = (values) => {
    const { email, password } = values;
    console.log("value", values);
    if (email && password) {
      // navigate('navigate/today')
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });
      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });
      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("data", data);
          localStorage.setItem("idToken", data.idToken.jwtToken);
          localStorage.setItem(
            "cognito_id",
            data.idToken.payload["cognito:username"]
          );
          localStorage.setItem(
            "company_name",
            data.idToken.payload["custom:company_name"]
          );
          localStorage.setItem("username", data.idToken.payload.name);
          navigate("/operator/today");
          window.location.reload();
        },
        onFailure: (err) => {
          toast.error(err.message);
          console.log("err", err.message);
        },
        newPasswordRequired: (data) => {
          console.log("new password", data);
        },
      });
    }
  };

  return (
    <div>
      <Header />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Verify your email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row emailcontainer">
            <div className="col-md-8">
              <input
                type="email"
                name="email"
                value={emaildata}
                onChange={(e) => setEmailData(e.target.value)}
                className="form-control"
                placeholder="Enter your email"
              />
            </div>
            <div className="col-md-4">
              <Button variant="success" onClick={resendEmailCode}>
                Sent Code
              </Button>
            </div>
          </div>
          <div className="row codecontainer">
            <div className="col-md-8">
              <input
                type="text"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="form-control"
                placeholder="Enter the code"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={emailVerification}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <section className="loginBg">
        <div className="container">
          <div className="row">
            <div className="col-md-6 loginImg">
              <img src={loginimg} alt="" />
            </div>
            <div className="col-md-6">
              <div className="loginContainer">
                <h2>Operator Login</h2>
                <h6>
                  Login to your CharterSUB for Operators account to view
                  marketplace bids, bookings, referrals and more.
                </h6>
                <br></br>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                      placeholder="Enter your email"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div style={{ color: "red" }}>{formik.errors.email}</div>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <div className="showhidePwd" id="show_hide_password">
                      <input
                        className="form-control"
                        type={iconflag ? "text" : "password"}
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Password"
                      />
                      <a
                        className="showpass"
                        onClick={() => setIconflag(!iconflag)}
                      >
                        {iconflag && <i className="fa-regular fa-eye"></i>}
                        {!iconflag && (
                          <i className="fa-regular fa-eye-slash"></i>
                        )}
                      </a>
                      {formik.touched.password && formik.errors.password && (
                        <div style={{ color: "red" }}>
                          {formik.errors.password}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="forgetPass mb-5">
                    <a href="/forgotpassword">Forget password?</a>
                  </p>
                  {/* <p className="mb-4 verifyemail" onClick={handleShow}>
                    Verify your email
                  </p> */}
                  <button type="submit" className="commonButton">
                    Login to Continue
                  </button>
                </form>
                <p className="mb-4 alreadyAccount">
                  Not register yet? <a href="/signup">Sign Up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
