import React from "react";
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiNotepad } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiHealthBookLine } from "react-icons/ri";
import { Helmet } from "react-helmet";

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
    getDate();
  }, []);

  const getDate = () => {
    var today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    var curTime =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    setDateNow(date + " " + curTime);
  };

  return (
    <div class="mx-20">
      <div className="flex flex-col items-start ml-10 ">
        <Helmet>
          <title>RHU Calauag | Charts</title>
          <meta name="description" content="Charts" />
        </Helmet>
        <div class="mt-10">
          <div class="flex items-center justify-between">
            <p
              tabindex="0"
              class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
            >
              Dashboard
            </p>
          </div>
        </div>

        <div class="mt-5">
          <p> Good day, Admin</p>
          <p>
            Today is <span class="font-bold">{dateNow}</span>
          </p>
        </div>
        <div class="flex flex-row items-center mt-5  flex-wrap">
          <div class="flex flex-row items-center justify-between block p-3 m-2 h-26 w-80 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 ">
            <BiNotepad class="w-20 h-20 text-orange-500" />
            <div class="flex flex-col items-end justify-end">
              <p class="mb-2 text-end text-xl text-semibold text-gray-900">
                Number of Total Patients:
              </p>
              <span class="text-3xl font-bold  ">
                {patientCount && patientCount.totalPatient}
              </span>
            </div>
          </div>

          <div class="flex flex-row items-center justify-between block p-3 m-2 h-26 w-80 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 ">
            <RiHealthBookLine class="w-20 h-20 text-orange-500" />
            <div class="flex flex-col items-end justify-end">
              <p class="mb-2 text-end text-xl text-semibold text-gray-900">
                Number of Consultations:
              </p>
              <span class="text-3xl font-bold  ">
                {" "}
                {patientCount && patientCount.totalConsult}
              </span>
            </div>
          </div>

          <div class="flex flex-row items-center justify-between block p-3 m-2 h-26 w-72 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 ">
            <BsFillPeopleFill class="w-16 h-16 text-orange-500" />
            <div class="flex flex-col items-end justify-end">
              <p class="mb-2 text-end text-xl text-semibold text-gray-900">
                Number of Staff Members:
              </p>
              <span class="text-3xl font-bold  ">
                {patientCount && patientCount.totalDoctor}
              </span>
            </div>
          </div>
        </div>
      
      
      </div>
      <br />
      <div class="flex flex-row items-center">
        <iframe
          width="500"
          height="480"
          src="https://charts.mongodb.com/charts-capstone-rdggn/embed/charts?id=63fe398a-276b-4c81-848c-76a6e802b5d6&maxDataAge=60&theme=light&autoRefresh=true"
        ></iframe>
        <iframe
          title="chartservices"
          width="900"
          height="480"
          src="https://charts.mongodb.com/charts-capstone-rdggn/embed/charts?id=637fb005-733c-47dd-837a-4e2520db6d40&maxDataAge=10&theme=light&autoRefresh=true"
        >
          {" "}
        </iframe>
      </div>
    </div>
  );
};

export default Count;
