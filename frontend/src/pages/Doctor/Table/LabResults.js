import React from "react";
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
const LabResults = ({ cbc,wa}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button class="float-right bg-gray-200 p-2 rounded" onClick={onOpen}>
        View
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Lab Results</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <p>Complete Blood Count: {cbc ? cbc : "N/A"}</p>
            <p>WA: {wa ? wa : "N/A"}</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LabResults;
