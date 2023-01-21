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

import validator from 'validator' 

const AddUser = () => {
  const [displayName, setDisplayName] = useState();
  const [firstName, setFirstName] = useState();

  const [middleName, setMiddleName] = useState();

  const [lastName, setLastName] = useState();
  const [gender, setGender] = useState();
  const [birthDate, setBirthDate] = useState();

  

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [error, setError] = useState();
  const [recaptchaHandler, setHandler] = useState(false);

  const navigate = useNavigate();

  const { auth, } = useUserAuth();

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
 
      const isValidEmail =  validator.isEmail(email);

      if (!isValidEmail){
        toast.error(`Invalid email address`, {
          autoClose: 5000,
          position: "bottom-right",
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
        position: "bottom-right",
        pauseOnHover: false,
      });
      return;

    } 
     
    
    if(!password || password.length <6   ){
      console.log(checkPassword(password))
      toast.error("Invalid password", {
        position: "bottom-right",
        autoClose: 5000,
      });
      return;
    }
    if( checkPassword(password)=== false  ){
      console.log(checkPassword(password))
      toast.error("Password must contain at least one uppercase and one number", {
        position: "bottom-right",
        autoClose: 5000,
      });
      return;
    }
    // if(auth){
    //   toast.error("Invalid password", {
    //     position: "bottom-right",
    //     autoClose: 5000,
    //   });
    //   return;
    // }
    
      if (recaptchaHandler === true) {
        try{

          
          await axios
          .post(
            "/portal/user/signup",
            {
              email,
              password,
              firstName,
              middleName,
              lastName,
              gender,
              birthDate
            },
          )
          
              toast.success(`😃 Successfully created account:  ${email}`, {
                autoClose: 5000,
                position: "bottom-right",
                pauseOnHover: false,
              });
            
              window.location.reload();

        }catch (e) {
        toast.error(`${e}`, {
          autoClose: 5000,
          position: "bottom-right",
          pauseOnHover: false,
        });
      } 
         
      } else {
        toast.error("Verify using ReCaptcha", {
          autoClose: 5000,
          pauseOnHover: false,
          position: "bottom-right",
        });
      }
    
  };

  return (
    <div class="mt-20">
      <Helmet>
        <title>RHU Calauag | Signup</title>
        <meta name="description" content="Signup" />
      </Helmet>

      <div class="min-h-screen flex justify-center items-center">
        <div class="absolute w-60 h-60 rounded-xl  -top-5 -left-16  transform rotate-45 hidden md:block"></div>
        <div class="absolute w-48 h-48 rounded-xl  -bottom-6 -right-10 transform rotate-12 hidden md:block"></div>
        <div class="py-12 px-12 bg-white  rounded-2xl shadow-xl ">
          <p>{error}</p>
          <div>
            <h1 class="text-3xl font-bold text-center mb-2 cursor-pointer">
              Signup
            </h1>
            <p class="w-80 text-center text-sm mb-4 font-semibold text-gray-700 tracking-wide cursor-pointer">
              Create an account
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div class="space-y-4">
              {/* <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-400 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <input
                  onChange={(e) => setDisplayName(e.target.value)}
                  type="text"
                  class=" border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 p-2.5"
                  placeholder="Display Name"
                  autoComplete="off"
                  required
                />
              </div> */}
             
              <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-gray-400 "
                    fill="currentColor"
                 x="0px" y="0px"
                width="30" height="30"
                viewBox="0 0 30 30">
                    <path d="M24,2H4v26h20c1.105,0,2-0.895,2-2V4C26,2.895,25.105,2,24,2z M9,21c0-3.792,4-2.708,4.5-4.333v-1.083 c-0.225-0.121-0.868-0.951-0.936-1.599c-0.177-0.015-0.455-0.191-0.537-0.886c-0.044-0.373,0.131-0.583,0.237-0.649 c0,0-0.264-0.602-0.264-1.199C12,9.474,12.879,8,15,8c1.145,0,1.5,0.812,1.5,0.812c1.023,0,1.5,1.122,1.5,2.438 c0,0.656-0.264,1.199-0.264,1.199c0.106,0.066,0.281,0.276,0.237,0.649c-0.082,0.695-0.36,0.871-0.537,0.886 c-0.068,0.648-0.711,1.478-0.936,1.599v1.083C17,18.292,21,17.208,21,21H9z"></path>
                </svg>
                </div>

             
                 <input
                    onChange={ (e)=>{
                      setFirstName(e.target.value.toUpperCase() ) 
        
                    }
                    }
                    value={firstName}
              
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
             
                  type="text"
                  id="email-address-icon"
                  class=" border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 p-2.5"
                  placeholder="First Name"
                  autoComplete="off"
                  required
                />
              </div>
              <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-gray-400 "
                    fill="currentColor"
                 x="0px" y="0px"
                width="30" height="30"
                viewBox="0 0 30 30">
                    <path d="M24,2H4v26h20c1.105,0,2-0.895,2-2V4C26,2.895,25.105,2,24,2z M9,21c0-3.792,4-2.708,4.5-4.333v-1.083 c-0.225-0.121-0.868-0.951-0.936-1.599c-0.177-0.015-0.455-0.191-0.537-0.886c-0.044-0.373,0.131-0.583,0.237-0.649 c0,0-0.264-0.602-0.264-1.199C12,9.474,12.879,8,15,8c1.145,0,1.5,0.812,1.5,0.812c1.023,0,1.5,1.122,1.5,2.438 c0,0.656-0.264,1.199-0.264,1.199c0.106,0.066,0.281,0.276,0.237,0.649c-0.082,0.695-0.36,0.871-0.537,0.886 c-0.068,0.648-0.711,1.478-0.936,1.599v1.083C17,18.292,21,17.208,21,21H9z"></path>
                </svg>
                </div>

             
                 <input
                onChange={ (e)=>{
                setMiddleName(e.target.value.toUpperCase() ) 
  
               }
               }
               value={middleName}

        
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
       
                  type="text"
                  id="email-address-icon"
                  class=" border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 p-2.5"
                  placeholder="Middle Name"
                  autoComplete="off"
                  required
                />
              </div>

              <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-gray-400 "
                    fill="currentColor"
                 x="0px" y="0px"
                width="30" height="30"
                viewBox="0 0 30 30">
                    <path d="M24,2H4v26h20c1.105,0,2-0.895,2-2V4C26,2.895,25.105,2,24,2z M9,21c0-3.792,4-2.708,4.5-4.333v-1.083 c-0.225-0.121-0.868-0.951-0.936-1.599c-0.177-0.015-0.455-0.191-0.537-0.886c-0.044-0.373,0.131-0.583,0.237-0.649 c0,0-0.264-0.602-0.264-1.199C12,9.474,12.879,8,15,8c1.145,0,1.5,0.812,1.5,0.812c1.023,0,1.5,1.122,1.5,2.438 c0,0.656-0.264,1.199-0.264,1.199c0.106,0.066,0.281,0.276,0.237,0.649c-0.082,0.695-0.36,0.871-0.537,0.886 c-0.068,0.648-0.711,1.478-0.936,1.599v1.083C17,18.292,21,17.208,21,21H9z"></path>
                </svg>
                </div>

             
                 <input
                    onChange={ (e)=>{
                      setLastName(e.target.value.toUpperCase() ) 
        
                    }
                    }
                    value={lastName}

              
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
             
                  
                  type="text"
                  id="email-address-icon"
                  class=" border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 p-2.5"
                  placeholder="Last Name"
                  autoComplete="off"
                  required
                />
              </div>

           
                <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-400 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <select value={gender} onChange={(e)=>setGender(e.target.value)}>
                <option value="" selected="selected" hidden="hidden">
                          Choose Here
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>



                </select>
            
                
              </div>
              
              <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-400 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>

                <input type='date' required onChange={(e)=>setBirthDate(e.target.value)}/>
           
                
              </div>
              <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-400 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>

                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  id="email-address-icon"
                  class=" border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 p-2.5"
                  placeholder="name@email.com"
                  autoComplete="off"
                  required
                />
               
              </div>

              <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <BsFillLockFill class="text-gray-400" />
                </div>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type={show ? "text" : "password"}
                  class=" border border-gray-400 text-gray-900 outline-none  text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 p-2.5"
                  placeholder="password"
                  required
                />
                <div class="flex absolute inset-y-0  right-0 text-gray-400 items-center px-3 cursor-pointer">
                  {show ? (
                    <AiFillEye class="w-5 h-5" onClick={togglePass} />
                  ) : (
                    <AiFillEyeInvisible class="w-5 h-5" onClick={togglePass} />
                  )}
                </div>
              </div>
            </div>

            <br />

            <br/>
            <ReCAPTCHA
              sitekey="6LfMV1IiAAAAAMPmpixYh7hb3ojn7UZcpHYdNpDR"
              onChange={onChange}
            />

            <div>
              
              <button class="bg-amber-500 w-full mt-4 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Create Account
              </button>
            </div>
          </form>

          
        </div>
        <div class="w-40 h-40 absolute  rounded-full top-0 right-12 hidden md:block"></div>
        <div class="w-20 h-40 absolute  rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
      </div>
    </div>
  );
};

export default AddUser;