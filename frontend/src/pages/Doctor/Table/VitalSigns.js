import React from 'react'
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
  } from "@chakra-ui/react";
const VitalSigns = ({item}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
            <Button class="float-right bg-gray-200 p-2 rounded" onClick={onOpen}>
        View
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Vital Signs</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody pb={6}>
                        <p>Weight: {item.weight ? item.weight : "N/A"}</p>
                        <p>Height: {item.height ? item.height : "N/A"}</p>
                        <p>Blood Pressure: {item.bp ? item.bp : "0"} mmHg</p>

                        <p>
                          Blood Sugar: {item.bloodsugar ? item.bloodsugar : "0"}{" "}
                          mg/dL
                        </p>
                        <p>HR: {item.hr ? item.hr : "0"} </p>
                        <p>RR: {item.rr ? item.rr : "0"}</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
    </div>
  )
}

export default VitalSigns