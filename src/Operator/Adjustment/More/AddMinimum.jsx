import React from 'react'
import HeaderSecond from '../../../Common/HeaderSecond'
import Sidebar from '../../Sidebar/Sidebar'
import { useNavigate } from 'react-router-dom'

const AddMinimum = () => {
    const navigate=useNavigate()
  return (
    <div>
        <HeaderSecond/>
        <section className="">
        <div className="container">
            <div className="row">
              <Sidebar/>
                <div className="col-lg-9">
                    <div className="dbRgt">
                        <div className="bookinghdn">
                            <h4>Add Minimum</h4>
                            <div><button className="commonButton cancel"  onClick={()=>navigate('/operator/rates',{state:{active:"tb3"}})}>Cancel</button>&nbsp;&nbsp;
                            <button className="commonButton" onClick={()=>navigate('/operator/rates',{state:{active:"tb3"}})}>Save</button></div>
                        </div>
                        <div className="vehiclebase">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Adjustment Name</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Day</label>
                                    <select className="form-control">
                                        <option></option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Start Date</label>
                                    <input type="date" id="" placeholder="Select date" className="form-control" /> 
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>End Date</label>
                                    <input type="date" id="" placeholder="Select date" className="form-control" /> 
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Vehicle Type</label>
                                    <select className="form-control">
                                        <option>Select vehicle type</option>
                                    </select>
                                    <div className="vehicletype">Please select your vehicle type then enter daily, hourly and mileage 
minimum quantities and rates to create your pricing minimum.</div>
                                </div>
                                
                            </div>
                            <h6 className="addVehicle"><i className="fa-solid fa-plus"></i> Add Vehicle Type</h6>
                            
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    </section>
      
    </div>
  )
}

export default AddMinimum
