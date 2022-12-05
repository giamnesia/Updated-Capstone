import React from 'react'
import { useState } from "react"
import { UseDoctorContext } from "../hooks/useDoctorContext"
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
  import {BiEdit} from 'react-icons/bi'
const DoctorForm = () => {
        const {dispatch} = UseDoctorContext()
       // const {user} = UseAuthContext()

       const { isOpen, onOpen, onClose } = useDisclosure()
        const [fname, setFname] = useState('')
        const [mname, setMname] = useState('')
        const [lname, setLname] = useState('')
        const [gender, setGender] = useState('')
        const [age, setAge] = useState('')
        const [address, setAddress] = useState('')
        const [contact, setContact] = useState('')
        const [specialization, setSpecialization] = useState('')
        const [error, setError] = useState(null)
     
        const handleAddress =(e)=>{

             setAddress(e.target.value)
        }

        const handleSubmit = async (e) => {
            e.preventDefault()

        //     if (!user) {
        //         setError('You must be logged in')
        //         return
        //     }

            const doctorinfo = {fname, mname, lname, gender, age, address, contact, specialization}

            const response = await fetch('/portal/doctor', {
                method: 'POST',
                body: JSON.stringify(doctorinfo),
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (!response.ok) {
                setError(json.error)
           
            }
            if (response.ok) {
                setError(null)
            
                setFname('')
                setMname('')
                setLname('')
                setGender('')
                setAge('')
                setAddress('')
                setContact('')
                setSpecialization('')
          
            
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

            <Button leftIcon={<BiEdit />} onClick={onOpen}>Add Doctor</Button>
                      <Modal
                   
                      isOpen={isOpen}
                      onClose={onClose}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Add Doctor</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                          <FormControl  >
                            <FormLabel>First name</FormLabel>
                            <Input   focusBorderColor='orange.400' onChange={handleFname} value={fname}
                          
                            />
                          </FormControl>
                          <FormControl mt={4}>
                            <FormLabel>Middle name</FormLabel>
                            <Input  focusBorderColor='orange.400' onChange={handleMname} value={mname} 
                        
                            />
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>Last name</FormLabel>
                            <Input  focusBorderColor='orange.400'  onChange={handleLname} value={lname} 
                          
                            
                            />
                            <FormControl mt={4}>
                            <FormLabel>Specialization</FormLabel>
                            <Input  focusBorderColor='orange.400'       onChange={(e) => setSpecialization(e.target.value)}
                         value={specialization}
                       
                            />
                          </FormControl>

                          </FormControl>
                          <FormControl mt={4}>
                            <FormLabel>Gender</FormLabel>
                          <select
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 "
                            onChange={(e)=>setGender(e.target.value)} value={gender}

                          >
           
                            <option value="" selected="selected" hidden="hidden">
                              Choose here
                            </option>
                            <option value={gender}>Male</option>
                            <option value={gender}>Female</option>

                            </select>
                       
                        
                          </FormControl>
                          
                          <FormControl mt={4}>
                            <FormLabel>Age</FormLabel>
                            <Input  focusBorderColor='orange.400'  onChange={(e)=>setAge(e.target.value)} value={age}
                          
                             onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                            
                            />
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>Contact</FormLabel>
                            <Input  focusBorderColor='orange.400'  onChange={(e)=>setContact(e.target.value)} value={contact}
                             onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                             maxLength="11"
                             minLength="11"
                            
                            />
                          </FormControl>
                          <FormControl mt={4}>
                            <FormLabel>Address</FormLabel>
                      
                            <select
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 "
                            
                       
                            
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
                            
                          </FormControl>
                        </ModalBody>

                        <ModalFooter>
                          <Button colorScheme='orange' mr={3} onClick={handleSubmit}>
                            Save
                          </Button>
                          <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
            
            </>
        
        )
}

export default DoctorForm