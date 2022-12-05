import React, {useState, useEffect} from 'react'
import {Link,useParams} from 'react-router-dom'
import ModalPatient from './ModalPatient'
import ModalDelete from './ModalDelete'

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
    <div>

      <div class='flex flex-row items-center justify-center'>
      {
        display ?(
          <div class='flex flex-col items-start justify-start'>
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

        <div class='flex flex-col items-end justify-end'>

        <ConsultForm item={display}/>
        </div>
      </div>

      


    {
      consult && consult.map(item=>(
        <>
        <p class='text-3xl'>Purpose: {item.purpose}</p>
        <p>Treatment: {item.treatment}</p>
        <p>Bp: {item.bp}</p>
        <p>Weight: {item.weight}</p>
        <p>Height: {item.height}</p>
        <p>Blood Sugar: {item.treatment}</p>
        <p>Attending Doctor: {item.attendingDoc}</p>

        </>
     
      ))
    }

  
    
    </div>
  )
}

export default PatientView