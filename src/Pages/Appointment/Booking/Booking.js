import React from 'react'
import { Button, Grid, Paper, Typography } from '@mui/material'
import BookingModal from '../BookingModal/BookingModal'

const Booking = ({ booking, date, setBookingSuccess }) => {
  const { name, time, space } = booking
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ py: 5 }}>
          <Typography variant="h5" gutterBottom style={{ color: '#1CC7C1' }}>
            {name}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {time}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            style={{ textTransform: 'uppercase' }}
          >
            {space} spaces available
          </Typography>
          <Button
            onClick={handleOpen}
            variant="contained"
            style={{ background: '#1CC7C1' }}
          >
            book appointment
          </Button>
        </Paper>
      </Grid>
      <BookingModal
        booking={booking}
        date={date}
        open={open}
        handleClose={handleClose}
        setBookingSuccess={setBookingSuccess}
      ></BookingModal>
    </>
  )
}

export default Booking
