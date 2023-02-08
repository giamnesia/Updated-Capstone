import React,{Suspense} from "react";
// import { UseAuthContext} from '../hooks/useAuthContext'

//components
const PatientForm = React.lazy(() => import('../../components/patientForm'));

const AddPatient = () => {
  return (
    <div>
      <div>
        <Suspense fallback={<div class="text-center">Loading...</div>}>
          <PatientForm />
        </Suspense>
      </div>
    </div>
  );
};

export default AddPatient;
