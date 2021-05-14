import React from 'react'

import DashboardSidebar from "./DashboardSidebar/DashboardSidebar";
import DashboardNavbar from './DashboardNavbar/DashboardNavbar';

const Dashboard: React.FC = () => {
  return (
    <div>
      <div className='dashboardNavbar'>
        <DashboardNavbar />
      </div>
      <div className='dashboardSidebar'>
        <DashboardSidebar />
      </div>
    </div>
  )
}

export default Dashboard
