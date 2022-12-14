import React from 'react'
import { useEffect } from 'react'
import { UseDoctorContext } from '../hooks/useDoctorContext'
//import { UseAuthContext} from '../hooks/useAuthContext'

//components
import DoctorDetails from '../components/doctorDetails'
import DoctorForm from '../components/doctorForm'

const DoctorPage = () => {
    const {docInfo, dispatch} = UseDoctorContext()
    //const {user} = UseAuthContext()
    
    useEffect(() => {

        const fetchDoctors = async () => {
            const response = await fetch('/portal/doctor', {
                headers: {
                    // 'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch ({type: 'SET_DOCTOR', payload: json})
            }
        }

        // if (user) {
        //     fetchDoctors()
        // }

        fetchDoctors()

    }, [docInfo] )
    // [dispatch, user]

    return (
        <div className="DoctorPage">
            <div className="workouts"> 
                {docInfo && docInfo.map((doctorinfo) => (
                    <DoctorDetails key={doctorinfo._id} doctorinfo={doctorinfo} />

                ))}
            </div>
            
            <DoctorForm />  
        </div>
    )
}

export default DoctorPage