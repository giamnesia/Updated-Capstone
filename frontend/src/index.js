import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PatientContextProvider } from './context/patientContext';
// import { AuthContextProvider } from './context/authContext';
import { DoctorContextProvider } from './context/doctorContext';
import { ConsultContextProvider } from './context/consultContext';
import { ChakraProvider } from '@chakra-ui/react'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    {/* <AuthContextProvider> */}

    <ChakraProvider>
      <PatientContextProvider>
      <DoctorContextProvider>
      <ConsultContextProvider>
      <App />
      </ConsultContextProvider>
      </DoctorContextProvider>
      </PatientContextProvider>

    </ChakraProvider>
    {/* </AuthContextProvider> */}
  </React.StrictMode>
);
