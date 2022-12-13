import { useState } from "react"
import React from 'react';
import{ UseConsultContext } from "../hooks/useConsultContext"
import { Link } from 'react-router-dom'
import RHUServices from "../data/rhuServices"
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
    IconButton,
    useDisclosure,
    Input,
    FormControl,
    FormLabel
  } from '@chakra-ui/react'
  import {IoAddOutline} from 'react-icons/io5'
const ConsultForm = ({item}) => {
        const {dispatch} = UseConsultContext()

        const { isOpen, onOpen, onClose } = useDisclosure()
        // const {user} = UseAuthContext()

        const [purpose, setPurpose] = useState('')
        const [patientID, setPatientID] = useState()
        // const [description, setDescription] = useState('')
        const [treatment, setTreatment] = useState('')
        const [bp, setBp] = useState('')
        const [weight, setWeight] = useState('')
        const [height, setHeight] = useState('')
        const [bloodsugar, setBloodsugar] = useState('')
        const [attendingDoc, setAttendingDoc] = useState('')
        
        const [error, setError] = useState(null)
        // const [emptyFields, setEmptyFields] = useState([])

        const handlePurpose =(e)=>{
            setPurpose(e.target.value)
            setPatientID(item&&item._id)
       }


        const handleSubmit = async (e) => {
            e.preventDefault()

            
            const consultinfo = {purpose, treatment, bp, weight, height, bloodsugar, attendingDoc,patientID }

            const response = await fetch('/portal/consult', {
                method: 'POST',
                body: JSON.stringify(consultinfo),
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (!response.ok) {
                setError(json.error)
                // setEmptyFields(json.emptyFields)
            }
            
            if (response.ok) {
                setError(null)
                // setEmptyFields([])
                setPurpose('')
                // setDiagnosis('')
                // setDescription('')
                setTreatment('')
                setBp('')
                setWeight('')
                setHeight('')
                setBloodsugar('')
                setAttendingDoc('')
         
           
            }
        }

        return (

            <>
               <IconButton
              margin={1}
           
              colorScheme='purple'
              aria-label='Add'
              icon={<IoAddOutline/>}
              onClick={onOpen}
            />
         
                      <Modal
                   
                      isOpen={isOpen}
                      onClose={onClose}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Add Consultation</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                        <FormControl mt={4}>
                            <FormLabel>Purpose of Visit</FormLabel>
                            <select
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 "
                            value={purpose}
                            onChange={handlePurpose}
                           
                            >
                        
                            {RHUServices.map((item) => (
                            <>
                                <option value="" selected="selected" hidden="hidden">
                                Choose here
                                </option>
                                <option key={item.name} value={item.name}>{item.name}</option>
                            </>
                            ))}
                        </select> 

                        
                          </FormControl>
                          <FormControl>
                            <FormLabel>Treatment</FormLabel>
                            <Input  focusBorderColor='orange.400'   onChange={(e) => setTreatment(e.target.value)}
                          value={treatment} />
                          </FormControl>
                          <FormControl mt={4}>
                            <FormLabel>Blood Pressure</FormLabel>
                            <Input 
                                placeholder='mm Hg'
                              focusBorderColor='orange.400'    onChange={(e) => setBp(e.target.value)}
                          value={bp} />
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>Blood Sugar</FormLabel>
                            <Input  focusBorderColor='orange.400'
                                placeholder='mg/dL'

                                onChange={(e) => setBloodsugar(e.target.value)}
                                value={bloodsugar}/>
                          </FormControl>
                         
                          <FormControl mt={4}>
                            <FormLabel>Weight</FormLabel>
                            <Input 
                                placeholder='kg'
                            focusBorderColor='orange.400' onChange={(e)=>setWeight(e.target.value)} value={weight} />
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>Height</FormLabel>
                            <Input  
                                placeholder='cm'
                             focusBorderColor='orange.400' onChange={(e)=>setHeight(e.target.value)} value={height} />
                          </FormControl>
                          <FormControl mt={4}>
                          <FormLabel>Attending Physician:</FormLabel>

                        <select
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        value={attendingDoc} onChange ={(e)=>setAttendingDoc(e.target.value)}>
                        <option value="" selected="selected" hidden="hidden">
                        Choose here
                        </option>
                        <option value = "Dra. Katherine Pulgar-Ruby" selected> Dra. Katherine Pulgar-Ruby </option>
                        {/* className = {emptyFields.includes('attendingDoc') ? 'error': ''} */}
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

export default ConsultForm