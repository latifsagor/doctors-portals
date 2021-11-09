import React from 'react'
import Grid from '@mui/material/Grid'
import { Button, Container, Typography } from '@mui/material'

import bg from '../../../images/bg.png'
import chair from '../../../images/chair.png'
import { Box } from '@mui/system'

const bannerBg = {
  background: `url(${bg})`,
}

const verticalCenter = {
  display: 'flex',
  alignItems: 'center',
  height: '450px',
}

const Banner = () => {
  return (
    <Container style={bannerBg} sx={{ flexGrow: 1 }}>
      <Grid container sx={{ my: 2 }} spacing={2}>
        <Grid style={{ ...verticalCenter, textAlign: 'left' }} xs={12} md={5}>
          <Box>
            <Typography variant="h3" gutterBottom>
              Your New Smile <br /> Starts Here
            </Typography>
            <Typography paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
              sed. Nobis necessitatibus quas esse porro a, recusandae eaque
              facilis dicta! Fuga iste nemo dolore odit numquam veniam rem
              asperiores placeat.
            </Typography>
            <Button variant="contained">Get Appointment</Button>
          </Box>
        </Grid>
        <Grid style={verticalCenter} item xs={12} md={7}>
          <img style={{ width: '450px' }} src={chair} alt="" />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Banner
