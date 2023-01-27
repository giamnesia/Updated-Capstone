import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { UsePatientContext } from '../../../hooks/usePatientContext'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton, Button,
 useDisclosure
} from '@chakra-ui/react'
import {AiFillDelete} from 'react-icons/ai'
const ModalDelete = ({item}) => {
    const cancelRef = React.useRef()

    const navigate= useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {dispatch,patient} = UsePatientContext()

    const handleDelete = async (e) =>{
        e.preventDefault()

        const response = await fetch(`/portal/health/${item._id}` , {
          method: "DELETE"
        });
    
        const json = await response.json();
    
        try {
          if (response.ok) {
            dispatch({type:'DELETE_PATIENT', payload: json})
            navigate('/patientRecord')

          }
        } catch (err) {
          console.log(err.message);
        }
}
  return (
    <div>
      
         <IconButton
          margin={1}
          
              colorScheme='red'
              aria-label='Delete'
              icon={<AiFillDelete/>}
              onClick={onOpen}
            />
    
      <AlertDialog
        isOpen={isOpen}
      
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete 
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

    </div>
  )
}

export default ModalDelete