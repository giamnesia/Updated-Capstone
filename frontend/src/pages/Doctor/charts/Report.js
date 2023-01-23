import React,{useEffect,useRef, useState} from 'react';
import { Link } from 'react-router-dom';
// import * as MdIcons from 'react-icons/md';
import { Helmet } from 'react-helmet';
import EmbedSDK from '@mongodb-js/charts-embed-dom/';
import barangays from '../../../data/barangay';
import AgeChart from './AgeChart';
function Report() {
  const chartDiv= useRef(null)
   const [rendered, setRendered] = useState(false)
   const [gender, setGender] = useState()
   const [purpose, setPurpose] = useState()
   const [barangay, setBarangay] = useState()
   const [date, setDate] = useState()

   



   
  const sdk = new EmbedSDK ({
    baseUrl:"https://charts.mongodb.com/charts-capstone-rdggn",
  })

  const chart= sdk.createChart({
    
    chartId: "63c2d09e-23d1-400e-85af-81a842d5e59e",
    height:640,
    weight:500
  })

 

  useEffect(() => {
    chart.render(chartDiv.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
  }, [chart]);


   const handleDate=(e)=>{
    
     chart.setFilter({createdAt:{$gte:date}},{gender:{$gte:e.target.value}})
  
   }
   const handleGender=(e)=>{


    chart.setFilter({gender:{$gte:e.target.value}})
    
 
  }
  const handleBarangay=(e)=>{
    
    // setBarangay(e.target.value)
    // chart.setFilter({ $or: [ { address: { $gte: e.target.value } },  { gender: {$gte: "$gender"}}  ] })
    
 
  }
 

  return (

  <div class='ml-20'>
     <Helmet>
        <title>RHU Calauag | Charts</title>
        <meta name="description" content="Charts" />
        </Helmet>
        <input type='date' onChange={handleDate}/>
        <select value={date} onChange={handleDate}>
        <option value="" selected="selected" hidden="hidden">
          Choose here
          </option>
          <option value='2022'>2022</option>
          <option value='2023'>2023</option>
        </select>
        <select value={gender} onChange={handleGender}>
        <option value="" selected="selected" hidden="hidden">
          Choose here
          </option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
        </select>

        <select
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 "
          value={barangay}
          onChange={handleBarangay}
          
          >
      
          {barangays.map((item) => (
          <>
              <option value="" selected="selected" hidden="hidden">
              Choose here
              </option>
              <option key={item.name} value={item.name}>{item.name}</option>
          </>
          ))}
      </select> 
        <div ref={chartDiv}></div>

     <AgeChart/>

    <button className='btn-report'> <Link to="/"> BACK TO DASHBOARD </Link> </button>
    {/* <MdIcons.MdArrowBack><Link to="/"> BACK </Link></MdIcons.MdArrowBack>  */}

      {/* pie chart - gender  */}
    <div className='donut-gender'>
      <iframe 
          title="donut-gender"
          style={{
            background: "#FFFFFF",
            border: "none",
            borderRadius: "2px",
            boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
            width: "100%",
            height: "400px", }}
          
            src="https://charts.mongodb.com/charts-capstone-rdggn/embed/charts?id=636f9a03-3d08-4f35-8a11-2618c96b5e1c&maxDataAge=10&theme=light&autoRefresh=true"></iframe>

  </div>

    {/* Chart for address */}
  <div className='chart-address'>
    <iframe 
        title='chartaddress'
        style=
         {{
          background: "#FFFFFF",
          border: "none",
          borderRadius:" 2px",
          boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
          width: "100%",
          height: "400px", }}

          src="https://charts.mongodb.com/charts-capstone-rdggn/embed/charts?id=636f9c40-bbc8-4d24-8f07-ebbe86ffb1c1&maxDataAge=10&theme=light&autoRefresh=true"></iframe>
  </div>

    {/* Chart for age */}
  <div className='chart-age'>
      <iframe 
        title='chartage'
        style={{
          background: "#FFFFFF",
          border: "none",
          borderRadius: "2px",
          boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
          width: "100%",
          height: "400px", }}

          src="https://charts.mongodb.com/charts-capstone-rdggn/embed/charts?id=636f9e9e-02c9-4000-80d9-f6da73e7c7ea&maxDataAge=10&theme=light&autoRefresh=true"></iframe>

  </div>


    {/* CHART - SERVICES */}
    <div className='chart-services'>
    <iframe 
    title='chartservices'
    style=
   {{ background: "#FFFFFF",
    border: "none",
    borderRadius: "2px",
    boxShadow:" 0 2px 10px 0 rgba(70, 76, 79, .2)",
    width: "100%",
    height: "400px",  }}

    src="https://charts.mongodb.com/charts-capstone-rdggn/embed/charts?id=637fb005-733c-47dd-837a-4e2520db6d40&maxDataAge=10&theme=light&autoRefresh=true"> </iframe>

    </div>






    </div>
  )
}

export default Report