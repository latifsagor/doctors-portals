import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useAuth from './../../../hooks/useAuth'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const Appointments = ({ date }) => {
  const { user, token } = useAuth()
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    fetch(
      `https://still-fjord-96598.herokuapp.com/appointments?email=${
        user.email
      }&date=${date.toLocaleDateString()}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setAppointments(data))
  }, [date, user.email, token])
  return (
    <div>
      <Typography
        sx={{ fontWeight: 600, textAlign: 'center', my: 2 }}
        variant="h4"
        gutterBottom
      >
        Appointments: {appointments.length}
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Patient Name</TableCell>
              <TableCell align="center">Services</TableCell>
              <TableCell align="center">Patient Email</TableCell>
              <TableCell align="center">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow
                key={appointment?._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {appointment?.patientName}
                </TableCell>
                <TableCell align="center">{appointment?.serviceName}</TableCell>
                <TableCell align="center">{appointment?.email}</TableCell>
                <TableCell align="center">{appointment?.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Appointments
