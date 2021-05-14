import React from 'react'
import AddEmployeeButton from "./AddEmployeButton/AddEmployeButton"
import PerfectScrollbar from 'react-perfect-scrollbar'
import Employee from "./Employee/Employee"
import { useSelector } from "react-redux";
import {
  Grid,
  Box,
  Table,
  TableHead,
  TableCell,
  TableRow,
  Card,
  TableContainer
} from "@material-ui/core"

import { AppStateType } from '../../../redux/store/store'
import './Employees.scss'

const Employees = () => {

  const users = useSelector((store: AppStateType) => store.users)

  return (
    <div>
      <div className='addButton'>
        <AddEmployeeButton />
      </div>
      <Grid>
        <Card>
          <PerfectScrollbar>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Photo</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Store</TableCell>
                  </TableRow>
                </TableHead>
                {
                  users.map(user => {
                    return <Employee
                      photo={user.photo}
                      fullName={user.fullName}
                      email={user.email}
                      location={user.location}
                      phone={user.phone}
                      store={user.store}
                    />
                  })
                }
              </Table>
            </TableContainer>
          </PerfectScrollbar>
        </Card>
      </Grid>
    </div>
  )
}

export default Employees
