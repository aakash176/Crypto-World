import React, { useState } from 'react'
import { useEffect } from 'react'
import { SingleCoin } from '../config/api'
import { CryptoState } from '../CryptoContext'
import axios from 'axios'
import { LinearProgress, Typography } from '@material-ui/core'
import ReactHtmlParser from 'react-html-parser'
import { useParams } from 'react-router-dom'
import { numberWithCommas } from '../components/Coinstable'
import Charts from '../components/Chart'
import Button from '../components/Button'
const Coins = () => {
  const {id} = useParams()
  const {currency, symbol, user} = CryptoState()
  const [data, setData] = useState()
  const [btnClick, setBtnClick] = useState(false)
  const fetchSingleCoin = async() => {
    const {data} = await axios.get(SingleCoin(id))
    setData(data)
  }

  const handleClick = async() => {
    setBtnClick(true)
    const body = {email:user, crypto_id:id}
    const wishlist = await axios.post("http://localhost:5000/api/wishlist/add_wishlist",body );
    console.log(wishlist);
  }
  useEffect(() => {
    fetchSingleCoin()
  }, [])
 console.log(data);
 if (!data) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
    <div className="container" style={{ display: "flex" }}>
      <div
        className="left"
        style={{
          width: "30%",
          display: "flex",
          marginTop: "25px",
          alignItems: "center",
          borderRight: "2px solid grey",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            style={{ height: "200px", width: "200px", marginTop: "20px" }}
            src={data?.image.large}
          />
          <Typography
            variant="h3"
            style={{
              fontWeight: "bold",
              marginBottom: 20,
              fontFamily: "Montserrat",
            }}
          >
            {data.name}
          </Typography>
          <Typography
            variant="subtitle1"
            style={{
              textAlign: "justify",
              fontFamily: "monospace",
              padding: "25px",
              paddingTop: "0px",
              fontSize: "20px",
            }}
          >
            {ReactHtmlParser(data.description.en.split(". ")[0])}
          </Typography>
          <div>
            <span style={{ display: "flex" }}>
              <Typography variant="h4" style={{ fontWeight: "bold" }}>
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h4">
                {numberWithCommas(data.market_cap_rank)}
              </Typography>
            </span>

            <span
              style={{ display: "flex", margin: "20px", marginLeft: "0px" }}
            >
              <Typography variant="h4" style={{ fontWeight: "bold" }}>
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h4" style={{ maxWidth: "300px" }}>
                {symbol}{" "}
                {numberWithCommas(
                  data.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </span>
            <span
              style={{ display: "flex", margin: "20px", marginLeft: "0px" }}
            >
              <Typography variant="h4" style={{ fontWeight: "bold" }}>
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h4" style={{ maxWidth: "300px" }}>
                {symbol}{" "}
                {numberWithCommas(
                  data?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
                M
              </Typography>
            </span>
            {
              user?(
            <Button
              key="Add to wishlist"
              onClick={handleClick}
              selected={btnClick}
            >Add to wishlist</Button>):<></>
            }
          </div>
        </div>
      </div>
      <Charts coin={data} />
    </div>
  );
}

export default Coins