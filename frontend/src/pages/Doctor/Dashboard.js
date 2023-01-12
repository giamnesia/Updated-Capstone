import React from 'react';
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiNotepad } from "react-icons/bi";
import { BsFillPeopleFill } from 'react-icons/bs'
import {RiHealthBookLine} from 'react-icons/ri'
import { Icon } from '@chakra-ui/react'
import { Helmet } from 'react-helmet';

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
    <div class='mx-20'>
    <div className="flex flex-col items-start ml-20 ">
       <Helmet>
        <title>RHU Calauag | Charts</title>
        <meta name="description" content="Charts" />
        </Helmet>
         <div class="mt-10">
                <div class="flex items-center justify-between">
                    <p tabindex="0" class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Dashboard</p>
                  
                </div>
            </div>

      <div class='mt-5'>
        <p> Good day, Admin</p>
         <p>Today is <span class='font-bold'>{dateNow}</span></p>

      </div>
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
    <div className='chart-services'>
    <iframe 
    title='chartservices'
    style=
   {{ background: "#FFFFFF",
   marginTop:'1em',
    border: "none",
    borderRadius: "2px",
    boxShadow:" 0 2px 10px 0 rgba(70, 76, 79, .2)",
    width: "100%",
    height: "400px",  }}

    src="https://charts.mongodb.com/charts-capstone-rdggn/embed/charts?id=637fb005-733c-47dd-837a-4e2520db6d40&maxDataAge=10&theme=light&autoRefresh=true"> </iframe>

    </div>
   </div>
  );
};

export default Count;