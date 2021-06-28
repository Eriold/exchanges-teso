import React, { useEffect, useState } from "react";
import { exchange, ids } from "./constants/exchange";
import { IndexPage } from "pages/IndexPage";
import {
  getExchange,
  getCurrentExchange,
  getCurrentGlobal
} from "api/coingecko";

export const App = () => {
  const [exchanges, setExchanges] = useState([]);
  const [currentTickers, setCurrentTickers] = useState([]);
  const [current, setCurrent] = useState([]);

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
    changeCurrent();
    setInterval(() => {
      setCurrent([]);
      changeCurrent();
    }, 300000);
    // }, 20000)
  }, []);

  const changeCurrent = () => {
    Promise.all(
      ids
        .map(async (item) => {
          getCurrentGlobal(item).then((data) => {
            setCurrent((before) => [...before, data]);
          });
        })
        .flat()
    );
  };

  useEffect(() => {
    changeExchanges();
    setInterval(() => {
      setCurrentTickers([]);
      changeExchanges();
    }, 300000);
  }, []);

  const changeExchanges = () => {
    Promise.all(
      exchange
        .map(async (item) => {
          getCurrentExchange(item).then((data) => {
            setCurrentTickers((before) => [...before, data].flat());
          });
        })
        .flat()
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      {
        <IndexPage
          currentTickers={currentTickers}
          exchanges={exchanges}
          current={current}
        />
      }
    </div>
  );
};

export default App;
