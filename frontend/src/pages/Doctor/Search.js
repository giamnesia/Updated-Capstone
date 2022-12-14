import { useState, useEffect } from "react";
import { UseDoctorContext } from '../../hooks/useDoctorContext'
import SearchResults from "./SearchResults";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Highlight } from '@chakra-ui/react'
const Search = () => {
  const { docInfo, dispatch } = UseDoctorContext();

  const [search, setSearch] = useState();
  const [display, setDisplay] = useState();


  const handleSearch = async (e) => {
    e.preventDefault();

    const response = await fetch(`/portal/health?search=${search}`, {
      method: "GET",
    });
    const json = await response.json();
    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      dispatch({ type: "SET_DOCTOR", payload: json });
    }
  };

//   useEffect(()=>{
   
//   },[search])



  return (
    <div class='ml-20'>
      <form onSubmit={handleSearch} >
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Search
        </label>
        <div class="relative m-5">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            class="block p-4 pl-10 w-64 text-sm text-gray-900 bg-gray-50 focus:outline-none rounded-lg border border-gray-300 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Search..."
            required=""
          />
        </div>
      </form>

      <div class="flex flex-row flex-wrap items-center justify-center">
        {
            docInfo && docInfo? (
                <div class="sm:px-6 w-full">

                <div class="px-4 md:px-10 py-4 md:py-7">
                    <div class="flex items-center justify-between">
                        <p tabindex="0" class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Patient Information</p>
                        <div class="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                            <p>Sort By:</p>
                            <select aria-label="select" class="focus:text-indigo-600 focus:outline-none bg-transparent ml-1">
                                <option class="text-sm text-indigo-800">Latest</option>
                                <option class="text-sm text-indigo-800">Oldest</option>
                                <option class="text-sm text-indigo-800">Latest</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                    <div class="sm:flex items-center justify-between">
                        <div class="flex items-center">
                            <a class="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800" href=" javascript:void(0)">
                                <div class="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                                    <p>All</p>
                                </div>
                            </a>
                          
                        </div>
                    </div>
                    <p class='text-center'>{
                        search?(
                            <p> Search results for "{search}"</p>
                        ):(
                            <p> </p>
                        )     
                  }</p>

                    <div class="mt-7 overflow-x-auto">
                        <table class="w-full whitespace-nowrap text-sm">
                        <thead >
                        <tr tabindex="0" class="focus:outline-none h-14 border border-gray-100 rounded">
                    
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Address</th>
                            <th>Contact</th>
                            <th>Action</th>
                            
                        </tr>
                        </thead>
                            <tbody>
    
                            {docInfo && docInfo.map(item => 
                                <tr tabindex="0" class="focus:outline-none h-14 border text-center border-gray-100 rounded">
                        
                            <td>
                            <Highlight query={search?search:'none'} styles={{ px: '1', py: '1', bg: 'orange.100' }}>
                            {item.fname}
                            </Highlight>
                            </td>
                            <td>
                            <Highlight query={search?search:'none'} styles={{ px: '1', py: '1', bg: 'orange.100' }}>
                            {item.mname}
                            </Highlight>
                            </td>
                            <td>
                            <Highlight query={search?search:'none'} styles={{ px: '1', py: '1', bg: 'orange.100' }}>
                            {item.lname}
                            </Highlight>
                            </td>
                            <td>{item.gender}</td>
                            <td>{item.age}</td>
                            <td>
                            <Highlight query={search?search:'none'} styles={{ px: '1', py: '1', bg: 'orange.100' }}>
                            {item.address}
                            </Highlight>
                            </td>
                         
                            <td>{item.contact}</td>
                            <td>
    
                            <td class='items-center flex flex-col justify-center'>
                            <Link to={`/${item._id}`}> <AiOutlineEye class='w-16 h-5 text-amber-800'/> </Link>
    
                            </td>
                          
                        
                            </td>
    
            
                        </tr>
    
                      
                        )}
                      
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            ):(
                <p>No result</p>
            )

        }
      </div>
    </div>
  );
};

export default Search;