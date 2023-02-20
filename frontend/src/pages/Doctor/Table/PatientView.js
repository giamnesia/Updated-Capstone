import React, { useState, useEffect,useRef} from "react";
import { Link, useParams } from "react-router-dom";
import ModalPatient from "./ModalPatient";
import ModalDelete from "./ModalDelete";
import { Icon } from "@chakra-ui/react";
import ConsultForm from "../../../components/consultForm";
import LabResults from "./LabResults";
import VitalSigns from "./VitalSigns";
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
import * as XLSX from "xlsx";
import axios from "axios";
import { toast } from "react-toastify";
import { AiFillEyeInvisible, AiFillEye, AiFillPrinter } from "react-icons/ai";
import { BsFillLockFill } from "react-icons/bs";
import Age from "./Age";
import "react-toastify/dist/ReactToastify.css";
import {useReactToPrint} from 'react-to-print';

const PatientView = () => {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [password, setPassword] = useState();

  const [display, setDisplay] = useState();
  const [consult, setConsult] = useState();
  const [show, setShow] = useState(false);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const togglePass = () => {
    setShow(!show);
  };
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

  const exportToExcel = () => {
    if (!password) {
      toast.error("Please input your password", {
        position: "bottom-right",
        autoClose: 5000,
      });
      return;
    }
    if (password === "rhuadmin123") {
      axios
        .get(`/portal/health/agg/${id}`)
        .then((response) => {
          const data = response.data.patient;
          const ws = XLSX.utils.json_to_sheet(data);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(
            new Blob([XLSX.write(wb, { type: "array" })], {
              type: "application/octet-stream",
            })
          );
          const dateToday = new Date().toLocaleDateString();
          link.download = `${response.data.patientFind.fname}-${response.data.patientFind.mname}'s.xlsx`;
          link.click();
          toast.success("File downloaded successfully", {
            position: "bottom-right",
            autoClose: 5000,
          });
          onClose();
          setPassword("");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast.error("Wrong Password", {
        position: "bottom-right",
        autoClose: 5000,
      });
      return;
    }
  };

  return (
    <div class="ml-20">
      {/* <div>
        <button onClick={handlePrint}><AiFillPrinter/></button>
      </div> */}
      <h3 class="text-2xl text-gray-700 font-bold pt-6 ml-3">
        Patient Details
      </h3>
      <div class="flex flex-row items-start justify-start m-3">
        <ModalPatient item={display} />
        <ConsultForm item={display} />
        <ModalDelete item={display} />
        <Button class="float-right bg-gray-200 p-2 m-1 rounded" onClick={onOpen}>
          Export {display&& display.fname.charAt(0) +
                    "*".repeat(display.fname.length - 1)}'s data to Excel
        </Button>
      </div>

      <TableContainer >
        <Table variant="simple">
          <Thead>
            <Tr></Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Name</Td>
              <Td>
                {display &&
                  display.fname.charAt(0) +
                    "*".repeat(display.fname.length - 1)}{" "}
                {display &&
                  display.mname.charAt(0) +
                    "*".repeat(
                      display.mname ? display.mname.length - 1 : ""
                    )}{" "}
                {display &&
                  display.lname.charAt(0) +
                    "*".repeat(display.lname.length - 1)}
              </Td>
            </Tr>
            <Tr>
              <Td>Gender</Td>
              <Td>{display && display.gender}</Td>
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
              <Td>
                {" "}
                <Age
                  birthdate={
                    display && display.birthDate ? display.birthDate : ""
                  }
                />
              </Td>
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Export {display&& display.fname.charAt(0) +
                    "*".repeat(display.fname.length - 1)}'s data to Excel</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Type Admin Password</FormLabel>

              <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <BsFillLockFill class="text-gray-400" />
                </div>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
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
            <Button colorScheme="orange" onClick={exportToExcel} mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <br />
      <h3 class="text-2xl text-gray-700 font-bold mb-6 ml-3">Consultation</h3>

      <TableContainer >
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
                    <VitalSigns item={item} />
                  </Td>

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
