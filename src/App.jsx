import React, { useEffect, useState } from "react";
import { exchange, ids } from "./constants/exchange";
import { IndexPage } from "pages/IndexPage";
import { getExchange, getCurrentExchange, getCurrentGlobal } from "api/coingecko";

export const App = () => {
  const [exchanges, setExchanges] = useState([]);
  const [currentTickers, setCurrentTickers] = useState([]);
  const [current, setCurrent] = useState([])

  useEffect(() => {
    Promise.all(
      exchange.map(async (item) => {
        getExchange(item).then((data) => {
          setExchanges((before) => [...before, data]);
        });
      })
    );
  }, []);

  useEffect(() => {
    Promise.all(
      ids.map(async (item) => {
        getCurrentGlobal(item).then((data) => {
          setCurrent((before) => [...before, data]);
        });
      }).flat()
    );
  },[])

  useEffect(() => {
    Promise.all(
      exchange
        .map(async (item) => {
          getCurrentExchange(item).then((data) => {
            setCurrentTickers((before) => [...before, data].flat());
          });
        })
        .flat()
    );
  },[])
  return (
    <div style={{textAlign: 'center'}}>
      {<IndexPage currentTickers={currentTickers} exchanges={exchanges} current={current}/>}
      none
    </div>
  );
};

export default App;
