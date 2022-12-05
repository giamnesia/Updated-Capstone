import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import styled from 'styled-components'

// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
// import { SideNavData } from './SideNavData';
// import SubNav from './SubNav';
// import { IconContext } from 'react-icons/lib';


// const Nav = styled.div`
//   background: orange;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `;

// const NavIcon = styled(Link)`
//   margin-left: 2rem;
//   font-size: 2rem;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `;

// const SidebarNav = styled.nav`
//   background: orange;
//   width: 250px;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   position: fixed;
//   top: 0;
//   left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
//   transition: 350ms;
//   z-index: 10;
// `;

// const SidebarWrap = styled.div`
//   width: 100%;
// `;


const SideNav = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);


  return (
  <>
  

   <Link to="/report"> Report</Link>

    {/* <Link to="/home">  Home</Link> */}
    <Link to="/doctor">  Doctor</Link>
    <Link to="/consult">  Consult</Link>
    <Link to="/managepatient"> Manage Patients</Link>
    <Link to="/addpatient" > Add Patient</Link>
    <Link to="/managedoctor">  Manage Doctor</Link>
    <Link to="/adddoctor">Add Doctor</Link>
 
    <Link to="/addconsult" > Add Consult</Link>
    <Link to="/viewconsult">  View Consult</Link>
    <Link to="/tablepatient"> Table</Link>
    <Link to="/patientRecord"> Patient Record</Link>
  </>
  )
  
}


export default SideNav