import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BsFillLockFill } from "react-icons/bs";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Terms from "./Terms";
import { Link, useNavigate } from "react-router-dom";

import PasswordStrengthBar from "react-password-strength-bar";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useUserAuth } from "../../context/UserAuthContext";

import validator from 'validator' 

const Signup = () => {
  const [displayName, setDisplayName] = useState();
  const [firstName, setFirstName] = useState();

  const [middleName, setMiddleName] = useState();

  const [lastName, setLastName] = useState();
  

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [error, setError] = useState();
  const [recaptchaHandler, setHandler] = useState(false);

  const navigate = useNavigate();

  const { auth, signUp, verifyEmail, token } = useUserAuth();

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

    // const user = {
    //   email,
    // };

    // const response = await fetch("api/user", {
    //   method: "POST",
    //   body: JSON.stringify(user),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const json = await response.json();
    // if (!response.ok) {
    //   toast.error("Fields required", {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
    // if (response.ok) {
    //   toast.success("Appointment added successfully", {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }

 
      const isValidEmail =  validator.isEmail(email);

      if (!isValidEmail){
        toast.error(`Invalid email address`, {
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
    if(auth){
      toast.error("Invalid password", {
        position: "bottom-right",
        autoClose: 5000,
      });
      return;
    }
    
      if (recaptchaHandler === true) {
        try{
          await axios
          .post(
            "localhost:3000/portal/user/register",
            {
              email,
              password,
              firstName,
              middleName,
              lastName
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          
              toast.success(`😃 Successfully created account:  ${email}`, {
                autoClose: 5000,
                position: "bottom-right",
                pauseOnHover: false,
              });
              navigate("/login");
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
    <div class="mt-10">
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
            <h1 class="text-3xl font-bold text-center mb-4 cursor-pointer">
              Signup
            </h1>
            <p class="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
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
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
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
                  class=" border border-gray-500 text-gray-900 text-sm rounded-lg outline-none focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 p-2.5"
                  placeholder="Display Name"
                  autoComplete="off"
                  required
                />
              </div> */}
             
              <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
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
                  class=" border border-gray-500 text-gray-900 text-sm rounded-lg outline-none focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 p-2.5"
                  placeholder="First Name"
                  autoComplete="off"
                  required
                />
              </div>
              <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
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
                  class=" border border-gray-500 text-gray-900 text-sm rounded-lg outline-none focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 p-2.5"
                  placeholder="Middle Name"
                  autoComplete="off"
                  required
                />
              </div>

              <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
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
                  class=" border border-gray-500 text-gray-900 text-sm rounded-lg outline-none focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 p-2.5"
                  placeholder="Last Name"
                  autoComplete="off"
                  required
                />
              </div>
              <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
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
                  class=" border border-gray-500 text-gray-900 text-sm rounded-lg outline-none focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 p-2.5"
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
                  class=" border border-gray-500 text-gray-900 outline-none  text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 p-2.5"
                  placeholder="password"
                  required
                />
                <div class="flex absolute inset-y-0  right-0 text-gray-500 items-center px-3 cursor-pointer">
                  {show ? (
                    <AiFillEye class="w-5 h-5" onClick={togglePass} />
                  ) : (
                    <AiFillEyeInvisible class="w-5 h-5" onClick={togglePass} />
                  )}
                </div>
              </div>
            </div>

            <br />
            <PasswordStrengthBar password={password} />

            <Terms />
            <br/>
            <ReCAPTCHA
              sitekey="6Ld_HxckAAAAAIiLCNHriKVxG1oxzLm-mVpPObex"
              onChange={onChange}
            />

            <div>
              
              <button class="bg-amber-500 w-full mt-4 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Create Account
              </button>
            </div>
          </form>

          {/* <div class="flex justify-center items-center">
            <span class="w-full border border-gray"></span>
            <span class="px-4 text-gray-700">or</span>
            <span class="w-full border border-gray"></span>
          </div> */}
          <div class="text-center mt-3">
            {/* <GoogleLogin /> */}

            <p class="mt-4 text-sm">
              Already Have An Account?{" "}
              <span class="underline cursor-pointer">
                <Link to="/login">Login</Link>{" "}
              </span>
            </p>
          </div>
        </div>
        <div class="w-40 h-40 absolute  rounded-full top-0 right-12 hidden md:block"></div>
        <div class="w-20 h-40 absolute  rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
      </div>
    </div>
  );
};

export default Signup;