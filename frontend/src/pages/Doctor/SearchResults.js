import React from 'react'
import {Link} from 'react-router-dom'
const SearchResults = ({item}) => {
  return (
    <div> <div class="sm:px-6 w-full">

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

                
                    <tr tabindex="0" class="focus:outline-none h-14 border text-center border-gray-100 rounded">
            
                <td>{item.fname}</td>
                <td>{item.mname}</td>
                <td>{item.lname}</td>
                <td>{item.gender}</td>
                <td>{item.age}</td>
                <td>{item.address}</td>
                <td>{item.contact}</td>
                <td>

                <td class='items-center flex flex-col justify-center'>
                <Link to={`/${item._id}`}>  </Link>

                </td>
              
            
                </td>


            </tr>

          
     
          
                </tbody>
            </table>
        </div>
    </div>
</div>
    </div>
  )
}

export default SearchResults