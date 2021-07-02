import React, { useEffect, useState } from "react";
import {
  exchange,
  exchange1,
  exchange2,
  ids,
  exchangeFutures
} from "./constants/exchange";
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


  //Logos
  useEffect(() => {
    setTimeout(() => {
      Promise.all(
        exchange.map(async (item) => {
          getExchange(item.name).then((data) => {
            setExchanges((before) => [...before, data]);
          });
        })
      );
    }, 28000);
  }, []);

  useEffect(() => {
    changeCurrent();
    setInterval(() => {
      setCurrent([]);
      changeCurrent();
    }, 300000);
    // }, 20000)
  }, []);


  //Crytos
  const changeCurrent = () => {
    setTimeout(() => {
      Promise.all(
        ids
          .map(async (item) => {
            getCurrentGlobal(item).then((data) => {
              setCurrent((before) => [...before, data]);
            });
          })
          .flat()
      );
    }, 6500);
  };

  useEffect(() => {
    changeExchanges();
    setInterval(() => {
      setCurrentTickers([]);
      changeExchanges();
    }, 400000);
  }, []);

  // Exchanges
  const changeExchanges = () => {
    Promise.race(
      exchange1
        .map(async (item) => {
          getCurrentExchange(item.name, item.page).then((data) => {
            setCurrentTickers((before) => [...before, data].flat());
          });
        })
        .flat()
    );
    setTimeout(() => {
      Promise.race(
        exchangeFutures
          .map(async (item) => {
            getCurrentExchangeFutures(item).then((data) => {
              setCurrentTickers((before) => [...before, data].flat());
            });
          })
          .flat()
      );
    }, 5000);

    setTimeout(() => {
      Promise.race(
        exchange2
          .map(async (item) => {
            getCurrentExchange(item.name, item.page).then((data) => {
              setCurrentTickers((before) => [...before, data].flat());
            });
          })
          .flat()
      );
    }, 20000);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <IndexPage
        currentTickers={currentTickers}
        exchanges={exchanges}
        current={current}
      />
    </div>
  );
};

export default App;
