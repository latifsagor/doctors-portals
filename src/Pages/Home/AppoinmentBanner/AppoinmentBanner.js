import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import doctor from '../../../images/doctor.png'
import appointmentBgImage from '../../../images/appointment.png'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'

const appointmentBg = {
  background: `url(${appointmentBgImage})`,
  backgroundColor: 'rgba(42, 63, 81, .70)',
  backgroundBlendMode: 'darken, luminosity',
  backgroundPosition: 'center',
  marginTop: '200px',
}

const AppoinmentBanner = () => {
  return (
    <Box style={appointmentBg} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <img
            style={{ width: 400, marginTop: '-110px' }}
            src={doctor}
            alt="Appointment"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'left',
          }}
        >
          <Box>
            <Typography
              variant="h6"
              style={{
                color: '#54D6E3',
                marginBottom: '15px',
                fontWeight: 500,
                fontSize: '25px',
              }}
            >
              Appointment
            </Typography>
            <Typography
              gutterBottom
              variant="h4"
              style={{ color: '#fff', fontWeight: 700 }}
            >
              Make an appointment today
            </Typography>
            <Typography
              paragraph
              style={{
                color: '#f7f7f7',
                fontWeight: 300,
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
              exercitationem! Molestias impedit reiciendis unde aliquid
              blanditiis odio quam. Ea quia sapiente excepturi ullam magni
              tempora earum dicta nisi soluta voluptatibus.
            </Typography>
            <Button variant="contained">Learn More</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AppoinmentBanner
