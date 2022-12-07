import React from 'react'
import { useState } from "react"
import { UsePatientContext } from "../hooks/usePatientContext"
import barangays from '../data/barangay'
// import { UseAuthContext } from "../hooks/useAuthContext"
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
import {IoPersonAddOutline} from 'react-icons/io5'
const PatientForm = () => {
        const {dispatch} = UsePatientContext()
        // const {user} = UseAuthContext()
       const { isOpen, onOpen, onClose } = useDisclosure()


        const [fname, setFname] = useState('')
        const [mname, setMname] = useState('')
        const [lname, setLname] = useState('')
        const [gender, setGender] = useState('')
        const [age, setAge] = useState('')
        const [address, setAddress] = useState('')
        const [contact, setContact] = useState('')
        const [error, setError] = useState(null)
        const [emptyFields, setEmptyFields] = useState([])

        const handleAddress =(e)=>{
             setAddress(e.target.value)
        }

        const handleSubmit = async (e) => {
            e.preventDefault()

            // if (!user) {
            //     setError('You must be logged in')
            //     return
            // }

            const patientinfo = {fname, mname, lname, gender, age, address, contact}

            const response = await fetch('/portal/health', {
                method: 'POST',
                body: JSON.stringify(patientinfo),
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (!response.ok) {
                setError(json.error)
                setEmptyFields(json.emptyFields)
            }
            if (response.ok) {
                setError(null)
                setEmptyFields([])
                setFname('')
                setMname('')
                setLname('')
                setGender('')
                setAge('')
                setAddress('')
                setContact('')
            
                dispatch({type: 'CREATE_PATIENT', payload: json})
        
            }
        }
        const handleFname =(e)=>{
          const { value } = e.target;
      
          const re = /^[A-Za-z]+$/;
          if (value === "" || re.test(value)) {
          setFname(e.target.value.toUpperCase() ) 
            
          }
        }
        const handleMname =(e)=>{
          const { value } = e.target;
      
          const re = /^[A-Za-z]+$/;
          if (value === "" || re.test(value)) {
          setMname(e.target.value.toUpperCase() ) 
            
          }
        }
        const handleLname =(e)=>{
          const { value } = e.target;
      
          const re = /^[A-Za-z]+$/;
          if (value === "" || re.test(value)) {
          setLname(e.target.value.toUpperCase() ) 
            
          }
      
        }
        return (
          <>
              <Button leftIcon={<IoPersonAddOutline/>}  onClick={onOpen}>Add Patient</Button>
                      <Modal
                   
                      isOpen={isOpen}
                      onClose={onClose}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Add Patient</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                          <form className="create" onSubmit={handleSubmit}>
                        <label class='my-2'>First Name: </label>
                        <input 
                            type="text"
                            onChange={handleFname}
                            value={fname}
                            className = {emptyFields.includes('fname') ? 'error': ''}
                            class='p-2 outline-amber-500'

                        />

                        <label class='my-2'>Middle Name: </label>
                        <input 
                            type="text"
                            onChange={handleMname}
                            value={mname}
                            className = {emptyFields.includes('mname') ? 'error': ''}
                            class='p-2 outline-amber-500'

                        />

                        <label class='my-2'>Last Name: </label>
                        <input 
                            type="text"
                            onChange={handleLname}
                            value={lname}
                            className = {emptyFields.includes('lname') ? 'error': ''}
                            class='p-2 outline-amber-500'

                        />
                        <label class='my-2'> Gender: </label>
                        <select  class='p-2 outline-amber-500 w-full border border-gray-300 rounded' value={gender} onChange ={(e)=>setGender(e.target.value)}>
                            <option value="" selected="selected" hidden="hidden">
                              Choose here
                            </option>
                            <option value = "Female" selected> Female </option>
                            <option value = "Male" selected> Male </option>
                        </select>

                        <label class='my-2'>Age: </label>
                        <input 
                            type="number"
                            onChange={(e) => setAge(e.target.value)}
                            value={age}
                          

                            className = {emptyFields.includes('age') ? 'error': ''}
                            class='p-2 outline-amber-500'

                        />

                        <label class='my-2'>Address: </label>
                        <select
                        value={address}
                        onChange={handleAddress}
                        className = {emptyFields.includes('address') ? 'error': ''}
                        class='p-2 outline-amber-500 w-full border border-gray-300 rounded' 
                        
                      >
                        {barangays.map((item) => (  
                          <>
                            <option value="" selected="selected" hidden="hidden">
                              Choose here
                            </option>
                            <option key={item.name} value={item.name}>{item.name}</option>
                          </>
                        ))}
                      </select > 

                        <label class='my-2'>Contact Number: </label>
                        <input 
                         
                            maxLength="11"
                            minLength="11"
                            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                            onChange={(e) => setContact(e.target.value)}
                            value={contact}
                            className = {emptyFields.includes('contact') ? 'error': ''}
                            class='p-2 outline-amber-500'

                        />

                        <button  class='mt-2'>Submit</button>
                        {error && <div className="error">{error}</div>}

                        </form>
                        </ModalBody>

                        
                      </ModalContent>
                    </Modal>
       
          </>
         
        )
}

export default PatientForm