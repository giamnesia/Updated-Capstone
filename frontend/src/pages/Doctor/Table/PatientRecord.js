import React from 'react'
import { useState, useEffect } from 'react'
import {Link }from 'react-router-dom'
import axios from 'axios'
import { UsePatientContext } from '../../../hooks/usePatientContext'
import {AiOutlineEye} from 'react-icons/ai'
import PatientForm from '../../../components/patientForm'
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
import Age from './Age'
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify'

import "react-toastify/dist/ReactToastify.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { BsFillLockFill } from "react-icons/bs";

const PatientRecord = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
    const [item, setItem] = useState([]);
    const {dispatch,patient} = UsePatientContext()
    const [totalPages, setTotalPages] = useState(0);
    const [results, setResults] = useState([]);
    const [password,setPassword] = useState();



 
    const [currentPage, setCurrentPage] = useState(0);
    const [page, setPage] = useState(0);
    const [show, setShow] = useState(false);
    const pages= new Array (totalPages).fill(null).map((v,i)=>i)
    const togglePass = () => {
      setShow(!show);
    };
    const exportToExcel = () => {
      if (!password){
        toast.error("Please input your password",{
          position: "bottom-right",
          autoClose: 5000,
        });
        return;
      }
      if (password==='giaadmin123'){
        axios.get('http://localhost:3000/portal/health/get')
        .then(response => {
          const data = response.data.patient;
          const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(new Blob([XLSX.write(wb, { type: 'array' })], { type: 'application/octet-stream' }));
        const dateToday= new Date().toLocaleDateString()
        link.download = `${dateToday}.xlsx`;
        link.click();
        toast.success("File downloaded successfully",{
          position: "bottom-right",
          autoClose: 5000,
        });
        onClose()
        setPassword('')
        })
        .catch(error => {
          console.log(error)
        });
      }
      else{
        toast.error("Wrong Password",{
          position: "bottom-right",
          autoClose: 5000,
        });
        return;
      }
  
    }

   

 
    useEffect(() => {
      const fetchPatient = async () => {
        const response = await fetch(`http://localhost:3000/portal/health/get?page=${currentPage}`);
        const json = await response.json();
  
        try {
          if (response.ok) {
            setItem(json.results);
            setTotalPages(json.totalPages);

            dispatch ({type: 'SET_PATIENT', payload: json})
          }
        } catch (err) {
          console.log(err.message);
        }
      };
      fetchPatient();
    }, [currentPage]);

    // DELETE FUNCTION

  



  


  return (
    <div className='tbl-patient ml-20'>
      <Helmet>
      <title>RHU Calauag | Patient Info</title>
        <meta name="description" content="Patient Info" />
      </Helmet>
       
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
                <div class='flex flex-row items-center justify-center mb-10'>
                {
                  pages.map(item=>(
                    <button class='p-3  bg-amber-500 text-white ' onClick={()=>setCurrentPage(item)}>{item+1}</button>
                  ))
                }
                
                </div>
                <div><p>Showing {currentPage+1} out of {totalPages} pages</p></div>
                <Button class='float-right' onClick={onOpen}>Export to Excel (.xlsx) file</Button>
                                          
                    <Modal

              isOpen={isOpen}
              onClose={onClose}
              >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Export data to Excel</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  

                  <FormControl mt={4}>
                    <FormLabel>Type Admin Password</FormLabel>
                  
                        
                    <div class="relative">
                      <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <BsFillLockFill class="text-gray-400" />
                      </div>
                      <input
                        
                        onChange={(e) =>setPassword(e.target.value)} value={password}
                        type={show ? "text" : "password"}
                        class=" border border-gray-400 text-gray-900 text-sm rounded-lg outline-none  focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 p-2.5"
                        placeholder="New Password"
                      />
                      <div class="flex absolute inset-y-0  right-0 text-gray-500 items-center px-3 cursor-pointer">
                        {show ? (
                          <AiFillEye class="w-5 h-5" onClick={togglePass} />
                        ) : (
                          <AiFillEyeInvisible class="w-5 h-5" onClick={togglePass} />
                        )}
                      </div>
                    </div>
                  </FormControl>
                </ModalBody>
                   <ModalFooter>
                          <Button colorScheme='orange' onClick={exportToExcel} mr={3}>
                            Save
                          </Button>
                          <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
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
                        <th>Address</th>
                        <th>Contact</th>
                        <th>Action</th>
                        
                    </tr>
                    </thead>
                        <tbody>

                        {item.map(item => 
                            <tr tabindex="0" class="focus:outline-none h-14 border text-center border-gray-100 rounded">
                    
                        <td>{item.fname}</td>
                        <td>{item.mname}</td>
                        <td>{item.lname}</td>
                        <td>{item.gender}</td>
                        <td>{item.birthDate? item.birthDate.split("T")[0]:''}</td>
                        <td><Age birthdate={item.birthDate}/></td>
                        <td>{item.address}</td>
                        <td>{item.contact}</td>
                        <td>

                        <td class='items-center flex flex-col justify-center'>
                        <Link to={`/${item._id}`}> <AiOutlineEye class='w-16 h-5 text-amber-800'/> </Link>

                        </td>
                      
                    
                        </td>

        
                    </tr>

                  
                    )}
                  
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
       
        <div>
  
    </div>
    </div>
    
  )
}


export default PatientRecord;