import React from 'react'

import DashboardSidebar from "./DashboardSidebar/DashboardSidebar";
import DashboardNavbar from './DashboardNavbar/DashboardNavbar';

const Dashboard = () => {
  return (
    <>
      <DashboardNavbar />
      <DashboardSidebar />
    </>
  )
}

export default Dashboard