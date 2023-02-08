
import React,{Suspense} from 'react';

//import { UseAuthContext} from '../hooks/useAuthContext'

//components
const ConsultForm = React.lazy(() => import('../../components/consultForm'));
const AddConsult = () => {

    return (
    <div>
        <div>
            <Suspense fallback={<div class='text-center'>Loading...</div>}>
            <ConsultForm />

            </Suspense>
        </div>
    </div>
    )
}

export default AddConsult