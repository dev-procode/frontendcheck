import React, { useState, useEffect } from "react";
import HeaderSecond from "../../../Common/HeaderSecond";
import Sidebar from "../../Sidebar/Sidebar";
import * as yup from "yup";
import { useFormik } from "formik";
import { addCompany } from "../../../Service/apis";
import { getSpecificCompanyData } from "../../../Service/apis";
import { useLocation, useNavigate } from "react-router-dom";

const EditCompany = () => {
    const navigate = useNavigate();
  const operator_cognito_id = localStorage.getItem("cognito_id");
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  const [files, setFiles] = useState("");
  const [imageData, setImageData] = useState("");
  const [formValue, setFormValue] = useState({
    operator_company_name: "",
    operator_company_address: "",
    operator_company_email: "",
    operator_company_website: "",
    operator_company_phone: "",
    operator_company_dispatch_phone: "",
    operator_company_mobile_number: "",
  });
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
  };
  const formik = useFormik({
    initialValues: {
      operator_company_name: "",
      operator_company_address: "",
      operator_company_email: "",
      operator_company_website: "",
      operator_company_phone: "",
      operator_company_dispatch_phone: "",
      operator_company_mobile_number: "",
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
        .number()
        .typeError("Phone number must be a number")
        .positive("Phone number must be a positive number")
        .integer("Phone number must be an integer"),
      operator_company_dispatch_phone: yup
        .number()
        .typeError("Phone number must be a number")
        .positive("Phone number must be a positive number")
        .integer("Phone number must be an integer"),
      operator_company_mobile_number: yup
        .number()
        .typeError("Phone number must be a number")
        .positive("Phone number must be a positive number")
        .integer("Phone number must be an integer"),
    }),
  });

  const getComapnyData = async () => {
    const responce = await getSpecificCompanyData(operator_cognito_id, id);
    setFormValue({
      ...formValue,
      operator_company_name: responce.operator_company_name,
      operator_company_address: responce.operator_company_address,
      operator_company_email: responce.operator_company_email,
      operator_company_website: responce.operator_company_website,
      operator_company_phone: responce.operator_company_phone,
      operator_company_dispatch_phone: responce.operator_company_dispatch_phone,
      operator_company_mobile_number: responce.operator_company_mobile_number,
    });
  };
  useEffect(() => {
    getComapnyData();
  }, []);
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
      operator_company_image: imageData,
      operator_company_name: operator_company_name,
      operator_company_address: operator_company_address,
      operator_company_email: operator_company_email,
      operator_company_website: operator_company_website,
      operator_company_phone: operator_company_phone
        ? operator_company_phone
        : 0,
      operator_company_dispatch_phone: operator_company_dispatch_phone
        ? operator_company_dispatch_phone
        : 0,
      operator_company_mobile_number: operator_company_mobile_number
        ? operator_company_mobile_number
        : 0,
    };
    const responce = await addCompany(data);
    console.log("response", responce);
  };
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

                  <div>
                 
                    <button class="commonButton"  onClick={() => navigate("/operator/company")}>
                      Cancel
                    </button>
                  </div>
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
                    </div>
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
                    </div>
                  </div>
                  <div class="text-center">
                    <button class="commonButton" onClick={formik.handleSubmit}>
                      Update
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

export default EditCompany;
