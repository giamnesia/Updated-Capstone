import React from 'react';
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiNotepad } from "react-icons/bi";
// import { MdPendingActions } from "react-icons/md";
// import { AiOutlineFileDone } from "react-icons/ai";


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
  }, [patientCount]);

  return (
    <div className="board">
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

 
     

    </div>
  );
};

export default Count;