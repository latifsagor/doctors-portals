import React, { useState } from 'react'
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material'
import login from '../../../images/login.png'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

const Login = () => {
  const [loginData, setLoginData] = useState()
  const { user, logInUser, authError, isLoading, signInWithGoogle } = useAuth()

  const location = useLocation()
  const history = useHistory()

  const handleOnChange = (e) => {
    const field = e.target.name
    const value = e.target.value
    const newLoginData = { ...loginData }
    newLoginData[field] = value
    setLoginData(newLoginData)
  }

  const handleOnSubmit = (e) => {
    logInUser(loginData?.email, loginData?.password, location, history)
    e.preventDefault()
  }

  const handleGoogleSignIn = () => {
    signInWithGoogle(location, history)
  }

  return (
    <Container>
      <Grid container spacing={2} sx={{ py: 5 }}>
        <Grid item xs={6} md={6}>
          <Typography variant="h5" sx={{ textAlign: 'center', width: '75%' }}>
            Login
          </Typography>
          <form onSubmit={handleOnSubmit}>
            <TextField
              id="standard-basic"
              label="Your Email"
              variant="standard"
              type="email"
              name="email"
              onBlur={handleOnChange}
              sx={{ width: '75%', mb: 1 }}
            />
            <TextField
              id="standard-basic"
              label="Password"
              variant="standard"
              type="password"
              name="password"
              onBlur={handleOnChange}
              sx={{ width: '75%', mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ width: '75%', mb: 1 }}
            >
              Sign In
            </Button>
            <NavLink to="/register">
              <Button variant="text">New User? Please Register</Button>
            </NavLink>
            {isLoading && <CircularProgress color="secondary" />}
          </form>
          <p>
            -------------------------------or, -------------------------------
          </p>
          <Button
            style={{ width: '75%', marginBottom: '15px' }}
            variant="contained"
            onClick={handleGoogleSignIn}
          >
            Google Sign In
          </Button>
          {user?.email && <Alert severity="success">Login Successfully!</Alert>}
          {user?.authError && <Alert severity="error">{authError}</Alert>}
        </Grid>
        <Grid item xs={6} md={6}>
          <img style={{ width: '75%' }} src={login} alt="login page" />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
