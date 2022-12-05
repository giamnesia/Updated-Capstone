import React from 'react'
import { useState, useEffect } from 'react'

import { UsePatientContext } from '../../../hooks/usePatientContext'

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
const ModalDelete = ({item}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const {dispatch,patient} = UsePatientContext()

    const handleDelete = async (e) =>{
        e.preventDefault()

        const response = await fetch(`http://localhost:3000/portal/health/${item._id}` , {
          method: "DELETE"
        });
    
        const json = await response.json();
    
        try {
          if (response.ok) {
            dispatch({type:'DELETE_PATIENT', payload: json})
            console.log('success')
          }
        } catch (err) {
          console.log(err.message);
        }
}
  return (
    <div>
        <Button onClick={onOpen}>Delete</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
         
            </ModalBody>

            <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={handleDelete} >
                Delete
            </Button>
            <Button  onClick={onClose} >Secondary Action</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>

    </div>
  )
}

export default ModalDelete