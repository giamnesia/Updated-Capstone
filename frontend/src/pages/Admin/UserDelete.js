import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { UsePatientContext } from '../../hooks/usePatientContext'
import { toast } from 'react-toastify'

import "react-toastify/dist/ReactToastify.css";
import {
  IconButton, Button,
 useDisclosure,
 Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel
} from '@chakra-ui/react'
import {AiFillDelete} from 'react-icons/ai'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { BsFillLockFill } from "react-icons/bs";
const UserDelete = ({item}) => {

    const togglePass = () => {
      setShow(!show);
    };
    const navigate= useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {dispatch,patient} = UsePatientContext()
    const [password,setPassword] = useState();

    const [show, setShow] = useState(false);
    const handleDelete = async (e) =>{
        e.preventDefault()
        if (!password){
          toast.error("Please input your password",{
            position: "bottom-right",
            autoClose: 5000,
          });
          return;
        }

        if(password==='rhuadmin123'){
          const response = await fetch(`/portal/user/${item._id}` , {
            method: "DELETE"
          });
      
          const json = await response.json();
      
          try {
            if (response.ok) {
              dispatch({type:'DELETE_PATIENT', payload: json})
              navigate('/addUser')
            
            }
          } catch (err) {
            console.log(err.message);
          }
        }
        else{
          toast.error("Wrong password",{
            position: "bottom-right",
            autoClose: 5000,
          });
          return;
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
    
  
              <Modal

        isOpen={isOpen}
        onClose={onClose}
        >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
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
                    <Button colorScheme='red' onClick={handleDelete} mr={3}>
                      Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

    </div>
  )
}

export default UserDelete