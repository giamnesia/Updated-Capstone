import React from 'react'
import { useState, useEffect } from 'react'
import {Link }from 'react-router-dom'
import axios from 'axios'
import { UsePatientContext } from '../../../hooks/usePatientContext'
import PatientView from './PatientView'
// import barangays from '../../../data/barangay';
// import Modal from 'react-modal';
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
          }
        } catch (err) {
          console.log(err.message);
        }
      };
      fetchPatient();
    }, [id]);

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
        <table className='tablePatient'>
            <thead className='thead'>
            <tr>
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
                <tr key={item.id}>
                    <td>{item.fname}</td>
                    <td>{item.mname}</td>
                    <td>{item.lname}</td>
                    <td>{item.gender}</td>
                    <td>{item.age}</td>
                    <td>{item.address}</td>
                    <td>{item.contact}</td>
                    <td>

                        {/* <Button size='sm' variant='primary' onClick={() => {handleViewShow(SetRowData(item))}}>View</Button>|
                        <Button size='sm' variant='warning' onClick={()=> {handleEditShow(SetRowData(item),setId(item._id))}}>Edit</Button>|
                        <Button size='sm' variant='danger' onClick={() => {handleViewShow(SetRowData(item),setId(item._id), setDelete(true))}}>Delete</Button>|
                       */}
                     
                      <button >   <Link to={`/${item._id}`}>View</Link></button> 
                   
                      {/* <button onClick={handleDelete(setId(item._id))}>Delete</button> */}
                
                    </td>

    
                </tr>

               
                )}
            </tbody>
        </table>


        
    </div>
    
  )
}


export default PatientRecord;