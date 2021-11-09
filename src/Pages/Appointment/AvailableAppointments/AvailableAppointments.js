import React, { useState } from 'react'
import { Grid, Container, Typography, Alert } from '@mui/material'
import Booking from '../Booking/Booking'

const bookings = [
  {
    id: 1,
    name: 'Teeth Orthodonics',
    time: '08.00 AM - 09.00 AM',
    space: 10,
  },
  {
    id: 2,
    name: 'Cosmetic Dentistry',
    time: '10.05 AM - 11.30 AM',
    space: 10,
  },
  {
    id: 3,
    name: 'Teeth Cleaning',
    time: '05.00 PM - 06.30 PM',
    space: 10,
  },
  {
    id: 4,
    name: 'Cavity Protection',
    time: '07.00 AM - 08.30 AM',
    space: 10,
  },
  {
    id: 5,
    name: 'Teeth Cleaning',
    time: '08.00 AM - 09.00 AM',
    space: 10,
  },
  {
    id: 6,
    name: 'Teeth Protection',
    time: '08.00 AM - 09.00 AM',
    space: 10,
  },
]

const AvailableAppointments = ({ date }) => {
  const [bookingSuccess, setBookingSuccess] = useState(false)
  return (
    <div>
      <Container>
        <Typography variant="h5" gutterBottom sx={{ mb: 5 }}>
          Available appointment date: {date.toDateString()}
        </Typography>
        {bookingSuccess && (
          <Alert severity="success">Appointment Booked Successfully!</Alert>
        )}
        <Grid container spacing={2}>
          {bookings.map((booking) => (
            <Booking
              key={booking.id}
              booking={booking}
              date={date}
              setBookingSuccess={setBookingSuccess}
            ></Booking>
          ))}
        </Grid>
      </Container>
    </div>
  )
}

export default AvailableAppointments
