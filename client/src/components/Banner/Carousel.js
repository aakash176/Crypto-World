import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TrendingCoins } from '../../config/api'
import { CryptoState } from '../../CryptoContext'
import AliceCarousel from "react-alice-carousel";
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const Carousel = () => {
  const [coins, setCoins] = useState([])
  
  const {currency, symbol} = CryptoState()

  const fetchCoins = async() => {
    const {data} = await axios.get(TrendingCoins(currency));
    setCoins(data)
  }

  
  const responsive = {
    0:{
      items:2
    },
    512:{
      items:4
    }
  }
  console.log(coins);
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  const items = coins.map((coin) => {
    return (
      <div>
          {
            !coins?(<CircularProgress
                style={{ color: "gold" }}
                size={250}
                thickness={1}
              />):<>
                  <Link to={`/coin/${coin.id}`} className='carausel__item'>
            <img src={coin.image} height="80" style={{ marginBottom: 10 }} />
            <span>
              {coin.symbol}
              &nbsp;
              <span
                className={coin.price_change_percentage_24h >= 0 ? "green" : "red"}
              >
                {coin.price_change_percentage_24h >= 0 && "+"}
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </span>
            <span style={{ fontSize: 22, fontWeight: 500 }}>
              {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
            </span>
          </Link>
              </>
          }

      </div>
      
    );
  });
  useEffect(() => {
    fetchCoins()
    
  },[currency])
  return (
    <div className="carousel__main">
      <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      disableDotsControls
      responsive={responsive}
      autoPlay
      disableButtonsControls
      items={items}
      >

      </AliceCarousel>
    </div>
  );
}

export default Carousel