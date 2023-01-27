import React from "react";
import { Outlet, Link } from "react-router-dom";
import Calauag from '../../images/calauag.png'
import Logout from "../auth/Logout";
const SideNav= () => {
  return (
    <div>
      <div class="h-full  absolute z-20  ">
        <div class="sidebar min-h-screen w-[3.35rem] overflow-hidden border-r hover:w-56 hover:bg-white  hover:shadow-lg transition 
             duration-700">
          <div class="flex h-screen flex-col justify-between pt-2 pb-6">
            <div>
              <div class="w-max p-2.5">
                 <img class='w-8' src={Calauag}/>
              </div>
              <ul class="mt-6 space-y-2 tracking-wide">
                <li class="min-w-max ">
                  <Link
                    to="/"
                    class="relative flex items-center space-x-4 bg-gradient-to-r from-amber-600 to-orange-400 px-4 py-3 text-white"
                  >
                    <svg class="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                        class="fill-current text-orange-400 dark:fill-slate-600"
                      ></path>
                      <path
                        d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                        class="fill-current text-orange-200 group-hover:text-orange-300"
                      ></path>
                      <path
                        d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                        class="fill-current group-hover:text-sky-300"
                      ></path>
                    </svg>

                    <span class="-mr-1 font-medium">Dashboard</span>
                  </Link>
                </li>
                <li class="min-w-max">
                  <Link
                    to="/patientRecord"
                    class="bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        class="fill-current text-gray-300 group-hover:text-orange-300"
                        fill-rule="evenodd"
                        d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                        clip-rule="evenodd"
                      />
                      <path
                        class="fill-current text-gray-600 group-hover:text-orange-600"
                        d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                      />
                    </svg>

                    <span class="group-hover:text-gray-700">Patient Record</span>
                  </Link>
                </li>
                <li class="min-w-max">
                  <Link
                    to="/addUser"
                    class="bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        class="fill-current text-gray-300 group-hover:text-orange-300"
                        fill-rule="evenodd"
                        d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                        clip-rule="evenodd"
                      />
                      <path
                        class="fill-current text-gray-600 group-hover:text-orange-600"
                        d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                      />
                    </svg>

                    <span class="group-hover:text-gray-700">User Record</span>
                  </Link>
                </li>
                <li class="min-w-max">
                  <Link
                    to="/report"
                    class="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        class="fill-current text-gray-600 group-hover:text-orange-600"
                        d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                      />
                      <path
                        class="fill-current text-gray-300 group-hover:text-orange-300"
                        d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
                      />
                    </svg>
                    
                    <span class="group-hover:text-gray-700">Reports</span>
                  </Link>
                </li>
                {/* <li class="min-w-max">
                  <Link to='/'
                    class="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        width="24" height="24"
                        viewBox="0 0 24 24">
                            <path
                           class="fill-current text-gray-600 group-hover:text-orange-600"
                            
                            d="M 6 2 C 4.897 2 4 2.897 4 4 L 4 20 C 4 21.103 4.897 22 6 22 L 18 22 C 19.103 22 20 21.103 20 20 L 20 4 C 20 2.897 19.103 2 18 2 L 6 2 z M 6 4 L 18 4 L 18 20 L 6 20.001953 L 6 4 z M 12 6 C 10.318 6 9 7.317 9 9 C 9 10.683 10.318 12 12 12 C 13.682 12 15 10.683 15 9 C 15 7.317 13.682 6 12 6 z M 12 8 C 12.58 8 13 8.421 13 9 C 13 9.579 12.58 10 12 10 C 11.42 10 11 9.579 11 9 C 11 8.421 11.42 8 12 8 z M 12 13 C 9.149 13 7 14.455766 7 16.384766 L 7 18 L 17 18 L 17 16.384766 C 17 14.455766 14.851 13 12 13 z M 12 15 C 13.47 15 14.489516 15.504 14.853516 16 L 9.1464844 16 C 9.5094844 15.504 10.53 15 12 15 z"></path>
                        </svg>
                          <span class="group-hover:text-gray-700">Manage Doctor</span>
                  </Link>
                </li> */}

                <li class="min-w-max">
                  <Link to='/search'
                    class="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
                  >
                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                  width="24" height="24"
                  viewBox="0 0 24 24">
                      <path
                        class="fill-current text-gray-600 group-hover:text-orange-600"
                      
                      d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
                  </svg>
                    
                    <span class="group-hover:text-gray-700">Search</span>
                  </Link>
                </li>
                
              </ul>
            </div>
            <div class="w-max -mb-3">
              <a
                href="#"
                class="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 group-hover:fill-orange-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="group-hover:text-gray-700"><Logout/></span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default SideNav;