import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { Helmet } from "react-helmet";
import Clinic2 from './clinic2.jpg'
const Forgot = () => {
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();

  const { sendEmail } = useUserAuth();
  const forgotPass = async (e) => {
    e.preventDefault();
    try {
      await sendEmail(email);
      setMessage("Check your spam folder to reset password  ");
    } catch (err) {
      setMessage("");
      toast.error("Invalid email", {
        autoClose: 5000,
        position: "bottom-right",
      });
      console.log(err.message);
    }
  };
  return (
    <div>
      <Helmet>
        <title>RHU Calauag | Forgot Password</title>
        <meta name="description" content="Forgot" />
      </Helmet>

      <div class="container mx-auto mt-32">
        <div class="flex justify-center px-3 my-3">
          <div class="w-full xl:w-3/4 lg:w-11/12 flex">
            <img
              class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              src={Clinic2}
            ></img>
            <div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <div class="px-8 mb-4 text-center">
                <h3 class="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
                <p class="mb-4 text-sm text-gray-700">
                  We get it, stuff happens. Just enter your email address below
                  and we'll send you a link to reset your password!
                </p>
              </div>
              <form
                onSubmit={forgotPass}
                class="px-8 pt-6 pb-8 mb-4 bg-white rounded"
              >
                <div class="relative mb-6">
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
                    class=" border border-gray-500 text-gray-900 text-sm outline-none rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 p-2.5"
                    placeholder="name@email.com"
                  />
                </div>
                <div class="mb-6 text-center">
                  <button class="w-full px-4 py-2 font-bold text-white bg-amber-500 rounded-md hover:bg-amber-600  focus:outline-none focus:shadow-outline">
                    Reset Password
                  </button>
                </div>
                <hr class="mb-6 border-t" />
                <div class="text-start">
                  <Link to="/signup">
                    <a class="inline-block text-sm text-gray-800 align-baseline ">
                      Create an Account <span class="underline hover:text-amber-500">Sign-up</span> 
                    </a>
                  </Link>
                </div>
                <div class="text-start">
                  <Link to="/login">
                    <a class="inline-block text-sm text-gray-800 align-baseline ">
                      Already have an account? <span class="underline hover:text-amber-500">Login Here</span> 
                    </a>
                  </Link>
                </div>
              </form>
              {message ? (
             
                  <p>Email Sent! {message}</p>
                
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;