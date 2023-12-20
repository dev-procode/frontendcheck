import React, { useState } from "react";
import Header from "../../Common/Header";
import operator from "../../assets/images/operator.jpg";
import UserPool from "./customerUserPool";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import PhoneNumber_code from "../../State/Phonenumber_code";
import { useNavigate } from "react-router-dom";

const CustomerSignUp = () => {
  const navigate = useNavigate();
  const [phonecode, setphonecode] = useState();
  const formik = useFormik({
    initialValues: {
      name: "",
      phone_number: "",
      email: "",
      password: "",
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
    } = values;
    UserPool.signUp(
      email,
      password,
      [
        { Name: "name", Value: name },
        {
          Name: "phone_number",
          Value: `${phonecode ? phonecode : "+1"}${phone_number}`,
        },
      ],
      null,
      (err, data) => {
        if (err) {
          toast.error(err.message);
          console.log("err", err);
        } else {
          toast.success("Your form is successfully submit");
          navigate("/customerlogin");
        }
      }
    );
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
                <h2>Customer Registration</h2>
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

export default CustomerSignUp;
