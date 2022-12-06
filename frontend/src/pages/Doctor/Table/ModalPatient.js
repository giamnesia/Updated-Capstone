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
    FormLabel,
  } from '@chakra-ui/react'
  import {BiEdit} from 'react-icons/bi'
  import barangays from '../../../data/barangay'
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
    <div>
                <Button leftIcon={<BiEdit />} onClick={onOpen}>Edit</Button>
                      <Modal
                   
                      isOpen={isOpen}
                      onClose={onClose}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Edit Patient Information</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                          <FormControl  >
                            <FormLabel>First name</FormLabel>
                            <Input   focusBorderColor='orange.400' onChange={handleFname} value={fname}
                            placeholder={item.fname}
                            />
                          </FormControl>
                          <FormControl mt={4}>
                            <FormLabel>Middle name</FormLabel>
                            <Input  focusBorderColor='orange.400' onChange={handleMname} value={mname} 
                            placeholder={item.mname}
                            
                            />
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>Last name</FormLabel>
                            <Input  focusBorderColor='orange.400'  onChange={handleLname} value={lname} 
                            placeholder={item.lname}
                            
                            />
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
                            placeholder={item.age} 
                             onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                            
                            />
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>Contact</FormLabel>
                            <Input  focusBorderColor='orange.400'  onChange={(e)=>setContact(e.target.value)} value={contact}
                             onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                             maxLength="11"
                             minLength="11"
                             placeholder={item.contact}
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
                          <Button colorScheme='orange' mr={3} onClick={handleUpdate}>
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