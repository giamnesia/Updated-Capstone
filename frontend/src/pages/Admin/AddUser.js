import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import { BsFillLockFill } from "react-icons/bs";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import axios from "axios";
import { useUserAuth } from "../../context/UserAuthContext";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  FormLabel,
  Input,
  Select,
  Stack,
  Box,
} from "@chakra-ui/react";
import validator from "validator";

const AddUser = () => {
  const [displayName, setDisplayName] = useState();
  const [firstName, setFirstName] = useState();

  const [middleName, setMiddleName] = useState();

  const [lastName, setLastName] = useState();
  const [gender, setGender] = useState();
  const [birthDate, setBirthDate] = useState();
  const [specialization, setSpecialization] = useState();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [error, setError] = useState();
  const [recaptchaHandler, setHandler] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const { auth } = useUserAuth();

  const togglePass = () => {
    setShow(!show);
  };
  async function onChange(value) {
    if (value !== null) {
      setHandler(true);
    } else {
      setHandler(false);
    }
  }

  function checkPassword(password) {
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasUppercase && hasNumber;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidEmail = validator.isEmail(email);

    if (!isValidEmail) {
      toast.error(`Invalid email address`, {
        autoClose: 5000,
        position: "bottom-left",
        pauseOnHover: false,
      });

      return;
    }
    const currDate = Date.now();

    const currentDate = new Date(currDate);

    // Calculate the age
    const age = currentDate.getFullYear() - new Date(birthDate).getFullYear();
    // Check if the user is 18 years old or above
    if (age <= 18) {
      toast.error(`User must be 18 years old and above`, {
        autoClose: 5000,
        position: "bottom-left",
        pauseOnHover: false,
      });
      return;
    }

    if (!password || password.length < 6) {
      console.log(checkPassword(password));
      toast.error("Invalid password", {
        position: "bottom-left",
        autoClose: 5000,
      });
      return;
    }

    if (!specialization) {
      console.log(checkPassword(password));
      toast.error("Specialization Required", {
        position: "bottom-left",
        autoClose: 5000,
      });
      return;
    }
    if (checkPassword(password) === false) {
      console.log(checkPassword(password));
      toast.error(
        "Password must contain at least one uppercase and one number",
        {
          position: "bottom-left",
          autoClose: 5000,
        }
      );
      return;
    }
    if (auth) {
      toast.error("Invalid password", {
        position: "bottom-left",
        autoClose: 5000,
      });
      return;
    }

    try {
      await axios.post("/portal/user/", {
        email,
        password,
        firstName,
        middleName,
        lastName,
        gender,
        birthDate,
        specialization,
      });

      toast.success(`😃 Successfully created account:  ${email}`, {
        autoClose: 5000,
        position: "bottom-left",
        pauseOnHover: false,
      });
      onClose();
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setSpecialization("");
      setEmail("");
      setPassword("");
      setBirthDate("");
    } catch (e) {
      toast.error(`${e}`, {
        autoClose: 5000,
        position: "bottom-left",
        pauseOnHover: false,
      });
    }
  };

  return (
    <div class="mt-20">
      <Helmet>
        <title>RHU Calauag | Signup</title>
        <meta name="description" content="Signup" />
      </Helmet>

      <Button colorScheme="orange" onClick={onOpen}>
        Create user
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create a new account
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">First Name</FormLabel>
                <Input
                  onChange={(e) => {
                    setFirstName(e.target.value.toUpperCase());
                  }}
                  value={firstName}
                  onKeyDown={function(e) {
                    if (e.shiftKey || e.ctrlKey || e.altKey) {
                      e.preventDefault();
                    } else {
                      var key = e.keyCode;

                      if (
                        !(
                          key == 8 ||
                          key == 32 ||
                          key == 46 ||
                          (key >= 35 && key <= 40) ||
                          (key >= 65 && key <= 90)
                        )
                      ) {
                        e.preventDefault();
                      }
                    }
                  }}
                  type="text"
                  id="email-address-icon"
                  placeholder="First Name"
                  autoComplete="off"
                  required
                />
              </Box>
              <Box>
                <FormLabel htmlFor="username">Middle Name</FormLabel>

                <Input
                  onChange={(e) => {
                    setMiddleName(e.target.value.toUpperCase());
                  }}
                  value={middleName}
                  onKeyDown={function(e) {
                    if (e.shiftKey || e.ctrlKey || e.altKey) {
                      e.preventDefault();
                    } else {
                      var key = e.keyCode;

                      if (
                        !(
                          key == 8 ||
                          key == 32 ||
                          key == 46 ||
                          (key >= 35 && key <= 40) ||
                          (key >= 65 && key <= 90)
                        )
                      ) {
                        e.preventDefault();
                      }
                    }
                  }}
                  type="text"
                  id="email-address-icon"
                  placeholder="Middle Name"
                  autoComplete="off"
                  required
                />
              </Box>
              <Box>
                <FormLabel htmlFor="username">Last Name</FormLabel>

                <Input
                  onChange={(e) => {
                    setLastName(e.target.value.toUpperCase());
                  }}
                  value={lastName}
                  onKeyDown={function(e) {
                    if (e.shiftKey || e.ctrlKey || e.altKey) {
                      e.preventDefault();
                    } else {
                      var key = e.keyCode;

                      if (
                        !(
                          key == 8 ||
                          key == 32 ||
                          key == 46 ||
                          (key >= 35 && key <= 40) ||
                          (key >= 65 && key <= 90)
                        )
                      ) {
                        e.preventDefault();
                      }
                    }
                  }}
                  type="text"
                  id="email-address-icon"
                  placeholder="Last Name"
                  autoComplete="off"
                  required
                />
              </Box>

              <Box>
                <FormLabel>Specialization</FormLabel>
                <Input onChange={(e) => setSpecialization(e.target.value)} />
              </Box>

              <Box>
                <FormLabel>Gender</FormLabel>
                <select
                  value={gender}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 "
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" selected="selected" hidden="hidden">
                    Choose Here
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </Box>

              <Box>
                <FormLabel>Birth Date</FormLabel>
                <Input
                  type="date"
                  required
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Email</FormLabel>

                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="name@email.com"
                  autoComplete="off"
                  required
                />
              </Box>
              <Box>
                <FormLabel>Password</FormLabel>
                <div class="relative">
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    type={show ? "text" : "password"}
                    placeholder="password"
                    required
                  />
                  <div class="flex absolute inset-y-0  right-0 text-gray-400 items-center px-3 cursor-pointer">
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
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="orange" onClick={handleSubmit}>
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AddUser;
