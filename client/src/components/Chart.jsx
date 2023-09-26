import { CircularProgress, ThemeProvider, createTheme } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { chartDays } from '../config/data'
import { Line } from "react-chartjs-2";
import Button from './Button'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const Charts = ({coin}) => {
    const [historicData, setHistoricData] = useState({})
    const [flag, setFlag] = useState(false)
    const [days, setDays] = useState(1)
    const {currency} = CryptoState()
    const darkTheme = createTheme({
        palette:{
            primary:{main:"#fff"},
            type:"dark"
        }
    })
    const fetchHistoricData = async() => {
        const {data} = await axios.get(HistoricalChart(coin.id, days, currency ))
        setHistoricData(data.prices)
        setFlag(true)
    }
    useEffect(() => {
        fetchHistoricData()
    }, [days])
    console.log(historicData);
  return (
    <ThemeProvider theme={darkTheme}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "70%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "25px",
          padding:'10px'
        }}
      >
        {!historicData || flag === false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <Button
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setFlag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default Charts