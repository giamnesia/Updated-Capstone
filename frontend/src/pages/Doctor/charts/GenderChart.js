import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// import * as MdIcons from 'react-icons/md';
import { Helmet } from "react-helmet";
import EmbedSDK from "@mongodb-js/charts-embed-dom/";
import barangays from "../../../data/barangay";

function AgeChart() {
  const chartDiv = useRef(null);
  const [rendered, setRendered] = useState(false);
  const [date, setDate] = useState();
  const [purpose, setPurpose] = useState();
  const [barangay, setBarangay] = useState();

  const sdk = new EmbedSDK({
    baseUrl: "https://charts.mongodb.com/charts-capstone-rdggn",
  });

  const chart = sdk.createChart({
    chartId: "63d2872b-56fd-4336-8ef8-e1a8ed305302",
    height: 640,
    weight: 500,
  });

  useEffect(() => {
    chart
      .render(chartDiv.current)
      .then(() => setRendered(true))
      .catch((err) => console.log("Error during Charts rendering.", err));
  }, [chart]);


  const handleBarangay = (e) => {
    chart.setFilter({ address: { $eq: e.target.value } });
  };

  return (
    <div>
      <Helmet>
        <title>RHU Calauag | Charts</title>
        <meta name="description" content="Charts" />
      </Helmet>
     

      <br />
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

      <div ref={chartDiv}></div>
    </div>
  );
}

export default AgeChart;
