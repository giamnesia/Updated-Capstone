import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Filter from "./Filter";
import FilterServices from "./FilterServices";
import { UsePatientContext } from "../../../hooks/usePatientContext";
import FilterGender from "./FilterGender";
import FilterMonth from "./FilterMonth";
import { useReactToPrint } from "react-to-print";
import Calauag from "../../../images/calauag.png";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
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
  Spinner,
  Tag,
  TagLabel,
  TagCloseButton,
  TagIcon,
  HStack,
} from "@chakra-ui/react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";

import "react-toastify/dist/ReactToastify.css";
import { AiFillEyeInvisible, AiFillEye, AiFillPrinter } from "react-icons/ai";
import { BsFillLockFill } from "react-icons/bs";
const FilterPatient = () => {
  const [filterAddress, setFilterAddress] = useState([]);
  const [filterServices, setFilterServices] = useState([]);
  const [filterMonth, setFilterMonth] = useState([]);

  const [filterGender, setFilterGender] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [item, setItem] = useState([]);

  const { dispatch, patient } = UsePatientContext();
  const [totalPages, setTotalPages] = useState(0);
  const [results, setResults] = useState([]);
  const [password, setPassword] = useState();

  const [currentPage, setCurrentPage] = useState(0);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(false);
  const pages = new Array(totalPages).fill(null).map((v, i) => i);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const togglePass = () => {
    setShow(!show);
  };

  const columns = [
    {
      name: "First Name",
      selector: (row) => row.fname,
      sortable: true,
    },
    {
      name: "Middle Name",
      selector: (row) => row.mname,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lname,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Purpose",
      selector: (row) => row.purpose,

      sortable: true,

    },
  ];
  useEffect(() => {
    const fetchPatient = async () => {
      const response = await fetch(
        `/portal/health/get?page=${currentPage}&address=${
          filterAddress ? filterAddress.toString() : ""
        }&gender=${filterGender.toString()}&services=${filterServices.toString()}&month=${
          filterMonth ? filterMonth.toString() : ""
        }`
      );
      const json = await response.json();

      try {
        if (response.ok) {
          setItem(json);
          setResults(json.filtered);
          setTotalPages(json.totalPages);
          setTotal(json.totalResultsFiltered);
          dispatch({ type: "SET_PATIENT", payload: json });
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchPatient();
  }, [filterAddress, filterGender, filterServices, filterMonth]);

  const exportToExcel = async () => {
    try {
      await axios
        .get(
          `/portal/health/get?address=${
            filterAddress ? filterAddress.toString() : ""
          }&gender=${filterGender.toString()}&services=${filterServices.toString()}&month=${filterMonth.toString()}`
        )
        .then((response) => {
          const data = response.data.filtered;
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
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div class="ml-20">
        <p class='ml-5'>Filter by Barangay</p>
        <Button onClick={onOpen} m={4}>
          Choose Barangay
        </Button>
        <Drawer onClose={onClose} isOpen={isOpen} size={"md"}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader></DrawerHeader>
            <DrawerBody>
              {item && item ? (
                <Filter
                  filterAddress={filterAddress}
                  address={item ? item.address : []}
                  setFilterAddress={(address) => setFilterAddress(address)}
                />
              ) : (
                <p>None</p>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>

      <div class="flex flex-row items-start ml-6">
        {item && item ? (
          <>
            <FilterServices
              filterServices={filterServices}
              services={item ? item.services : []}
              setFilterServices={(services) => setFilterServices(services)}
            />
          </>
        ) : (
          <p>None</p>
        )}
        <FilterGender
          filterGender={filterGender}
          gender={item.gender ? item.gender : []}
          setFilterGender={(gender) => setFilterGender(gender)}
        />
        {item && item ? (
          <FilterMonth
            filterMonth={filterMonth}
            month={item.month ? item.month : []}
            setFilterMonth={(month) => setFilterMonth(month)}
          />
        ) : (
          <p>None</p>
        )}
      </div>

      <div class="sm:px-6 w-full ">
        <div class="px-7 ">
          <div class="flex flex-col items-center justify-center mt-6">
            {/* <p
          
              class="text-center sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800"
            >
              Patient Information
            </p> */}
            {/* <div class="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
              <p>Sort By:</p>
              <select
                aria-label="select"
                class="focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
              >
                <option class="text-sm text-indigo-800">Latest</option>
                <option class="text-sm text-indigo-800">Oldest</option>
                <option class="text-sm text-indigo-800">Latest</option>
              </select>
            </div> */}
          </div>
        </div>

        <div class="bg-white py-4 md:py-7  md:px-8 xl:px-10">
          <div class="p-6">
            <Button
              class="float-right bg-gray-200 p-2 rounded"
              onClick={exportToExcel}
            >
              Export to Excel (.xlsx) file
            </Button>
          </div>
          <div class="p-6">
            <Button
              class="float-right bg-gray-200 p-2 rounded"
              onClick={handlePrint}
            >
              Print File
            </Button>
          </div>
          <div class="ml-20">
            <p class="text-xl">Showing {total} results</p>
          </div>

          <HStack spacing={4} ml="20" mt="10">
            <Tag
              size="sm"
              borderRadius="full"
              variant="solid"
              colorScheme="green"
            >
              <TagLabel>
                {filterAddress.length > 0 ? filterAddress.toString() : "All"}
              </TagLabel>
            </Tag>
            <Tag
              size="sm"
              borderRadius="full"
              variant="solid"
              colorScheme="green"
            >
              <TagLabel>
                {filterServices.length > 0 ? filterServices.toString() : "All"}
              </TagLabel>
            </Tag>
            <Tag
              size="sm"
              borderRadius="full"
              variant="solid"
              colorScheme="green"
            >
              <TagLabel>
                {filterGender.length > 0 ? filterGender.toString() : "All"}
              </TagLabel>
            </Tag>
            <Tag
              size="sm"
              borderRadius="full"
              variant="solid"
              colorScheme="green"
            >
              <TagLabel>
                {filterMonth.length > 0 ? filterMonth.toString() : "All"}
              </TagLabel>
            </Tag>
          </HStack>
          <br/>

          {/* <Modal

        isOpen={isOpen}
        onClose={onClose}
        >
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
                  
                  onChange={(e) =>setPassword(e.target.value)} value={password}
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
                    <Button colorScheme='orange' onClick={exportToExcel} mr={3}>
                      Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal> */}
          <div style={{ display: "none" }}>
            <div class="mt-7 overflow-x-auto" ref={componentRef}>
              <div class="flex flex-row items-center justify-center">
                <img src={Calauag} class="w-12 h-12 m-3 " />
                <p class="text-center text-2xl font-bold">RHU Calauag</p>
              </div>
              <div>
                <div class="ml-10">
                  <p class="text-xl">{total} results</p>
                </div>

                <HStack spacing={4} ml="10" mt="10">
                  <Tag
                    size="sm"
                    borderRadius="full"
                    variant="solid"
                    colorScheme="green"
                  >
                    <TagLabel>
                      {filterAddress.length > 0
                        ? filterAddress.toString()
                        : "All"}
                    </TagLabel>
                  </Tag>
                  <Tag
                    size="sm"
                    borderRadius="full"
                    variant="solid"
                    colorScheme="green"
                  >
                    <TagLabel>
                      {filterServices.length > 0
                        ? filterServices.toString()
                        : "All"}
                    </TagLabel>
                  </Tag>
                  <Tag
                    size="sm"
                    borderRadius="full"
                    variant="solid"
                    colorScheme="green"
                  >
                    <TagLabel>
                      {filterGender.length > 0
                        ? filterGender.toString()
                        : "All"}
                    </TagLabel>
                  </Tag>
                  <Tag
                    size="sm"
                    borderRadius="full"
                    variant="solid"
                    colorScheme="green"
                  >
                    <TagLabel>
                      {filterMonth.length > 0 ? filterMonth.toString() : "All"}
                    </TagLabel>
                  </Tag>
                </HStack>
                <br />
              </div>

              <table class="w-full whitespace-nowrap text-sm">
                <thead>
                  <tr
                    tabindex="0"
                    class="focus:outline-none h-14 border border-gray-100 rounded"
                  >
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>

                    <th>Age</th>
                    <th>Address</th>

                    <th>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {item.filtered &&
                    item.filtered.map((item) => (
                      <tr
                        tabindex="0"
                        class="focus:outline-none h-14 border text-center border-gray-100 rounded"
                      >
                        <td>
                          {item.fname.charAt(0) +
                            "*".repeat(item.fname ? item.fname.length - 1 : "")}
                        </td>
                        <td>
                          {item.mname.charAt(0) +
                            "*".repeat(item.mname ? item.mname.length - 1 : "")}
                        </td>
                        <td>
                          {item.lname.charAt(0) +
                            "*".repeat(item.lname ? item.lname.length - 1 : "")}
                        </td>
                        <td>{item.gender}</td>
                        <td>{item.age}</td>

                        <td>{item.address}</td>
                        <td>{item.purpose}</td>

                        <td>
                          <td class="items-center flex flex-col justify-center"></td>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div class='ml-10'>
          <DataTable
              columns={columns}
              data={results}
              pagination
          
            />
          </div>

      
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default FilterPatient;