import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import {useNavigate} from 'react-router-dom'
import {
  Container,
  Typography,
  TextField,
  ThemeProvider,
  createTheme,
  TableContainer,
  LinearProgress,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import { Pagination } from '@material-ui/lab'

export function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const Coinstable = () => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState('')
    const [page, setPage] = useState(1)
    const {currency, symbol} = CryptoState()
    const fetchCoins = async() => {
        setLoading(true)
        let { data } = await axios.get(CoinList(currency));
        setCoins(data)
        setLoading(false)
    }
    const navigate = useNavigate()

    
    
    const darkTheme = createTheme({
      palette: {
        primary: { main: "#fff" },
        type: "dark",
      },
    });
  

    const handleSearch = () => {
        return coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(crypto) ||
            coin.symbol.toLowerCase().includes(crypto)
        );
    }
    
    useEffect(() => {
        fetchCoins()
    },[currency])
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ fontFamily: "Montserrat", marginBottom: "18px" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          id="outlined-basic"
          label="Search For a Crypto Currency..."
          variant="outlined"
          style={{ width: "100%", marginBottom: "20px" }}
          onChange={(e) => setCrypto(e.target.value)}
        />

        <TableContainer style={{ width: "100%" }}>
          {loading ? (
            <LinearProgress color="success" style={{ background: "gold" }} />
          ) : (
            <></>
          )}
          <Table style={{ width: "100%" }}>
            <TableHead style={{ backgroundColor: "gold" }}>
              <TableRow>
                {["Coin", "Price", "24H Change", "Market Cap"].map((head) => (
                  <TableCell
                    style={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "Montserrat",
                    }}
                    key={head}
                    align={head === "Coin" ? "" : "right"}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch().slice((page-1)*10, page*10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow onClick={() => navigate(`/coin/${row.id}`)}>
                      <TableCell style={{ display: "flex"}}>
                        <img
                          src={row.image}
                          style={{ height: "90px", width: "90px" }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" , justifyContent:'center'}}
                        >
                          <span style={{ textTransform: "uppercase" }}>
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgrey" }}>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {symbol + " "}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{ color: profit ? "green" : "red" }}
                      >
                        {profit && "+"}
                        {numberWithCommas(row.price_change_24h.toFixed(2))}
                        {"%"}
                      </TableCell>
                      <TableCell align="right">
                        {symbol + " "}
                        {numberWithCommas(row.market_cap).toString().slice(0,-6)}M
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          count={10}
          color="secondary"
          onChange={(_, value) => {
            setPage(value)
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}

export default Coinstable