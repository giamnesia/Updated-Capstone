import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";

import { BsFillLockFill } from "react-icons/bs";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import ReCAPTCHA from "react-google-recaptcha";

const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [show, setShow] = useState(false);
  const [recaptchaHandler, setHandler] = useState(false);
  const { logIn, user } = useUserAuth();
  const navigate = useNavigate();

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email && !password){
      toast.error("Invalid credentials", {
        position: "bottom-right",
        autoClose: 5000,
      });
      return;
    }

    if(!email){
      toast.error("Invalid email address", {
        position: "bottom-right",
        autoClose: 5000,
      });
      return;
    }
    if(!password){
      toast.error("Invalid password", {
        position: "bottom-right",
        autoClose: 5000,
      });
      return;
    }


    try {
      if (recaptchaHandler === true) {
        await logIn(email, password);

        navigate("/");
        toast.success(`😃 Successfully logged in as ${email ? email : []}`, {
          autoClose: 5000,
          position: "bottom-right",
          pauseOnHover: false,
        });
      } else {
        toast.error("Verify using ReCaptcha", {
          autoClose: 5000,
          pauseOnHover: false,
          position: "bottom-right",
        });
      }
    } catch (err) {
      toast.error("Invalid credentials", {
        autoClose: 5000,
        pauseOnHover: false,
        position: "bottom-right",
      });
      setError(`Your account or password is incorrect. If you don't remember your password,reset it now`)
      
    }
  };

  return (
    <div class="mt-10">
      <Helmet>
        <title>RHU Calauag | Login</title>
        <meta name="description" content="Login" />
      </Helmet>

      <div class="min-h-screen flex justify-center  items-center">
        <div class="absolute w-60 h-60 rounded-xl -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
        <div class="absolute w-48 h-48 rounded-xl  -bottom-6 -right-10 transform rotate-12 hidden md:block"></div>
        <div class="py-12 px-12  bg-white rounded-2xl shadow-xl ">
          <div>
            <h1 class="text-3xl font-bold text-center mb-4 cursor-pointer">
              Login
            </h1>
            <p class="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
              Login to your account
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div class="space-y-4">
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
                  class=" border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 p-2.5"
                  placeholder="name@email.com"
                  autoComplete="off"
                />
              </div>

              <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <BsFillLockFill class="text-gray-400" />
                </div>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type={show ? "text" : "password"}
                  class=" border border-gray-400 text-gray-900 text-sm rounded-lg outline-none  focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 p-2.5"
                  placeholder="password"
                />
                <div class="flex absolute inset-y-0  right-0 text-gray-500 items-center px-3 cursor-pointer">
                  {show ? (
                    <AiFillEye class="w-5 h-5" onClick={togglePass} />
                  ) : (
                    <AiFillEyeInvisible class="w-5 h-5" onClick={togglePass} />
                  )}
                </div>
              </div>
              <p class='text-xs text-red-500 w-56'>{error}</p>

            </div>
            <br/>

            <ReCAPTCHA
              sitekey="6LfMV1IiAAAAAMPmpixYh7hb3ojn7UZcpHYdNpDR"
              onChange={onChange}
            />

            <div class="mt-4 flex items-center justify-between">
              <Link
                class="inline-block align-baseline font-bold text-sm text-amber-500 hover:text-amber-600"
                to="/forgot"
              >
                Forgot Password?
              </Link>
            </div>
            <div>
              <button class="bg-amber-500 w-full mt-4 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Sign In
              </button>
            </div>
          </form>

          <div class="text-center mt-3">
            {/* <GoogleLogin /> */}

            <p class="mt-4 text-sm">
              Don't Have An Account?{" "}
              <span class="underline cursor-pointer">
                <Link to="/signup">Signup</Link>{" "}
              </span>
            </p>
          </div>
        </div>
        <div class="w-40 h-40 absolute rounded-full top-0 right-12 hidden md:block"></div>
        <div class="w-20 h-40 absolute  rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
      </div>
    </div>
  );
};

export default Signup;