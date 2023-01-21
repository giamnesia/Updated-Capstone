import React, {useState, useEffect} from 'react'
import {Link,useParams} from 'react-router-dom'
import ModalPatient from './ModalPatient'
import ModalDelete from './ModalDelete'
import { Icon } from '@chakra-ui/react'
import ConsultForm from '../../../components/consultForm'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
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
      {/* {
        display ?(
          <div class='bg-gray-200'>
           {display&& display.fname} {display&& display.mname} {display&& display.lname}

            <p> {display&& display.gender}</p>
            <p> {display&& display.age}</p>
            <p> {display&& display.address}</p>
            <p> {display&& display.contact}</p>


            

      
                      
            </div>
         
        ):(
            <p>No Patient</p>
        )

      } */}



      </div>
      <h3 class="text-2xl text-gray-700 font-bold pt-6 ml-3">Patient Details</h3>
      <div class='flex flex-row items-start justify-start m-3'>
               <ModalPatient item={display }/>  
                <ConsultForm item={display}/>
                <ModalDelete item={display}/>

      </div>
           

              <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr >
        
  

              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Name</Td>
                <Td>{display&& display.fname} {display&& display.mname} {display&& display.lname}</Td>
         
              </Tr>
              <Tr>
                <Td>Gender</Td>
                <Td>{display&&display.gender}</Td>
       
              </Tr>
              <Tr>
                <Td>Birth Date</Td>
                <Td>{display&&display.birthDate}</Td>
              </Tr>
              <Tr>
                <Td>Age</Td>
                <Td>{display&&display.age}</Td>
              </Tr>
              <Tr>
                <Td>Address</Td>
                <Td>{display&&display.address}</Td>
              </Tr>
              <Tr>
                <Td>Contact</Td>
                <Td>{display&&display.contact}</Td>
              </Tr>
            </Tbody>
  

          </Table>
        </TableContainer>

          <br/>
            <h3 class="text-2xl text-gray-700 font-bold mb-6 ml-3">Consultation</h3>
    
            <TableContainer>
              <Table variant='simple' >
                <TableCaption>Consultation History</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Date</Th>

                    <Th>Purpose of Visit</Th>
                    <Th>Diagnosis</Th>

                    <Th>Treatment</Th>
                    <Th>Blood Pressure</Th>
                    <Th >Blood Sugar</Th>

                    <Th >Height</Th>
                    <Th >Weight</Th>
                    <Th >Comment</Th>

                    <Th >Assisted By</Th>


                  </Tr>
                </Thead>
                <Tbody >
                    {
                          consult && consult.map(item=>(
                            <Tr>
                             <Td>{item.createdAt.split("T")[0]}</Td> 
                            <Td>{item.purpose}</Td>
                            <Td>{item.diagnosis?item.diagnosis:'None'}</Td>

                            <Td>{item.treatment?item.treatment:'None'}</Td>
                            <Td>{item.bp?item.bp:'0'} mmHg</Td>
                            <Td>{item.bloodsugar?item.bloodsugar:'0'} mg/dL </Td>

                            <Td isNumeric>{item.height?item.height:'0'} cm</Td>

                            <Td isNumeric>{item.weight?item.weight:'0'} kg</Td>
                            <Td >{item.remarks?item.remarks:'None'}</Td>

                            <Td>{item.attendingDoc}</Td>

                            </Tr>
                            
                          ))
                    }
          
                  
                </Tbody>
              
              </Table>
            </TableContainer>
         

    </div>
  )
}

export default PatientView