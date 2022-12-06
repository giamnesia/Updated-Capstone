import React, {useState, useEffect} from 'react'
import {Link,useParams} from 'react-router-dom'
import ModalPatient from './ModalPatient'
import ModalDelete from './ModalDelete'
import { Icon } from '@chakra-ui/react'
import {BiEdit} from 'react-icons/bi'
import ConsultForm from '../../../components/consultForm'
const PatientView = () => {

    const { id } = useParams();

    const [display, setDisplay] = useState();
    const [consult, setConsult] = useState();


    useEffect(() => {
      const fetchPatient = async () => {
      
        const response = await fetch(`http://localhost:3000/portal/health/agg/${id}`);
        response.json().then((data) => {
          if (response.ok) {
            setDisplay(data.patientFind);
            setConsult(data.patient);
         
          }
          if (!response.ok) {
            throw Error("Error");
          }
        });
      };
      fetchPatient();
    }, [display,consult]);
  return (
    <div class='ml-20'>

      <div >
      {
        display ?(
          <div class='bg-gray-200'>
           {display&& display.fname} {display&& display.mname} {display&& display.lname}

            <p> {display&& display.gender}</p>
            <p> {display&& display.age}</p>
            <p> {display&& display.address}</p>
            <p> {display&& display.contact}</p>

            <ModalPatient item={display}/>
            <ModalDelete item={display}/>

            

      
                      
            </div>
         
        ):(
            <p>No Patient</p>
        )

      }



        <ConsultForm item={display}/>
      </div>

      

    <p>Consultation History</p>
    {
      consult? (
       
         consult && consult.map(item=>(
     
             <div class="">
        <article class="p-10  mb-6 bg-white rounded-lg border-t-4    shadow-md ">
          <div class="flex justify-between  items-center mb-5 text-gray-500">
            <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
              {/* <HiSpeakerphone class="text-gray-500 mx-1" /> */}
              Consultation | {item.createdAt.split("T")[0]}
            </span>
            <span class="text-sm"></span>
          
          </div>
          <div class="flex flex-col" id="divToDownload">
            <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              {item.purpose}
            </h2>
            <p>Treatment: {item.treatment}</p>
          <p>Blood Pressure: {item.bp} mm Hg</p>
          <p>Weight: {item.weight} kg</p>
          <p>Height: {item.height} cm</p>
          <p>Blood Sugar: {item.bloodsugar?item.bloodsugar:'none'} mg/dL </p>
          <p>Attending Doctor: {item.attendingDoc}</p>
          </div>

   
            </article>
           
          </div>

    

  
       
        ))
      
      ):(
        
        <p>No consultation</p>
      )
   
    }

  
    
    </div>
  )
}

export default PatientView