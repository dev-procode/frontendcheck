import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamOperatorType, addTeam } from "../../../Redux/teamSlice";
import HeaderSecond from "../../../Common/HeaderSecond";
import Sidebar from "../../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import uploaduser from "../../../assets/images/uploaduser.png";
import * as yup from "yup";
import { useFormik } from "formik";

const AddTeamUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.team);
  const [profile, setProfile] = useState();
  const [allTeamType, setAllTeamType] = useState([]);
  const [profileImage, setProfileImage] = useState();
  const [imageError, setImageError] = useState(false);
  const operator_cognito_id = localStorage.getItem("cognito_id");
  const formik = useFormik({
    initialValues: {
      operatorteam_firstname: "",
      operatorteam_lastname: "",
      operatorteam_email: "",
      operatorteam_type: 0,
    },
    onSubmit: (values) => handleSubmit(values),
    validationSchema: yup.object().shape({
      operatorteam_firstname: yup.string().required("First name is required"),
      operatorteam_lastname: yup.string().required("Last name is required"),
      operatorteam_email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
      operatorteam_type: yup.number().required("Type is required"),
    }),
  });
  const handleSubmit = async (values) => {
    const data = {
      operator_cognito_id: operator_cognito_id,
      operatorteam_firstname: values.operatorteam_firstname,
      operatorteam_lastname: values.operatorteam_lastname,
      operatorteam_email: values.operatorteam_email,
      operatorteam_type: values.operatorteam_type,
      operatorteam_image: profileImage,
    };
    if (profile) {
      dispatch(addTeam(data));
      navigate("/operator/team");
    } else {
      setImageError(true);
    }
  };
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  function readUrl(input) {
    getBase64(input.target.files[0]).then((data) => {
      let newData = data.replace(/^data:image\/[a-z]+;base64,/, "");
      setProfileImage(newData);
    });
    setProfile(URL.createObjectURL(input.target.files[0]));
    setImageError(false);
  }
  const getAllTeamType = async () => {
    dispatch(fetchTeamOperatorType());
  };
  useEffect(() => {
    getAllTeamType();
  }, []);
  return (
    <div>
      <HeaderSecond />
      <section class="">
        <div class="container">
          <div class="row">
            <Sidebar />
            <div class="col-lg-9">
              <div class="dbRgt">
                <div class="bookinghdn">
                  <h4>Add User</h4>

                  <div>
                    <button
                      className="commonButton cancel"
                      onClick={() => navigate("/operator/team")}
                    >
                      Cancel
                    </button>
                    &nbsp;&nbsp;
                    <button class="commonButton" onClick={formik.handleSubmit}>
                      Save
                    </button>
                  </div>
                </div>
                <div class="vehiclebase">
                  <div class="emUploadImg">
                    <div class="imageUpload">
                      <img
                        src={profile ? profile : uploaduser}
                        id="blah"
                        alt="Img"
                      />
                      <div class="uploadInput">
                        <span>
                          <i class="fa-solid fa-plus"></i>
                        </span>
                        <input
                          type="file"
                          id="inputFile"
                          onChange={(e) => readUrl(e)}
                        />
                      </div>
                    </div>
                  </div>
                  {imageError && (
                    <div style={{ color: "red", textAlign: "center" }}>
                      Please upload profile picture
                    </div>
                  )}
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label>First Name</label>
                      <input
                        type="text"
                        class="form-control"
                        name="operatorteam_firstname"
                        value={formik.values.operatorteam_firstname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.operatorteam_firstname &&
                        formik.errors.operatorteam_firstname && (
                          <div style={{ color: "red" }}>
                            {formik.errors.operatorteam_firstname}
                          </div>
                        )}
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Last Name</label>
                      <input
                        type="text"
                        class="form-control"
                        name="operatorteam_lastname"
                        value={formik.values.operatorteam_lastname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.operatorteam_lastname &&
                        formik.errors.operatorteam_lastname && (
                          <div style={{ color: "red" }}>
                            {formik.errors.operatorteam_lastname}
                          </div>
                        )}
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Email</label>
                      <input
                        type="email"
                        class="form-control"
                        name="operatorteam_email"
                        value={formik.values.operatorteam_email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.operatorteam_email &&
                        formik.errors.operatorteam_email && (
                          <div style={{ color: "red" }}>
                            {formik.errors.operatorteam_email}
                          </div>
                        )}
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Type</label>
                      <select
                        class="form-control"
                        name="operatorteam_type"
                        value={formik.values.operatorteam_type}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Select</option>
                        {state?.type.length !== 0 &&
                          state?.type.map((data) => (
                            <option
                              value={data.OperatorTeamType.operatorteamtype_id}
                            >
                              {data.OperatorTeamType.operatorteamtype_name}
                            </option>
                          ))}
                      </select>
                      {formik.touched.operatorteam_type &&
                        formik.errors.operatorteam_type && (
                          <div style={{ color: "red" }}>
                            {formik.errors.operatorteam_type}
                          </div>
                        )}
                    </div>
                  </div>
                  {/* <div class="checkbx">
                    <span>
                      <input type="checkbox" /> This user is also a driver
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddTeamUser;
