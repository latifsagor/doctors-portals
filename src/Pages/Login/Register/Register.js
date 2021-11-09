import React, { useState } from 'react'
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material'
import login from '../../../images/login.png'
import { NavLink, useHistory } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import Alert from '@mui/material/Alert'

const Register = () => {
  const [loginData, setLoginData] = useState()
  const { registerUser, isLoading, user, authError } = useAuth()
  const history = useHistory()

  // ON SUBMIT
  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (loginData.password !== loginData.confirmPassword) {
      alert('Password did not match!')
    } else {
      alert('Matched')
    }
    registerUser(loginData.name, loginData.email, loginData.password, history)
  }

  // HANDLE ON CHANGE
  const handleOnBlur = (e) => {
    const field = e.target.name
    const value = e.target.value
    const newLoginData = { ...loginData }
    newLoginData[field] = value
    console.log(newLoginData)
    setLoginData(newLoginData)
  }
  return (
    <Container>
      <Grid container spacing={2} sx={{ py: 5 }}>
        <Grid item xs={6} md={6}>
          <Typography variant="h5" sx={{ textAlign: 'center', width: '75%' }}>
            Register
          </Typography>
          {!isLoading && (
            <form onSubmit={handleOnSubmit}>
              <TextField
                id="standard-basic"
                label="Your Name"
                variant="standard"
                type="text"
                name="name"
                onBlur={handleOnBlur}
                sx={{ width: '75%', mb: 1 }}
              />
              <TextField
                id="standard-basic"
                label="Your Email"
                variant="standard"
                type="email"
                name="email"
                onBlur={handleOnBlur}
                sx={{ width: '75%', mb: 1 }}
              />
              <TextField
                id="standard-basic"
                label="Password"
                variant="standard"
                type="password"
                name="password"
                onBlur={handleOnBlur}
                sx={{ width: '75%', mb: 2 }}
              />
              <TextField
                id="standard-basic"
                label="ReType Password"
                variant="standard"
                type="password"
                name="confirmPassword"
                onBlur={handleOnBlur}
                sx={{ width: '75%', mb: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ width: '75%', mb: 1 }}
              >
                Register
              </Button>
              <NavLink to="/login" style={{ textDecoration: 'none' }}>
                <Button variant="text" sx={{ width: '75%', mb: 1 }}>
                  Already Registered? Please login
                </Button>
              </NavLink>
            </form>
          )}
          {isLoading && <CircularProgress color="secondary" />}
          {user?.email && (
            <Alert severity="success">Registration Successfully!</Alert>
          )}
          {authError && <Alert severity="error">{authError}</Alert>}
        </Grid>
        <Grid item xs={6} md={6}>
          <img style={{ width: '75%' }} src={login} alt="login page" />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Register
