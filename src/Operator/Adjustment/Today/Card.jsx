import React from "react";
import bus from "../../../assets/images/bus.png";
import driver from "../../../assets/images/driver.png";

const Card = () => {
  return (
      <div class="bookingBox">
        <h6>Bowie &gt; Rank</h6>
        <p>03/16/2023 8:00 am</p>
        <div class="bookingusrslot">
          <div class="bookcarslot">
            <span class="bcc">
              <img src={bus} alt="" />
            </span>
            <span class="bcc1">
              <img src={bus} alt="" />
            </span>
            <span class="bcc2">
              <img src={bus} alt="" />
            </span>
          </div>
          <div class="bookcarslot">
            <span class="bcc">
              <img src={driver} alt="" />
            </span>
            <span class="bcc1">
              <img src={driver} alt="" />
            </span>
            <span class="bcc2">
              <img src={driver} alt="" />
            </span>
          </div>
        </div>
        <h6>$5,850</h6>
      </div>
  );
};

export default Card;
