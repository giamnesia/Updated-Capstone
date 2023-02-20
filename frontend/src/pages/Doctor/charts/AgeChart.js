import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// import * as MdIcons from 'react-icons/md';
import { Helmet } from "react-helmet";
import EmbedSDK from "@mongodb-js/charts-embed-dom/";
import barangays from "../../../data/barangay";

function AgeChart() {
  const chartDiv = useRef(null);
  const [rendered, setRendered] = useState(false);
  const [gender, setGender] = useState();
  const [purpose, setPurpose] = useState();
  const [barangay, setBarangay] = useState();

  const sdk = new EmbedSDK({
    baseUrl: "https://charts.mongodb.com/charts-capstone-rdggn",
  });

  const chart = sdk.createChart({
    chartId: "63c2d09e-23d1-400e-85af-81a842d5e59e",
    height: 640,
    weight: 500,
  });

  useEffect(() => {
    chart
      .render(chartDiv.current)
      .then(() => setRendered(true))
      .catch((err) => console.log("Error during Charts rendering.", err));
  }, [chart]);

  const handleDate = (e) => {
    const date = new Date(e.target.value);
    chart.setFilter(
      { createdAt: { $gte: date } },
      { gender: { $gte: gender } }
    );
  };
  const handleGender = (e) => {
    e.preventDefault();

    chart.setFilter({ gender: { $eq: e.target.value } });
  };
  const handleBarangay = (e) => {
    chart.setFilter({ address: { $eq: e.target.value } });
  };

  return (
    <div  >
      <Helmet>
        <title>RHU Calauag | Charts</title>
        <meta name="description" content="Charts" />
      </Helmet>
      <form onChange={handleGender} class='w-56 ml-10'>
        <select 
          class="block w-full px-8 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md   focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"

        >
          <option selected="selected" value=''>Choose Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </form>
      <form onChange={handleBarangay} class='w-56 ml-10'>
      <select
          class="block w-full px-8 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md   focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"
          
          >
      
          {barangays.map((item) => (
          <>
              <option value="" selected="selected" hidden="hidden">
              Choose Barangay
              </option>
              <option key={item.name} value={item.name}>{item.name}</option>
          </>
          ))}
      </select> 
      </form>
      <br/>

      <div ref={chartDiv}></div>
    </div>
  );
}

export default AgeChart;
