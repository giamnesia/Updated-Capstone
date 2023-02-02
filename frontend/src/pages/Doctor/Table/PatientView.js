import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ModalPatient from "./ModalPatient";
import ModalDelete from "./ModalDelete";
import { Icon } from "@chakra-ui/react";
import ConsultForm from "../../../components/consultForm";
import LabResults from "./LabResults";
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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
const PatientView = () => {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [display, setDisplay] = useState();
  const [consult, setConsult] = useState();

  useEffect(() => {
    const fetchPatient = async () => {
      const response = await fetch(`/portal/health/agg/${id}`);
      response.json().then((data) => {
        if (response.ok) {
          setDisplay(data.patientFind);
          setConsult(data.patient);
        }
        if (!response.ok) {
          throw Error("Error");
        }
      });
    };
    fetchPatient();
  }, [display, consult]);
  return (
    <div class="ml-20">
      <div>
        {/* {
        display ?(
          <div class='bg-gray-200'>
           {display&& display.fname} {display&& display.mname} {display&& display.lname}

            <p> {display&& display.gender}</p>
            <p> {display&& display.age}</p>
            <p> {display&& display.address}</p>
            <p> {display&& display.contact}</p>


            

      
                      
            </div>
         
        ):(
            <p>No Patient</p>
        )

      } */}
      </div>
      <h3 class="text-2xl text-gray-700 font-bold pt-6 ml-3">
        Patient Details
      </h3>
      <div class="flex flex-row items-start justify-start m-3">
        <ModalPatient item={display} />
        <ConsultForm item={display} />
        <ModalDelete item={display} />
      </div>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr></Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Name</Td>
              <Td>
                {display && display.fname} {display && display.mname}{" "}
                {display && display.lname}
              </Td>
            </Tr>
            <Tr>
              <Td>Gender</Td>
              <Td>{display && display.gender}</Td>
            </Tr>
            <Tr>
              <Td>Birth Date</Td>
              <Td>{display && display.birthDate}</Td>
            </Tr>
            <Tr>
              <Td>Age</Td>
              <Td>{display && display.age}</Td>
            </Tr>
            <Tr>
              <Td>Address</Td>
              <Td>{display && display.address}</Td>
            </Tr>
            <Tr>
              <Td>Contact</Td>
              <Td>{display && display.contact}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      <br />
      <h3 class="text-2xl text-gray-700 font-bold mb-6 ml-3">Consultation</h3>

      <TableContainer>
        <Table variant="simple">
          <TableCaption>Consultation History</TableCaption>
          <Thead>
            <Tr>
              <Th>Date</Th>

              <Th>Purpose of Visit</Th>
              <Th>Chief Complaint</Th>

              <Th>Vital Signs</Th>
              <Th>Lab Results</Th>

              <Th>Blood Chem</Th>
              <Th>Diagnosis</Th>

              <Th>Treatment</Th>

              <Th>Comment</Th>

              <Th>Assisted By</Th>
            </Tr>
          </Thead>
          <Tbody>
            {consult &&
              consult.map((item) => (
                <Tr>
                  <Td>{item.createdAt.split("T")[0]}</Td>
                  <Td>{item.purpose}</Td>
                  <Td>{item.complaint ? item.complaint : "N/A"}</Td>
                  <Td>
                    <Button
                      class="float-right bg-gray-200 p-2 rounded"
                      onClick={onOpen}
                    >
                      View
                    </Button>
                  </Td>

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

                  <Td>
                    <LabResults
                      cbc={item.cbc ? item.cbc : "N/A"}
                      wa={item.wa ? item.wa : "N/A"}
                    />
                  </Td>
                  <Td>{item.bloodChem ? item.bloodChem : "None"}</Td>

                  <Td>{item.diagnosis ? item.diagnosis : "None"}</Td>

                  <Td>{item.treatment ? item.treatment : "None"}</Td>
                  <Td>{item.remarks ? item.remarks : "None"}</Td>

                  <Td>{item.attendingDoc}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PatientView;
