import React, { useEffect, useState } from "react";
import { exchange, ids, exchangeFutures } from "./constants/exchange";
import { IndexPage } from "pages/IndexPage";
import {
  getExchange,
  getCurrentExchange,
  getCurrentGlobal,
  getCurrentExchangeFutures
} from "api/coingecko";

export const App = () => {
  const [exchanges, setExchanges] = useState([]);
  const [currentTickers, setCurrentTickers] = useState([]);
  const [current, setCurrent] = useState([]);

  useEffect(() => {
    Promise.all(
      exchange.map(async (item) => {
        getExchange(item.name).then((data) => {
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
          setTimeout(() => {

            getCurrentGlobal(item).then((data) => {
              setCurrent((before) => [...before, data]);
            });
          }, 2500)
        })
        .flat()
    );
  };

  useEffect(() => {
    changeExchanges();
    setInterval(() => {
      setCurrentTickers([]);
      changeExchanges();
    }, 400000);
  }, []);

  const changeExchanges = () => {
    Promise.all(
      exchange
        .map(async (item) => {
          getCurrentExchange(item.name, item.page).then((data) => {
            setCurrentTickers((before) => [...before, data].flat());
          });
        })
        .flat()
    );
    Promise.all(
      exchangeFutures
        .map(async (item) => {
          getCurrentExchangeFutures(item).then((data) => {
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
