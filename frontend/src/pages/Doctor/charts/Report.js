import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// import * as MdIcons from 'react-icons/md';
import { Helmet } from "react-helmet";
import EmbedSDK from "@mongodb-js/charts-embed-dom/";
import barangays from "../../../data/barangay";
import AgeChart from "./AgeChart";
import ServicesChart from "./ServicesChart";
function Report() {
 

  return (
    <div class="ml-20">
      <Helmet>
        <title>RHU Calauag | Charts</title>
        <meta name="description" content="Charts" />
      </Helmet>
    

      <AgeChart />
      <ServicesChart/>

      {/* <MdIcons.MdArrowBack><Link to="/"> BACK </Link></MdIcons.MdArrowBack>  */}

      {/* pie chart - gender  */}
      <div className="donut-gender">
        <iframe
          title="donut-gender"
          style={{
         
            width: "100%",
            height: "400px",
          }}
          src="https://charts.mongodb.com/charts-capstone-rdggn/embed/charts?id=636f9a03-3d08-4f35-8a11-2618c96b5e1c&maxDataAge=10&theme=light&autoRefresh=true"
        ></iframe>
      </div>

      {/* Chart for address */}
      <div className="chart-address">
        <iframe
          title="chartaddress"
          class='w-full'
          height="600"
          src="https://charts.mongodb.com/charts-capstone-rdggn/embed/charts?id=636f9c40-bbc8-4d24-8f07-ebbe86ffb1c1&maxDataAge=10&theme=light&autoRefresh=true"
        ></iframe>
      </div>

      {/* Chart for age */}
      <div className="chart-age">
        <iframe
          title="chartage"
          style={{
           
            width: "100%",
            height: "400px",
          }}
          src="https://charts.mongodb.com/charts-capstone-rdggn/embed/charts?id=636f9e9e-02c9-4000-80d9-f6da73e7c7ea&maxDataAge=10&theme=light&autoRefresh=true"
        ></iframe>
      </div>

      {/* CHART - SERVICES */}
      <div className="chart-services">
        <iframe
          title="chartservices"
          style={{
    
            width: "100%",
            height: "400px",
          }}
          src="https://charts.mongodb.com/charts-capstone-rdggn/embed/charts?id=637fb005-733c-47dd-837a-4e2520db6d40&maxDataAge=10&theme=light&autoRefresh=true"
        >
          {" "}
        </iframe>
      </div>
    </div>
  );
}

export default Report;
