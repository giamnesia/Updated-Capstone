import React from 'react';
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiNotepad } from "react-icons/bi";
import { BsFillPeopleFill } from 'react-icons/bs'
import { Icon } from '@chakra-ui/react'
const Count = () => {
  const [patientCount, setPatient] = useState();
  
  useEffect(() => {
    const fetchCount = async () => {
      const response = await fetch("portal/health/count");
      const json = await response.json();

      try {
        if (response.ok) {
          setPatient(json);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCount();
  }, []);

  return (
    <div className="flex flex-col items-start ">
      <p>Dashboard</p>
      <div class='flex flex-row items-start'>
      <div className="dash">
        <BiNotepad className="dash-icon"/>
        <div className="dash-text">
          <p className="dash-p">
            Number of Total Patients:{" "}
          </p>
          <span className="dash-count">
            {patientCount && patientCount.totalPatient}
          </span>
        </div>
      </div>
      <div className="dash">
        <BsFillPeopleFill className="dash-icon"/>
        <div className="dash-text">
          <p className="dash-p">
            Number of Staff Members:{" "}
          </p>
          <span className="dash-count">
            {patientCount && patientCount.totalDoctor}
          </span>
        </div>
      </div>
      </div>
    


 
     

    </div>
  );
};

export default Count;