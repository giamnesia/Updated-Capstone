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

      


            <h3 class="text-2xl text-gray-700 font-bold mb-6 ml-3">Consultation</h3>

        <ol >
          <li class="border-l-2 border-purple-600">
            <div class="md:flex flex-start">
             
              {
                 consult && consult.map(item=>(
     
              <div class="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-md ml-6 mb-10">
                
                <div class="flex justify-between mb-4">
                  <a href="#!" class="font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm">{item.purpose}</a>
                  <a href="#!" class="font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm"> {item.createdAt.split("T")[0]}</a>
                </div>
                <p class="text-gray-700 mb-6">

                      <p>Treatment: {item.treatment}</p>
               <p>Blood Pressure: {item.bp} mm Hg</p>
               <p>Weight: {item.weight} kg</p>
               <p>Height: {item.height} cm</p>
               <p>Blood Sugar: {item.bloodsugar?item.bloodsugar:'none'} mg/dL </p>
               <p>Attending Doctor: {item.attendingDoc}</p>
                </p>
              </div>
            
           
      
     
       
            
             ))
           
              }
           
            </div>
          </li>
         
         
        </ol>

   
  

  
    
    </div>
  )
}

export default PatientView