import React, {useState, useEffect} from 'react'
import {Link,useParams} from 'react-router-dom'
import UserDelete from './UserDelete'
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
} from '@chakra-ui/react'
import Age from '../Doctor/Table/Age'
import { useUserAuth } from '../../context/UserAuthContext'
const UserView = () => {

    const { id } = useParams();

    const [display, setDisplay] = useState();
    const {user} =useUserAuth()


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
  return (
    <div class='ml-20'>

      <div >
     


      </div>
      <h3 class="text-2xl text-gray-700 font-bold pt-6 ml-3">User Details</h3>
      <div class='flex flex-row items-start justify-start m-3'>
               {/* <ModalPatient item={display }/>   */}
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
                <Td>{display&&display.birthDate}</Td>
              </Tr>
              <Tr>
                <Td>Age</Td>
                <Td><Age birthdate={display&&display.birthDate}/></Td>
              </Tr>
              <Tr>
                <Td>Specialization</Td>
                <Td>{display&&display.specialization}</Td>
              </Tr>
          
              
           
            </Tbody>
  

          </Table>
        </TableContainer>

          

    </div>
  )
}

export default UserView