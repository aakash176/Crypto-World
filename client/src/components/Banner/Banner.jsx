import { Container, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel'

const Banner = () => {
  return (
    <div className='banner'>
        <Container className='banner__container'>
            <div className='banner__header'>
                <Typography
                variant='h2'
                style={{
                    fontWeight:'bold',
                    marginBottom:15,
                    fontFamily:'Montserrat'
                }}
                >
                Crypto World

                </Typography>
                <Typography
                variant='subtitle2'
                style={{
                    color:'darkgray',
                    textTransform:'capitalize',
                    fontFamily:'Montserrat'
                }}
                >
                get all info regarding your favorite crypto currencies

                </Typography>
            </div>
            <Carousel/>
        </Container>
    </div>
  )
}

export default Banner