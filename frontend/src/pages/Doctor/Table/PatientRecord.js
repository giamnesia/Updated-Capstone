import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UsePatientContext } from "../../../hooks/usePatientContext";
import { AiOutlineEye } from "react-icons/ai";
import PatientForm from "../../../components/patientForm";
import { Helmet } from "react-helmet";
import { useReactToPrint } from "react-to-print";
import Calauag from "../../../images/calauag.png";
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
  Spinner,
} from "@chakra-ui/react";
import Age from "./Age";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { BsFillLockFill } from "react-icons/bs";

import DataTable from "react-data-table-component";
const PatientRecord = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [item, setItem] = useState([]);
  const { dispatch, patient } = UsePatientContext();
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState();

  const [show, setShow] = useState(false);
  const togglePass = () => {
    setShow(!show);
  };
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
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
        .get("/portal/health/get")
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
          link.download = `${dateToday}.xlsx`;
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

  useEffect(() => {
    const fetchPatient = async () => {
      const response = await fetch(`/portal/health/get`);
      const json = await response.json();

      try {
        if (response.ok) {
          setItem(json.results);
          setLoading(false);

          dispatch({ type: "SET_PATIENT", payload: json.results });
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchPatient();
  }, [patient, item]);

  const columns = [
    {
      name: "First Name",
      selector: (row) => row.fname,
      sortable: true,
      ignoreRowClick: true,
    },
    {
      name: "Middle Name",
      selector: (row) => row.mname,
      sortable: true,
      ignoreRowClick: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lname,
      sortable: true,
      ignoreRowClick: true,
    },
    {
      name: "Birthdate",
      selector: (row) => row.birthDate.split("T")[0],
      sortable: true,
      ignoreRowClick: true,
    },
    {
      name: "Age",
      selector: (row) => <Age birthdate={row.birthDate} />,
      sortable: true,
      ignoreRowClick: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
      ignoreRowClick: true,
    },
    {
      name: "Contact",
      selector: (row) => (row.contact ? row.contact : "None"),
      ignoreRowClick: true,
    },
    {
      name: "View",
      cell: () => (
        <AiOutlineEye
          class="w-16 h-5 text-amber-800 cursor-pointer"
          data-tag="allowRowEvents"
        />
      ),
    },
  ];

  const navigate = useNavigate();
  const handleClick = (row) => {
    navigate(`/${row._id}`);
  };
  return (
    <div className="tbl-patient ml-20">
      <Helmet>
        <title>RHU Calauag | Patient Info</title>
        <meta name="description" content="Patient Info" />
      </Helmet>

      <div class="sm:px-6 w-full">
        <div class="px-4 md:px-10 py-4 md:py-7">
          <div class="flex items-center justify-between">
            <p
              tabindex="0"
              class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
            >
              Patient Information
            </p>
          </div>
        </div>

        <div class="bg-white py-4 md:py-0 px-4 md:px-8 ">
          <div class="sm:flex items-center justify-between">
            <PatientForm />
          </div>

          <div class="p-6">
            <Button
              class="float-right bg-gray-200 p-2 rounded"
              onClick={onOpen}
            >
              Export to Excel (.xlsx) file
            </Button>
          </div>
          {/* <div class="p-6">
            <Button
              class="float-right bg-gray-200 p-2 rounded"
              onClick={handlePrint}
            >
              Print File
            </Button>
          </div> */}

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Export data to Excel</ModalHeader>
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
                        <AiFillEyeInvisible
                          class="w-5 h-5"
                          onClick={togglePass}
                        />
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
          <div class="mt-7 overflow-x-auto">
            <td class="items-center flex flex-col justify-center"></td>
          </div>
        </div>
      </div>
      <div class='ml-10'>
        {loading ? (
          <div class="flex flex-col items-center">
            <Spinner />
          </div>
        ) : (
          <div ref={componentRef}>
            <DataTable
              columns={columns}
              data={patient}
              pagination
              onRowClicked={handleClick}
            />
          </div>
        )}
        
      
      
      </div>
    </div>
  );
};

export default PatientRecord;
