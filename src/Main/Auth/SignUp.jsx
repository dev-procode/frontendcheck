import React, { useState } from "react";
import Header from "../../Common/Header";
import operator from "../../assets/images/operator.jpg";
import UserPool from "./UserPool";
import { useFormik } from "formik";
import * as yup from "yup";
import US_State from "../../State/US_State";
import { toast } from "react-toastify";
import PhoneNumber_code from "../../State/Phonenumber_code";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const companyRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const [phonecode, setphonecode] = useState();
  const formik = useFormik({
    initialValues: {
      name: "",
      phone_number: "",
      email: "",
      password: "",
      company_name: "",
      company_dot: "",
      state: "",
      code:""
    },
    onSubmit: (values) => handleSubmit(values),
    validationSchema: yup.object({
      email: yup.string().email().required("Email is required"),
      name: yup.string().required("Name is required"),
      phone_number: yup
        .string()
        .matches(/^[0-9]+$/, "Must be only number")
        .max(10, "Phone Number must be 10 digits")
        .required("Phone number is required"),
      company_name: yup.string().required("Company Name is required"),
      company_dot: yup
        .string()
        .matches(/^[0-9]+$/, "Must be only number")
        .required("Company Dot is required"),
      state: yup.string().required("State is required"),
      password: yup
        .string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .required("Password is required"),
    }),
  });

  const handleSubmit = (values) => {
    console.log("values", values);
    const {
      name,
      email,
      password,
      phone_number,
      company_dot,
      company_name,
      state,
    } = values;
    UserPool.signUp(
      email,
      password,
      [
        { Name: "name", Value: name },
        { Name: "phone_number", Value: `${phonecode ? phonecode :"+1"}${phone_number}` },
        { Name: "custom:company_dot", Value: company_dot },
        { Name: "custom:company_name", Value: company_name },
        { Name: "custom:state", Value: state },
      ],
      null,
      (err, data) => {
        if (err) {
          toast.error(err.message);
          console.log("err", err);
        } else {
          toast.success("Your form is successfully submit");
          navigate("/login");
        }
      }
    );

    // console.log("data", formdata);
  };
  return (
    <>
      <Header />
      <section className="loginBg">
        <div className="container">
          <div className="row">
            <div className="col-md-6 loginImg">
              <img src={operator} alt="" />
            </div>
            <div className="col-md-6">
              <div className="loginContainer">
                <h2>Operator Registration</h2>
                <h6>
                  Please enter your company information and a member of the
                  CharterSUB provider network team will be in touch with you
                  shortly.
                </h6>
                <br></br>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                      placeholder="Contact Full Name"
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div style={{ color: "red" }}>{formik.errors.name}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-md-3">
                        <select
                          className="form-control"
                          onChange={(e) => setphonecode(e.target.value)}
                          value={phonecode}
                          name="state"
                          type="text"
                        >
                          <option>Select</option>
                          {PhoneNumber_code.map((data, index) => {
                            return (
                              <option
                                value={data.dial_code}
                                key={index}
                                selected={
                                  data.dial_code === "+1" ? true : false
                                }
                              >
                                {data.code}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="col-md-9">
                        <input
                          type="text"
                          name="phone_number"
                          value={formik.values.phone_number}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="form-control"
                          placeholder="Contact number"
                        />
                      </div>
                    </div>

                    {formik.touched.phone_number &&
                      formik.errors.phone_number && (
                        <div style={{ color: "red" }}>
                          {formik.errors.phone_number}
                        </div>
                      )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                      placeholder="Contact Email"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div style={{ color: "red" }}>{formik.errors.email}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                      placeholder="Password"
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div style={{ color: "red" }}>
                        {formik.errors.password}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="company_name"
                      value={formik.values.company_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                      placeholder="Company Name"
                    />
                    {formik.touched.company_name &&
                      formik.errors.company_name && (
                        <div style={{ color: "red" }}>
                          {formik.errors.company_name}
                        </div>
                      )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="company_dot"
                      value={formik.values.company_dot}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                      placeholder="Company DOT"
                    />
                    {formik.touched.company_dot &&
                      formik.errors.company_dot && (
                        <div style={{ color: "red" }}>
                          {formik.errors.company_dot}
                        </div>
                      )}
                  </div>
                  <div className="mb-3">
                    {/* <input
                      type="text"
                      name="state"
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                      placeholder="State"
                    /> */}
                    <select
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values.state}
                      name="state"
                      type="text"
                    >
                      <option>Select State</option>
                      {US_State.map((data, index) => {
                        return (
                          <option value={data.abbreviation}>{data.name}</option>
                        );
                      })}
                    </select>
                    {formik.touched.state && formik.errors.state && (
                      <div style={{ color: "red" }}>{formik.errors.state}</div>
                    )}
                  </div>
                  <div className="regdCheck">
                    <input type="checkbox" className="" name="terms" />I have
                    read and agree to the &nbsp;
                    <a href="#">Affiliate Service Terms</a>
                  </div>
                  <p className="forgetPass mb-5">
                    <a href="/forgotpassword">Forget password?</a>
                  </p>
                  <button
                    type="submit"
                    className="commonButton"
                    // onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </form>
                <p className="mb-4 alreadyAccount">
                  Already have an account? <a href="/login">Login</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
