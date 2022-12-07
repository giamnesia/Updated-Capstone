import React from 'react';
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiNotepad } from "react-icons/bi";
import { BsFillPeopleFill } from 'react-icons/bs'
import {RiHealthBookLine} from 'react-icons/ri'
import { Icon } from '@chakra-ui/react'

const Count = () => {
  const [patientCount, setPatient] = useState();
  const [dateNow, setDateNow] = useState();
  

  

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
    getDate()
  }, []);

  const getDate=()=>{
    var today = new Date(),

    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var curTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    setDateNow(date + ' ' + curTime)
  }
  

  return (
    <div className="flex flex-col items-start ml-20 ">
         <div class="px-4 md:px-10 py-4 md:py-7">
                <div class="flex items-center justify-between">
                    <p tabindex="0" class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Dashboard</p>
                  
                </div>
            </div>
      <p>Dashboard</p>
      <div>
        <p> Good day, Admin</p>
      </div>
      <p>{dateNow}</p>
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
        <RiHealthBookLine className="dash-icon"/>
        <div className="dash-text">
          <p className="dash-p">
            Number of Consultations:{" "}
          </p>
          <span className="dash-count">
            {patientCount && patientCount.totalConsult}
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