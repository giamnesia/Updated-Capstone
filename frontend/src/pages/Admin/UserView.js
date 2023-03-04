import React, {useState, useEffect} from 'react'
import {Link,useParams} from 'react-router-dom'
import UserDelete from './UserDelete'
import UserUpdate from './UserUpdate'
import { Icon } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import Age from '../Doctor/Table/Age'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { BsFillLockFill } from "react-icons/bs";

import { useUserAuth } from '../../context/UserAuthContext'
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserView = () => {

    const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newPassword, setnewPassword] = useState();
  const [currentPass, setCurrentPass] = useState();

    const [display, setDisplay] = useState();
    const {user,deleteUser} =useUserAuth()
    const [show, setShow] = useState(false);
    const auth = getAuth();
    useEffect(() => {
      const fetchUser = async () => {
      
        const response = await fetch(`/portal/user/${id}`);
        response.json().then((data) => {
          if (response.ok) {
            setDisplay(data);
           
         
          }
          if (!response.ok) {
            throw Error("Error");
          }
        });
      };
      fetchUser();
    }, [display]);
    
  function checkPassword(password) {
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasUppercase && hasNumber;
  }

    const changePassword = async (e) => {
      e.preventDefault();
      if (!currentPass) {
        toast.error("Please input your old password", {
          position: "bottom-right",
          autoClose: 5000,
        });
        return;
      }
  
      if (!newPassword || newPassword.length < 6) {
        toast.error("Invalid password", {
          position: "bottom-right",
          autoClose: 5000,
        });
        return;
      }
      if (checkPassword(newPassword) === false) {
        toast.error(
          "Password must contain at least one uppercase and one number",
          {
            position: "bottom-right",
            autoClose: 5000,
          }
        );
        return;
      }
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPass
      );
      reauthenticateWithCredential(auth.currentUser, credential)
        .then(() => {
          updatePassword(user, newPassword)
            .then(() => {
              onClose();
              toast.success("Password changed successfully", {
                position: "bottom-right",
                autoClose: 5000,
              });
            })
            .catch((error) => {
              toast.error("Old password doesn't match", {
                position: "bottom-right",
                autoClose: 5000,
              });
            });
        })
        .catch((error) => {
          toast.error("Old password doesn't match", {
            position: "bottom-right",
            autoClose: 5000,
          });
        });
    };

    const togglePass = () => {
      setShow(!show);
    };
  return (
    <div class='ml-20'>

      <div >
     


      </div>
      <h3 class="text-2xl text-gray-700 font-bold pt-6 ml-3">User Details</h3>
      <div class='flex flex-row items-start justify-start m-3'>
               <UserUpdate item={display }/>  
                <UserDelete item={display}/>


      </div>
           

              <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr >
        
  

              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Name</Td>
                <Td>{display&& display.firstName} {display&& display.middleName} {display&& display.lastName}</Td>
         
              </Tr>
              <Tr>
                <Td>Gender</Td>
                <Td>{display&&display.gender}</Td>
       
              </Tr>
              <Tr>
                <Td>Birth Date</Td>
                <Td>
                {display && display.birthDate
                  ? display.birthDate.split("T")[0]
                  : ""}
                </Td>
              </Tr>
              <Tr>
                <Td>Age</Td>
                <Td><Age birthdate={display&&display.birthDate}/></Td>
              </Tr>
              <Tr>
                <Td>Specialization</Td>
                <Td>{display&&display.specialization}</Td>
              </Tr>
              <Tr>
              <Td>Password</Td>
              <Td>
                <Button onClick={onOpen}>Change Password</Button>
              </Td>
            </Tr>
              
           
            </Tbody>
  

          </Table>
        </TableContainer>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Current Password</FormLabel>

              <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <BsFillLockFill class="text-gray-400" />
                </div>
                <input
                  onChange={(e) => setCurrentPass(e.target.value)}
                  value={currentPass}
                  type={show ? "text" : "password"}
                  class="block w-full px-8 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md   focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"

                  placeholder="Current Password"
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

            <FormControl mt={4}>
              <FormLabel>New Password</FormLabel>

              <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <BsFillLockFill class="text-gray-400" />
                </div>
                <input
                  onChange={(e) => setnewPassword(e.target.value)}
                  value={newPassword}
                  type={show ? "text" : "password"}
                  class="block w-full px-8 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md   focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"

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
            <Button colorScheme="orange" onClick={changePassword} mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
          

    </div>
  )
}

export default UserView