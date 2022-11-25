import { useEffect } from 'react'
import React from 'react'
import {UseConsultContext} from '../hooks/useConsultContext'
//import { UseAuthContext} from '../hooks/useAuthContext'

//components
import ConsultDetails from '../components/consultDetails'
import ConsultForm from '../components/consultForm'

const ConsultPage = () => {
    const {conInfo, dispatch} = UseConsultContext()
    //const {user} = UseAuthContext()
    
    useEffect(() => {

        const fetchConsult = async () => {
            const response = await fetch('/portal/consult', {
                headers: {
                    // 'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch ({type: 'SET_CONSULT', payload: json})
            }
        }

        // if (user) {
        //     fetchDoctors()
        // }

        fetchConsult()

    }, [dispatch] )
    // [dispatch, user]

    return (
        <div className="ConsultPage">
            <div className="workouts"> 
                {conInfo && conInfo.map((consultinfo) => (
                    < ConsultDetails key={consultinfo._id} consultinfo={consultinfo} />

                ))}
            </div>
            <ConsultForm />  
        </div>
    )
}

export default ConsultPage