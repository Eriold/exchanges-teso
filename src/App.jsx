import React, { useEffect, useState } from "react";
import { exchange } from "./constants/exchange";
import { IndexPage } from "pages/IndexPage";
import { getExchange, getCurrentExchange } from "api/coingecko";

export const App = () => {
  const [exchanges, setExchanges] = useState([]);
  const [currentTickers, setCurrentTickers] = useState([]);

  useEffect(() => {
    Promise.all(
      exchange.map(async (item) => {
        getExchange(item).then((data) => {
          setExchanges((before) => [...before, data]);
        });
      })
    );
    Promise.all(
      exchange
        .map(async (item) => {
          getCurrentExchange(item, exchanges).then((data) => {
            setCurrentTickers((before) => [...before, data].flat());
          });
        })
        .flat()
    );
  }, [exchanges]);
  return (
    <div>
      {<IndexPage currentTickers={currentTickers} exchanges={exchanges} />}
    </div>
  );
};

export default App;
