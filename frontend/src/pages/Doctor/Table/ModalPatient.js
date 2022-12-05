import React, {useState} from 'react'
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

const ModalPatient = ({item}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

      // FOR UPDATE AND DELETE 
      const [id ,setId] = useState("");
  
      const [fname, setFname] = useState();
      const [mname, setMname] = useState();
      const [lname, setLname] = useState();
      const [age, setAge] = useState();
      const [gender, setGender] = useState();
      const [address, setAddress] = useState();
      const [contact, setContact] = useState();

      const handleUpdate= async (e) => {
        e.preventDefault();
        const patient = { fname, mname, lname, gender, age, address, contact };
    
        const response = await fetch(`http://localhost:3000/portal/health/${item._id}`, {
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
    <div>
        <Button onClick={onOpen}>Edit</Button>
                      <Modal
                   
                      isOpen={isOpen}
                      onClose={onClose}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Edit Patient Information</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                          <FormControl>
                            <FormLabel>First name</FormLabel>
                            <Input  onChange={(e)=>setFname(e.target.value)} value={fname}  />
                          </FormControl>
                          <FormControl mt={4}>
                            <FormLabel>Middle name</FormLabel>
                            <Input  onChange={(e)=>setMname(e.target.value)} value={mname} />
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>Last name</FormLabel>
                            <Input  onChange={(e)=>setLname(e.target.value)} value={lname} />
                          </FormControl>
                          <FormControl mt={4}>
                            <FormLabel>Gender</FormLabel>
                          <select
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
                            <Input  onChange={(e)=>setAge(e.target.value)} value={age} />
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>Contact</FormLabel>
                            <Input  onChange={(e)=>setContact(e.target.value)} value={contact} />
                          </FormControl>
                        </ModalBody>

                        <ModalFooter>
                          <Button colorScheme='blue' mr={3} onClick={handleUpdate}>
                            Save
                          </Button>
                          <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>

    </div>
  )
}

export default ModalPatient;