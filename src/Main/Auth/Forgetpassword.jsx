import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Common/Header";
import loginimg from "../../assets/images/loginimg.jpg";
import { CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "./UserPool";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";

const Forgetpassword = () => {
  const navigate = useNavigate();
    const [passwordfield,setpasswordfield]=useState(false)
  const formik = useFormik({
    initialValues: {
      email: "",
      password:"",
      resetcode:""
      
    },
    onSubmit: (values) => passwordfield ? handleConfirmPassword(): handleSubmit(values),
    validationSchema: yup.object({
      email: yup.string().email().required("Email is required"),
      resetcode: yup
      .string()
      .matches(/^[0-9]+$/, "Must be only number"),
      password: yup
        .string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        
    }),
  });
  const handleSubmit = (values) => {
    const { email } = values;
    var userData = {
        Username: email,
        Pool: UserPool,
      }
    
    var cognitoUser = new CognitoUser(userData)
        cognitoUser.forgotPassword({
          onSuccess: function (data) {
            setpasswordfield(true)
          },
          onFailure: function (err) {
           console.log("err",err)
          }
        });
    }

    const handleConfirmPassword=()=>{
        const{email,resetcode,password}=formik.values
        var userData = {
            Username: email,
            Pool: UserPool,
          }
          var cognitoUser = new CognitoUser(userData)
          cognitoUser.confirmPassword(resetcode,password,{
            onSuccess: function (data) {
              console.log("data",data)
              navigate('/login')
            },
            onFailure: function (err) {
             console.log("err",err)
            }
          })

    }
  

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
              <div className="loginContainer">
                <h2> Forgot Password</h2>
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
                 {passwordfield && <div className="mb-3">
                    <input
                      type="text"
                      name="resetcode"
                      value={formik.values.resetcode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                      placeholder="Enter the code"
                    />
                    {formik.touched.resetcode && formik.errors.resetcode && (
                      <div style={{ color: "red" }}>{formik.errors.resetcode}</div>
                    )}
                  </div>}
                 {passwordfield && <div className="mb-3">
                    <input
                      type="text"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                      placeholder="Enter new password"
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div style={{ color: "red" }}>{formik.errors.password}</div>
                    )}
                  </div>}
                 
                  <button type="submit" className="commonButton">
                    Submit
                  </button> 
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Forgetpassword;
