import React, { useState } from 'react'
import { Alert, Button, TextField, Typography } from '@mui/material'
import useAuth from '../../../hooks/useAuth'

const MakeAdmin = () => {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)

  const { token } = useAuth()

  const handleAdminSubmit = (e) => {
    const user = { email }
    fetch('https://still-fjord-96598.herokuapp.com/users/admin', {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          console.log(data)
          setEmail('')
          setSuccess(true)
        }
      })
    e.preventDefault()
  }

  const handleOnBlur = (e) => {
    setEmail(e?.target?.value)
  }
  return (
    <div>
      <Typography variant="h2">Make Admin</Typography>
      <form onSubmit={handleAdminSubmit}>
        <TextField
          type="email"
          label="Email"
          variant="standard"
          onBlur={handleOnBlur}
          sx={{ my: 3 }}
        />
        <br />
        <Button type="submit" variant="contained">
          Make An Admin
        </Button>
      </form>
      {success && <Alert severity="success">Successfully!</Alert>}
    </div>
  )
}

export default MakeAdmin
