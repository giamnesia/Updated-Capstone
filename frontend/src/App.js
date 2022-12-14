import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";


import { Navigate} from 'react-router-dom'
import { UseAuthContext } from './hooks/useAuthContext';

//pages and components 

import Login from './components/auth/Login';
import Signup from './pages/Authentication/Signup';
// import Navbar from './components/Navbar';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DoctorPage from "./pages/DoctorPage";
import ConsultPage from "./pages/ConsultPage";
import Page404 from "./pages/Page404";
import ManagePatient from "./pages/Doctor/ManagePatient";
import AddPatient from "./pages/Doctor/AddPatient";
import AddDoctor from "./pages/Admin/AddDoctor";
import ManageDoctor from "./pages/Admin/ManageDoctor";
// import ViewHistory from "./pages/Doctor/ViewHistory";
import AddConsult from "./pages/Doctor/AddConsult";
import ViewConsult from "./pages/Doctor/ViewConsult";
import TablePatient from "./pages/Doctor/charts/tablepatient";
import PatientRecord from "./pages/Doctor/Table/PatientRecord";
import PatientView from "./pages/Doctor/Table/PatientView";

import { UserAuthContextProvider } from './context/UserAuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
//SIDEBAR
// import Sidebar from './components/Sidebar';
// import SideBar from './components/Sidebar/SideBar';
import SideNav from "./components/SideNav/SideNav";
import Dashboard from "./pages/Doctor/Dashboard";
import Report from "./pages/Doctor/Report";
import Search from "./pages/Doctor/Search";


function App() {
   const {user} = UseAuthContext()

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

   
            <Route path="/doctor" 
              element={<ProtectedRoute>
                <DoctorPage/>
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
            {/* <Route path="/viewhistory" element={<ViewHistory />} /> */}
    
            <Route path="/viewconsult" 
              element={<ProtectedRoute>
                <ViewConsult />
              </ProtectedRoute>
              }
            />
            <Route path="/tablepatient"  
             element={<ProtectedRoute>
              <TablePatient />
            </ProtectedRoute>
            } />
            <Route path="/patientRecord" 
            element={<ProtectedRoute>
              <PatientRecord />
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

            
            <Route path="*" element={<Page404 />} />

            </Route>
          
    
            


            <Route path= "/login" element={ <Login /> } />
            <Route path= "/signup" element={<Signup /> } /> 
            {/* <Route path= "/doctor" element={user ? <DoctorPage /> : <Navigate to="/doctor" />} /> */}
          </Routes>
          </UserAuthContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
