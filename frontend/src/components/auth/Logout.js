
import { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom"
import { GiExitDoor } from "react-icons/gi";

import "react-toastify/dist/ReactToastify.css";
const Logout = () => {
  const { user, logOut } = useUserAuth();

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success(`😃 Successfully logged out`, {
        autoClose: 5000,
        position: "bottom-right",
        pauseOnHover: false,
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div class="flex flex-row items-center">
   
         <button  
             onClick={handleLogOut}
         
         >
            Sign-out

         </button>
       
          
        
          
      
    </div>
  );
};

export default Logout;