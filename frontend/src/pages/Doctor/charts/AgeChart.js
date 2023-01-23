import React,{useEffect,useRef, useState} from 'react';
import { Link } from 'react-router-dom';
// import * as MdIcons from 'react-icons/md';
import { Helmet } from 'react-helmet';
import EmbedSDK from '@mongodb-js/charts-embed-dom/';
import barangays from '../../../data/barangay';

function AgeChart() {
  const chartDiv= useRef(null)
   const [rendered, setRendered] = useState(false)
   const [gender, setGender] = useState()
   const [purpose, setPurpose] = useState()
   const [barangay, setBarangay] = useState()



   
  const sdk = new EmbedSDK ({
    baseUrl:"https://charts.mongodb.com/charts-capstone-rdggn",
  })

  const chart= sdk.createChart({
    
    chartId: "636f9e9e-02c9-4000-80d9-f6da73e7c7ea",
    height:640,
    weight:500
  })

 

  useEffect(() => {
    chart.render(chartDiv.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
  }, [chart]);


   const handleDate=(e)=>{
     const date= new Date(e.target.value)
     chart.setFilter({createdAt:{$gte:date}}, {gender:{$gte:gender}})
  
   }
   const handleGender=(e)=>{
    setGender(e.target.value)
    chart.setFilter({gender:{$gte:gender}})

 
  }
  const handleBarangay=(e)=>{
    
    
    chart.setFilter({ $and: [ { address: { $gte: e.target.value } }, {gender: { $gte: gender} } ] })
 
  }
 

  return (

  <div class='ml-20'>
     <Helmet>
        <title>RHU Calauag | Charts</title>
        <meta name="description" content="Charts" />
        </Helmet>
        <input type='date' onChange={handleDate}/>
        <select value={gender} onChange={handleGender}>
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




    </div>
  )
}

export default AgeChart