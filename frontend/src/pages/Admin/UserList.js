import React from 'react'
import { Suspense, useState, useEffect } from 'react'
import {Link }from 'react-router-dom'
import axios from 'axios'
import { UsePatientContext } from '../../hooks/usePatientContext'
import {AiOutlineEye} from 'react-icons/ai'
import { Helmet } from 'react-helmet'
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
import Age from '../../pages/Doctor/Table/Age'
const AddUser = React.lazy(() => import('./AddUser'));
const UserList = () => {
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
        const response = await fetch("/portal/user/getUser");
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

          const response = await fetch(`/portal/health/${id}` , {
            method: "DELETE"
          });
      
          const json = await response.json();
      
         

          if (response.ok) {
            dispatch({type:'DELETE_PATIENT', payload: json})
          }
  }

  


    const handleUpdate= async (e) => {
      e.preventDefault();
      const patient = { fname, mname, lname, gender, age, address, contact };
  
      const response = await fetch(`/portal/health/${id}`, {
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
      <Helmet>
      <title>RHU Calauag | Patient Info</title>
        <meta name="description" content="Patient Info" />
      </Helmet>
       
       <div class="sm:px-6 w-full">

            <div class="px-4 md:px-10 py-4 md:py-7">
                <div class="flex items-center justify-between">
                    <p tabindex="0" class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Manage Users</p>
                   
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
                    <Suspense fallback={<div class='text-center'>Loading...</div>}>
                    <AddUser/>
                    </Suspense>
                </div>
                <div class="mt-7 overflow-x-auto">
                    <table class="w-full whitespace-nowrap text-sm">
                    <thead >
                    <tr tabindex="0" class="focus:outline-none h-14 border border-gray-100 rounded">
                
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Birth Date</th>

                        <th>Age</th>
                        
                        <th>Specialization</th>
                        <th>Action</th>
                        
                    </tr>
                    </thead>
                        <tbody>

                        {item.map(item => 
                            <tr tabindex="0" class="focus:outline-none h-14 border text-center border-gray-100 rounded">
                    
                        <td>{item.firstName}</td>
                        <td>{item.middleName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.gender}</td>
                        <td>{item.birthDate? item.birthDate.split("T")[0]:''}</td>
                        <td><Age birthdate={item.birthDate}/></td>
                        <td>{item.specialization}</td>
                        <td>
                           

                        <td class='items-center flex flex-col justify-center'>
                            <Link to={`/user/${item._id}`}>View</Link>
                        </td>
                      
                    
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


export default UserList;