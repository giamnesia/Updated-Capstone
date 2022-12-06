import React from 'react'
import { useState, useEffect } from 'react'
import {Link }from 'react-router-dom'
import axios from 'axios'
import { UsePatientContext } from '../../../hooks/usePatientContext'
import PatientView from './PatientView'
import PatientForm from '../../../components/patientForm'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  FormControl,
  FormLabel
} from '@chakra-ui/react'


const PatientRecord = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
    const [item, setItem] = useState([]);
    const {dispatch,patient} = UsePatientContext()
    
    // FOR UPDATE AND DELETE 
    const [id ,setId] = useState("");

    const [fname, setFname] = useState();
    const [mname, setMname] = useState();
    const [lname, setLname] = useState();
    const [age, setAge] = useState();
    const [gender, setGender] = useState();
    const [address, setAddress] = useState();
    const [contact, setContact] = useState();
 

  
    useEffect(() => {
      const fetchPatient = async () => {
        const response = await fetch("http://localhost:3000/portal/health/get");
        const json = await response.json();
  
        try {
          if (response.ok) {
            setItem(json);
            dispatch ({type: 'SET_PATIENT', payload: json})
          }
        } catch (err) {
          console.log(err.message);
        }
      };
      fetchPatient();
    }, [patient]);

    // DELETE FUNCTION
    const handleDelete = async () =>{

          const response = await fetch(`http://localhost:3000/portal/health/${id}` , {
            method: "DELETE"
          });
      
          const json = await response.json();
      
         

          if (response.ok) {
            dispatch({type:'DELETE_PATIENT', payload: json})
          }
  }

  

//   const handleSubmit = () => {
//     const url = "http://localhost:3000/portal/health";
//     const Credentials = {fname, mname, lname, gender, age, address, contact};
//         axios.post(url, Credentials)
//         .then(response => {
//           const result = response.data;
//           if (result.ok) {
//             console.log(result)
//           }
//           else {
//               console.log("error")
//           }
//       })
//       .catch(err => {
//           console.log(err)
//       })
// }


  //EDIT FUNCTION 
  // NEXT NA GAGAWIN AY EDIT MODAL 

    const handleUpdate= async (e) => {
      e.preventDefault();
      const patient = { fname, mname, lname, gender, age, address, contact };
  
      const response = await fetch(`http://localhost:3000/portal/health/${id}`, {
        method: "PATCH",
        body: JSON.stringify(patient),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (!response.ok) {
        console.log(json.error);
      }
      if (response.ok) {
       console.log(json)
       window.location.reload()
      }
  }
  


  return (
    <div className='tbl-patient ml-20'>
       
       <div class="sm:px-6 w-full">

            <div class="px-4 md:px-10 py-4 md:py-7">
                <div class="flex items-center justify-between">
                    <p tabindex="0" class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Patient Information</p>
                    <div class="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                        <p>Sort By:</p>
                        <select aria-label="select" class="focus:text-indigo-600 focus:outline-none bg-transparent ml-1">
                            <option class="text-sm text-indigo-800">Latest</option>
                            <option class="text-sm text-indigo-800">Oldest</option>
                            <option class="text-sm text-indigo-800">Latest</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                <div class="sm:flex items-center justify-between">
                    <div class="flex items-center">
                        <a class="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800" href=" javascript:void(0)">
                            <div class="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                                <p>All</p>
                            </div>
                        </a>
                      
                    </div>
                    <PatientForm/>
                </div>
                <div class="mt-7 overflow-x-auto">
                    <table class="w-full whitespace-nowrap">
                    <thead >
                    <tr tabindex="0" class="focus:outline-none h-16 border border-gray-100 rounded">
                
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Contact</th>
                        <th>Action</th>
                        
                    </tr>
                    </thead>
                        <tbody>

                        {item.map(item => 
                            <tr tabindex="0" class="focus:outline-none h-16 border text-center border-gray-100 rounded">
                    
                        <td>{item.fname}</td>
                        <td>{item.mname}</td>
                        <td>{item.lname}</td>
                        <td>{item.gender}</td>
                        <td>{item.age}</td>
                        <td>{item.address}</td>
                        <td>{item.contact}</td>
                        <td>

                        
                          <button class="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-white py-3 px-5 bg-amber-500 rounded hover:bg-amber-400 focus:outline-none" >   <Link to={`/${item._id}`}>View</Link></button> 
                      
                    
                        </td>

        
                    </tr>

                  
                    )}
                  
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
   
    </div>
    
  )
}


export default PatientRecord;