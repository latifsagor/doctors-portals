import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import useAuth from '../../../hooks/useAuth'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const BookingModal = ({
  open,
  handleClose,
  booking,
  date,
  setBookingSuccess,
}) => {
  const { name, time } = booking
  const { user } = useAuth()

  const initialInfo = {
    patientName: user?.displayName,
    email: user?.email,
    phone: '',
  }

  const [bookingInfo, setBookingInfo] = useState(initialInfo)

  const handleOnBlur = (e) => {
    const field = e.target.name
    const value = e.target.value
    const newInfo = { ...bookingInfo }
    newInfo[field] = value
    setBookingInfo(newInfo)
  }

  const handleBookingSubmit = (e) => {
    // Collect Data
    const appointment = {
      ...bookingInfo,
      time,
      serviceName: name,
      date: date.toLocaleDateString(),
    }
    // console.log(appointment)
    // Send to the server
    fetch('https://still-fjord-96598.herokuapp.com/appointments', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(appointment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setBookingSuccess(true)
          handleClose()
        }
      })

    e.preventDefault()
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ textAlign: 'center' }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {' '}
            {name}{' '}
          </Typography>
          <form onSubmit={handleBookingSubmit}>
            <TextField
              disabled
              label="Time"
              sx={{ width: '80%', mb: 1 }}
              id="outlined-size-small"
              defaultValue={time}
              size="small"
            />
            <TextField
              label="Your Name"
              sx={{ width: '80%', mb: 1 }}
              id="outlined-size-small"
              defaultValue={user?.displayName}
              size="small"
              onBlur={handleOnBlur}
              name="displayName"
            />
            <TextField
              label="Phone Number"
              sx={{ width: '80%', mb: 1 }}
              id="outlined-size-small"
              defaultValue=""
              size="small"
              onBlur={handleOnBlur}
              name="phone"
            />
            <TextField
              label="Email"
              sx={{ width: '80%', mb: 1 }}
              id="outlined-size-small"
              defaultValue={user?.email}
              size="small"
              onBlur={handleOnBlur}
              name="email"
            />
            <TextField
              disabled
              label="Booking Date"
              sx={{ width: '80%', mb: 1 }}
              id="outlined-size-small"
              defaultValue={date.toDateString()}
              size="small"
            />{' '}
            <br />
            <Button type="submit" variant="contained">
              Send
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default BookingModal
