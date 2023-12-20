import React, { useState, useEffect } from "react";
import HeaderSecond from "../../../Common/HeaderSecond";
import Sidebar from "../../Sidebar/Sidebar";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  addCompany,
  getOperatorCompany,
  updateSpecificCompany,
} from "../../../Service/apis";
import { Link, useNavigate } from "react-router-dom";

const Company = () => {
  const operator_cognito_id = localStorage.getItem("cognito_id");
  const [files, setFiles] = useState("");
  const [imageData, setImageData] = useState("");
  const [uploadImage, setUploadImage] = useState("");
  const [imageError, setImageError] = useState(false);
  const [operator_company_data, setOperator_company_data] = useState([]);
  const [comapanyId, setComapanyId] = useState();
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  const handleFileUpload = (file) => {
    setFiles(file.length + "Files to upload");
    console.log("file", file[0]);
    getBase64(file[0]).then((data) => {
      let newData = data.replace(/^data:image\/[a-z]+;base64,/, "");
      setImageData(newData);
    });
    setUploadImage(URL.createObjectURL(file[0]));
    setImageError(false);
  };
  const formik = useFormik({
    initialValues: {
      operator_company_name: "",
      operator_company_address: "",
      operator_company_email:
        operator_company_data?.OperatorCompany?.operator_company_email,
      operator_company_website:
        operator_company_data?.OperatorCompany?.operator_company_website,
      operator_company_phone:
        operator_company_data?.OperatorCompany?.operator_company_phone,
      operator_company_dispatch_phone:
        operator_company_data?.OperatorCompany?.operator_company_dispatch_phone,
      operator_company_mobile_number:
        operator_company_data?.OperatorCompany?.operator_company_mobile_number,
    },
    onSubmit: (values) => handleSubmit(values),
    validationSchema: yup.object().shape({
      operator_company_name: yup.string().required("Name is required"),
      operator_company_email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
      operator_company_address: yup.string().required("Address is required"),
      operator_company_website: yup.string(),
      operator_company_phone: yup
        .string()
        .matches(/^[0-9]+$/, "Must be only number")
        .max(10, "Phone Number must be 10 digits")
        .required("Operator company phone number is required"),
      operator_company_dispatch_phone: yup
        .string()
        .matches(/^[0-9]+$/, "Must be only number")
        .max(10, "Phone Number must be 10 digits")
        .required("Operator company dispatch phone number is required"),
      operator_company_mobile_number: yup
        .string()
        .matches(/^[0-9]+$/, "Must be only number")
        .max(10, "Phone Number must be 10 digits")
        .required("Operator company mobile phone number is required"),
    }),
  });

  const handleSubmit = async (values) => {
    console.log("values", values, imageData);
    const {
      operator_company_name,
      operator_company_address,
      operator_company_email,
      operator_company_website,
      operator_company_phone,
      operator_company_dispatch_phone,
      operator_company_mobile_number,
    } = values;
    const data = {
      operator_cognito_id: operator_cognito_id,
      operator_company_image: imageData ? imageData : uploadImage,
      operator_company_name: operator_company_name,
      operator_company_address: operator_company_address,
      operator_company_email: operator_company_email,
      operator_company_website: operator_company_website,
      operator_company_phone: operator_company_phone,
      operator_company_dispatch_phone: operator_company_dispatch_phone,
      operator_company_mobile_number: operator_company_mobile_number,
    };
    if (uploadImage) {
      if (comapanyId) {
        Object.keys(data).forEach((key) => {
          if (data[key] === operator_company_data.OperatorCompany[key]) {
            delete data[key];
          }
        });
        const responseupdate = await updateSpecificCompany(
          data,
          operator_cognito_id,
          comapanyId
        );
        console.log("responseupdate",responseupdate)
        // if(responseupdate)        
      } else {
        const response = await addCompany(data);
      }
      getCompanyData();
    } else {
      setImageError(true);
    }
  };
  const getCompanyData = async () => {
    const response = await getOperatorCompany(operator_cognito_id);

    if (response?.data) {
      setOperator_company_data(response?.data[0]);
      formik.values.operator_company_name =
        response?.data[0].OperatorCompany?.operator_company_name;
      formik.values.operator_company_address =
        response?.data[0].OperatorCompany?.operator_company_address;
      formik.values.operator_company_email =
        response?.data[0].OperatorCompany?.operator_company_email;
      formik.values.operator_company_website =
        response?.data[0].OperatorCompany?.operator_company_website;
      formik.values.operator_company_phone =
        response?.data[0].OperatorCompany?.operator_company_phone;
      formik.values.operator_company_dispatch_phone =
        response?.data[0].OperatorCompany?.operator_company_dispatch_phone;
      formik.values.operator_company_mobile_number =
        response?.data[0].OperatorCompany?.operator_company_mobile_number;
      setUploadImage(response?.data[0].OperatorCompany?.operator_company_image);
      setComapanyId(response?.data[0].OperatorCompany?.operator_company_id);
      console.log("respo", response?.data[0]);
    }
  };
  useEffect(() => {
    getCompanyData();
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
                  <h4>Company Information</h4>

                  {/* <div>
                    <button class="commonButton">
                      <Link to={`companydetails/?id=`}>
                        Edit
                      </Link>
                    </button>
                  </div> */}
                </div>
                <div class="vehiclebase">
                  <div class="file-upload">
                    {files ? (
                      <label class="file-upload__label">{files}</label>
                    ) : (
                      <label class="file-upload__label">
                        <i class="fa-solid fa-cloud-arrow-up"></i>
                        <br /> Drop or upload Logo
                      </label>
                    )}

                    <input
                      class="file-upload__input"
                      multiple=""
                      type="file"
                      onChange={(e) => handleFileUpload(e.target.files)}
                    />
                  </div>
                  {uploadImage && (
                    <div className="imageContainer">
                      <h5>Uploaded Image</h5>
                      <img
                        src={uploadImage}
                        alt="imgdata"
                        className="companylogo"
                      />
                    </div>
                  )}
                  {imageError && (
                    <div style={{ color: "red", textAlign: "center" }}>
                      Please upload file
                    </div>
                  )}
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label>Name</label>
                      <input
                        type="text"
                        class="form-control"
                        name="operator_company_name"
                        value={formik.values.operator_company_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.operator_company_name &&
                        formik.errors.operator_company_name && (
                          <div style={{ color: "red" }}>
                            {formik.errors.operator_company_name}
                          </div>
                        )}
                    </div>
                    {/* <div class="col-md-6 mb-3">
                                    <label>Date</label>
                                    <input type="date" class="form-control" />
                                </div> */}
                    <div class="col-md-6 mb-3">
                      <label>Address</label>
                      <input
                        type="text"
                        class="form-control"
                        name="operator_company_address"
                        value={formik.values.operator_company_address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {/* <input
                        type="text"
                        name="address"
                        value={searchData}
                        className="form-control"
                        onChange={handleChangeInput}
                      />
                      <ul className="list-group listclass">
                        {searchList.length != 0 &&
                          searchList.map((data, i) => (
                            <li
                              key={i}
                              value={data?.place_id}
                              className="list-group-item"
                              onClick={() => handleSelectSearch(data)}
                            >
                              {data?.description}
                            </li>
                          ))}
                      </ul> */}
                      {formik.touched.operator_company_address &&
                        formik.errors.operator_company_address && (
                          <div style={{ color: "red" }}>
                            {formik.errors.operator_company_address}
                          </div>
                        )}
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Email</label>
                      <input
                        type="email"
                        class="form-control"
                        name="operator_company_email"
                        value={formik.values.operator_company_email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.operator_company_email &&
                        formik.errors.operator_company_email && (
                          <div style={{ color: "red" }}>
                            {formik.errors.operator_company_email}
                          </div>
                        )}
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Website</label>
                      <input
                        type="text"
                        class="form-control"
                        name="operator_company_website"
                        value={formik.values.operator_company_website}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.operator_company_website &&
                        formik.errors.operator_company_website && (
                          <div style={{ color: "red" }}>
                            {formik.errors.operator_company_website}
                          </div>
                        )}
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Company Phone</label>
                      <input
                        type="text"
                        class="form-control"
                        name="operator_company_phone"
                        value={formik.values.operator_company_phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.operator_company_phone &&
                        formik.errors.operator_company_phone && (
                          <div style={{ color: "red" }}>
                            {formik.errors.operator_company_phone}
                          </div>
                        )}
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Dispatch Phone</label>
                      <input
                        type="text"
                        class="form-control"
                        name="operator_company_dispatch_phone"
                        value={formik.values.operator_company_dispatch_phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.operator_company_dispatch_phone &&
                        formik.errors.operator_company_dispatch_phone && (
                          <div style={{ color: "red" }}>
                            {formik.errors.operator_company_dispatch_phone}
                          </div>
                        )}
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Mobile Number</label>
                      <input
                        type="text"
                        class="form-control"
                        name="operator_company_mobile_number"
                        value={formik.values.operator_company_mobile_number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.operator_company_mobile_number &&
                        formik.errors.operator_company_mobile_number && (
                          <div style={{ color: "red" }}>
                            {formik.errors.operator_company_mobile_number}
                          </div>
                        )}
                    </div>
                    {/* <div class="col-md-12 mb-4">
                                    <label>What ELD(s) does your company use?</label>
                                    <select class="form-control">
                                        <option></option>
                                    </select>
                                </div> */}
                  </div>
                  <div class="text-center">
                    <button class="commonButton" onClick={formik.handleSubmit}>
                      {comapanyId ? "Update" : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Company;
