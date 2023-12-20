import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeamOperatorType,
  specificTeam,
  updatespecificTeam,
} from "../../../Redux/teamSlice";
import HeaderSecond from "../../../Common/HeaderSecond";
import Sidebar from "../../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { updateSpecificTeamData } from "../../../Service/apis";
const TeamDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.team);
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  const operator_cognito_id = localStorage.getItem("cognito_id");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [type, setType] = useState();
  const [profileImage, setProfileImage] = useState();
  const [imageData, setImageData] = useState();
  const getTeamDetails = async () => {
    const data = {
      operator_cognito_id,
      id,
    };
    dispatch(specificTeam(data));
  };
  const getAllTeamType = async () => {
    dispatch(fetchTeamOperatorType());
  };
  useEffect(() => {
    getAllTeamType();
    getTeamDetails();
  }, []);

  const update = async () => {
    const data = {
      operatorteam_firstname: firstName,
      operatorteam_lastname: lastName,
      operatorteam_email: email,
      operatorteam_type: type,
      operatorteam_image: imageData ? imageData : profileImage,
    };
    const params = {
      data,
      operator_cognito_id,
      id,
    };
    dispatch(updatespecificTeam(params));
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
      setImageData(newData);
    });
    setProfileImage(URL.createObjectURL(input.target.files[0]));
  }
  useEffect(() => {
    setFirstName(state?.specificTeamData?.OperatorTeam?.operatorteam_firstname);
    setLastName(state?.specificTeamData?.OperatorTeam?.operatorteam_lastname);
    setEmail(state?.specificTeamData?.OperatorTeam?.operatorteam_email);
    setType(state?.specificTeamData?.OperatorTeamType?.operatorteamtype_id);
    setProfileImage(state?.specificTeamData?.OperatorTeam?.operatorteam_image);
  }, [state]);
  return (
    <div>
      <HeaderSecond />
      <section className="">
        <div className="container">
          <div className="row">
            <Sidebar />
            <div className="col-lg-9">
              <div className="dbRgt">
                <div className="bookinghdn">
                  <h4>Team Details</h4>
                  <div>
                    <button
                      className="commonButton cancel"
                      onClick={() => navigate("/operator/team")}
                    >
                      Cancel
                    </button>
                    &nbsp;&nbsp;
                    <button className="commonButton" onClick={update}>
                      Update
                    </button>
                  </div>
                </div>
                <div className="vehiclebase">
                  <div class="emUploadImg">
                    <div class="imageUpload">
                      <img src={profileImage} id="blah" alt="ImgData" />
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
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        value={firstName}
                        className="form-control"
                        onChange={(event) => setFirstName(event.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        value={lastName}
                        className="form-control"
                        onChange={(event) => setLastName(event.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Email</label>
                      <input
                        type="email"
                        name="address"
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Type</label>
                      <select
                        class="form-control"
                        name="operatorteam_type"
                        onChange={(event) => setType(event.target.value)}
                      >
                        <option>Select</option>
                        {state?.type.length !== 0 &&
                          state?.type.map((data) => (
                            <option
                              selected={
                                type ===
                                data.OperatorTeamType.operatorteamtype_id
                                  ? true
                                  : false
                              }
                              value={data.OperatorTeamType.operatorteamtype_id}
                            >
                              {data.OperatorTeamType.operatorteamtype_name}
                            </option>
                          ))}
                      </select>
                    </div>
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

export default TeamDetails;
