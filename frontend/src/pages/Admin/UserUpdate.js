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
    IconButton,
    useDisclosure,
    Input,
    FormControl,
    FormLabel,
  } from '@chakra-ui/react'
  import {BiEdit} from 'react-icons/bi'

  import Age from '../Doctor/Table/Age';
import { parse, differenceInYears } from 'date-fns';
const UserUpdate = ({item}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

      // FOR UPDATE AND DELETE 
      const [id ,setId] = useState("");
  
      const [firstName, setFirstName] = useState();
      const [middleName, setMiddleName] = useState();
      const [lastName, setLastName] = useState();
      const [age, setAge] = useState();
      const [gender, setGender] = useState();
      const [birthDate, setBirthDate] = useState();

      const [address, setAddress] = useState();
      const [specialization, setSpecialization] = useState();

      const handleUpdate= async (e) => {
        e.preventDefault();
        const patient = { firstName, middleName, lastName, gender, age, specialization, birthDate};
    
        const response = await fetch(`/portal/user/${item._id}`, {
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


    const handleBirthDate =(e)=>{

      setBirthDate(e.target.value)
      setAge(differenceInYears(new Date(), parse(e.target.value, "yyyy-MM-dd", new Date())));
  
    }
  return (
    <div>
                <IconButton
              margin={1}
           
              colorScheme='green'
              aria-label='Edit'
              icon={<BiEdit/>}
              onClick={onOpen}
            />
                      <Modal
                   
                      isOpen={isOpen}
                      onClose={onClose}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Edit User Information</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                          <FormControl  >
                            <FormLabel>First name</FormLabel>
                            <Input   focusBorderColor='orange.400' 
                              type="text"
                              onChange={ (e)=>{
                                setFirstName(e.target.value.toUpperCase() ) 
                  
                              }
                              }
                              onKeyDown={(function (e) {
            
                                if (e.shiftKey || e.ctrlKey || e.altKey) {
                                
                                  
                                  e.preventDefault()
                                  
                                } else {
                                
                                  var key = e.keyCode;
                                  
                                  if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {
                                  
                                 
                                    e.preventDefault()
                              
                                    
                                  }
                            
                                }
                                
                              })}
                          
                              value={firstName}
                            placeholder={item? item.firstName:'none'}
                            />
                          </FormControl>
                          <FormControl mt={4}>
                            <FormLabel>Middle name</FormLabel>
                            <Input  focusBorderColor='orange.400' 
                              type="text"
                              onChange={ (e)=>{
                                setMiddleName(e.target.value.toUpperCase() ) 
                  
                              }
                              }
                              onKeyDown={(function (e) {
            
                                if (e.shiftKey || e.ctrlKey || e.altKey) {
                                
                                  
                                  e.preventDefault()
                                  
                                } else {
                                
                                  var key = e.keyCode;
                                  
                                  if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {
                                  
                                 
                                    e.preventDefault()
                              
                                    
                                  }
                            
                                }
                                
                              })}
                              value={middleName}
                            placeholder={item?item.middleName:'none'}
                            
                            />
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>Last name</FormLabel>
                            <Input  focusBorderColor='orange.400'    type="text"
                            onChange={ (e)=>{
                              setLastName(e.target.value.toUpperCase() ) 
                
                            }
                            }
                            onKeyDown={(function (e) {
          
                              if (e.shiftKey || e.ctrlKey || e.altKey) {
                              
                                
                                e.preventDefault()
                                
                              } else {
                              
                                var key = e.keyCode;
                                
                                if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {
                                
                               
                                  e.preventDefault()
                            
                                  
                                }
                          
                              }
                              
                            })}
                            value={lastName} 
                            placeholder={item?item.lastName:'none'}
                            
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
                            <FormLabel>Birth Date</FormLabel>
                            <input type='date' focusBorderColor='orange.400'  onChange={handleBirthDate} value={birthDate}
                           
                     
                           class='p-2 outline-amber-500'
                            
                            />
                       
                        
                          </FormControl>
                          <FormControl mt={4}>
                            <FormLabel>Age</FormLabel>
                            <Input  focusBorderColor='orange.400' disabled  value={age}
                            placeholder={item?item.age:'none'} 
                         
                            
                            />
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>Specialization</FormLabel>
                            <Input  focusBorderColor='orange.400'  onChange={(e)=>setSpecialization(e.target.value)} value={specialization}
                             onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                             maxLength="11"
                             minLength="11"
                             placeholder={item?item.specialization:'none'}
                            />
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

export default UserUpdate;