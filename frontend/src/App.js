import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";


import { Navigate} from 'react-router-dom'
import { UseAuthContext } from './hooks/useAuthContext';

//pages and components 

import Login from './components/auth/Login';
import Forgot from './components/auth/Forgot';

import Signup from './pages/Authentication/Signup';
// import Navbar from './components/Navbar';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from 'react';
import ConsultPage from "./pages/ConsultPage";
import Page404 from "./pages/Page404";
import ManagePatient from "./pages/Doctor/ManagePatient";
import AddPatient from "./pages/Doctor/AddPatient";
import AddDoctor from "./pages/Admin/AddDoctor";
import ManageDoctor from "./pages/Admin/ManageDoctor";
// import ViewHistory from "./pages/Doctor/ViewHistory";
import AddConsult from "./pages/Doctor/AddConsult";
import ViewConsult from "./pages/Doctor/ViewConsult";
import PatientRecord from "./pages/Doctor/Table/PatientRecord";
import FilterPatient from "./pages/Doctor/Table/FilterPatient";

import PatientView from "./pages/Doctor/Table/PatientView";
import UserList from './pages/Admin/UserList';
import UserView from './pages/Admin/UserView';

import { UserAuthContextProvider } from './context/UserAuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
//SIDEBAR
// import Sidebar from './components/Sidebar';
// import SideBar from './components/Sidebar/SideBar';
import SideNav from "./components/SideNav/SideNav";
import Dashboard from "./pages/Doctor/Dashboard";
import Report from "./pages/Doctor/charts/Report";
import Search from "./pages/Doctor/Search";


function App() {
   const {user} = UseAuthContext()
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
   
     setIsLoading(false);
   }, []);
 
   if (isLoading) {
     return <div>Loading...</div>;
   }
  return (
    <div className="App">
      <BrowserRouter>
      <UserAuthContextProvider>
      <ToastContainer />

        


          <Routes>
            <Route element={<SideNav />}>
            <Route exact path="/"
              element={<ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
              }
            />
            <Route path="/report" 
              element={<ProtectedRoute>
                <Report />
              </ProtectedRoute>
              }
            />

   
          
            <Route path="/consult" element={<ConsultPage />} />
            <Route path="/managepatient" 
              element={<ProtectedRoute>
                <ManagePatient />
              </ProtectedRoute>
              }
            />
            {/* <Route path="/addpatient" element={<AddPatient />} /> */}
            <Route path="/managedoctor" 
              element={<ProtectedRoute>
                <ManageDoctor/>
              </ProtectedRoute>
              }
            />
            <Route path="/adddoctor" element={<AddDoctor />} />
            <Route path="/addUser" 
             element={
              <UserList/>
            
            }
            />

            {/* <Route path="/viewhistory" element={<ViewHistory />} /> */}
    
            <Route path="/viewconsult" 
              element={<ProtectedRoute>
                <ViewConsult />
              </ProtectedRoute>
              }
            />
          
            <Route path="/patientRecord" 
            element={<ProtectedRoute>
              <PatientRecord />
            </ProtectedRoute>
            }
             />

              <Route path="/filter" 
            element={<ProtectedRoute>
              <FilterPatient />
            </ProtectedRoute>
            }
             />
            <Route path="/search"
              element={<ProtectedRoute>
                <Search/>
              </ProtectedRoute>
              }
            />

            <Route path="/:id" 
              element={<ProtectedRoute>
                <PatientView/>
              </ProtectedRoute>
              }
            />
              <Route path="/user/:id" 
              element={<ProtectedRoute>
                <UserView/>
              </ProtectedRoute>
              }
            />

            
            <Route path="*" element={<Page404 />} />

            </Route>
          
    
            


            <Route path= "/login" element={ <Login /> } />
            <Route path= "/forgot" element={ <Forgot /> } />
            {/* <Route path= "/doctor" element={user ? <DoctorPage /> : <Navigate to="/doctor" />} /> */}
          </Routes>
          </UserAuthContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
