import React from 'react'
import Navigation from '../../Shared/Navigation/Navigation'
import AppoinmentBanner from '../AppoinmentBanner/AppoinmentBanner'
import Banner from '../Banner/Banner'
import Services from '../Services/Services'

const Home = () => {
  return (
    <div>
      <Navigation></Navigation>
      <Banner />
      <Services />
      <AppoinmentBanner />
    </div>
  )
}

export default Home
