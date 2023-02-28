import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  IconButton,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";

import RHUServices from "../../../data/rhuServices";

const ModalEditConsult = ({ item }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // FOR UPDATE AND DELETE
  const [diagnosis, setDiagnosis] = useState("");
  const [description, setDescription] = useState("");
  const [remarks, setRemarks] = useState("");

  const [treatment, setTreatment] = useState("");
  const [bp, setBp] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bloodsugar, setBloodsugar] = useState("");
  const [attendingDoc, setAttendingDoc] = useState("");
  const [complaint, setComplaint] = useState("");
  const [purpose, setPurpose] = useState("");

  const [hr, setHr] = useState("");

  const [rr, setRr] = useState("");

  const [temp, setTemp] = useState("");

  const [findings, setFindings] = useState("");

  const [cbc, setCbc] = useState("");

  const [wa, setWa] = useState("");
  const [bloodChem, setBloodChem] = useState("");
  const [month, setMonth] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const consultinfo = {
      purpose,
      diagnosis,
      treatment,
      bp,
      weight,
      height,
      bloodsugar,
      attendingDoc,

      remarks,
      complaint,
      hr,
      rr,
      temp,
      findings,
      cbc,
      wa,
      bloodChem,
    };

    const response = await fetch(`/portal/consult/${item._id}`, {
      method: "PATCH",
      body: JSON.stringify(consultinfo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      console.log(json);
      window.location.reload();
    }
  };

  return (
    <div>
      <IconButton
        margin={1}
        colorScheme="purple"
        aria-label="Add"
        icon={<BiEdit />}
        onClick={onOpen}
      />

      <Drawer isOpen={isOpen} size="lg" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Edit Consultation</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Purpose of Visit</FormLabel>
              <select
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 "
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              >
                {RHUServices.map((item) => (
                  <>
                    <option value="" selected="selected" hidden="hidden">
                      Choose here
                    </option>
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  </>
                ))}
              </select>
            </FormControl>
            <FormControl>
              <FormLabel>Chief Complaint</FormLabel>

              <Textarea
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                placeholder="Type the complaint here.."
                size="sm"
                focusBorderColor="orange.400"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Weight</FormLabel>
              <Input
                placeholder="kg"
                focusBorderColor="orange.400"
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Height</FormLabel>
              <Input
                placeholder="cm"
                focusBorderColor="orange.400"
                onChange={(e) => setHeight(e.target.value)}
                value={height}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Blood Pressure</FormLabel>
              <Input
                placeholder="mm Hg"
                focusBorderColor="orange.400"
                onChange={(e) => setBp(e.target.value)}
                value={bp}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Blood Sugar</FormLabel>
              <Input
                focusBorderColor="orange.400"
                placeholder="mg/dL"
                onChange={(e) => setBloodsugar(e.target.value)}
                value={bloodsugar}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Hr</FormLabel>
              <Input
                focusBorderColor="orange.400"
                placeholder="mg/dL"
                onChange={(e) => setHr(e.target.value)}
                value={hr}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Rr</FormLabel>
              <Input
                focusBorderColor="orange.400"
                placeholder="mg/dL"
                onChange={(e) => setRr(e.target.value)}
                value={rr}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Temperature</FormLabel>
              <Input
                focusBorderColor="orange.400"
                placeholder="Temperature"
                onChange={(e) => setTemp(e.target.value)}
                value={temp}
              />
            </FormControl>

            {/* //Lab Results// */}

            <FormControl mt={4}>
              <FormLabel>CBC</FormLabel>
              <Input
                focusBorderColor="orange.400"
                placeholder="Complete Blood Count"
                onChange={(e) => setCbc(e.target.value)}
                value={cbc}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>WA</FormLabel>
              <Input
                focusBorderColor="orange.400"
                placeholder="wa"
                onChange={(e) => setWa(e.target.value)}
                value={wa}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Diagnosis</FormLabel>
              <Input
                focusBorderColor="orange.400"
                onChange={(e) => setDiagnosis(e.target.value)}
                value={diagnosis}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Treatment</FormLabel>
              <Input
                focusBorderColor="orange.400"
                onChange={(e) => setTreatment(e.target.value)}
                value={treatment}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Comment</FormLabel>

              <Textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Add your comments here"
                size="sm"
                focusBorderColor="orange.400"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Assisted By:</FormLabel>

              <select
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                value={attendingDoc}
                onChange={(e) => setAttendingDoc(e.target.value)}
              >
                <option value="" selected="selected" hidden="hidden">
                  Choose here
                </option>
                <option value="Dra. Katherine Pulgar-Ruby">
                  Dra. Katherine Pulgar-Ruby
                </option>
                <option value="Ma. Letitia Cana">Ma. Letitia Cana</option>
                <option value="Ricky De Chavez">Ricky De Chavez</option>
                <option value="Rowena Umali">Rowena Umali</option>
                <option value="Evangeline Talolong">Evangeline Talolong</option>
                <option value="Mirriam Alfuen">Mirriam Alfuen</option>
                <option value="Jamila Pedrezuela">Jamila Pedrezuela</option>
                {/* className = {emptyFields.includes('attendingDoc') ? 'error': ''} */}
              </select>
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme="orange" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ModalEditConsult;
