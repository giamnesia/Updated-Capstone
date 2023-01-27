import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Filter from './Filter'
import { UsePatientContext } from '../../../hooks/usePatientContext'
import List from './List'
const FilterPatient = () => {
   const [filterAddress,setFilterAddress]= useState([]);
   const [item, setItem] = useState([]);

   const {dispatch,patient} = UsePatientContext()

    useEffect(() => {
	
            const fetchPatient = async () => {
                const response = await fetch(`/portal/health/get?address=${filterAddress.toString()}`);
                const json = await response.json();
          
                try {
                  if (response.ok) {
                    setItem(json);
                console.log(json)
            
        
                    dispatch ({type: 'SET_PATIENT', payload: json})
                  }
                } catch (err) {
                  console.log(err.message);
                }
              };

              fetchPatient();
	}, [filterAddress]);

    
  return (
    <div>

                         <Filter
							filterAddress={filterAddress}
							address={item.address ? item.address : []}
							setFilterAddress={(address) => setFilterAddress(address)}
						/> 
                

{
            item && item.filtered.map(item => (
                <p>{item.fname}</p>
            ))
        } 
                      

    </div>
  )
}

export default FilterPatient