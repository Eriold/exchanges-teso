import React, { useEffect, useState } from "react";
import {
  exchange,
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
    }, 100);
  }, []);

  useEffect(() => {
    changeCurrent();
    setInterval(() => {
      setCurrent([]);
      changeCurrent();
    }, 300000);
    // }, 20000)
  }, []);


  // //Crytos
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
    // setInterval(() => {
    //   setCurrentTickers([]);
    //   changeExchanges();
    // }, 400000);
  }, []);

  // Exchanges
  const changeExchanges = () => {

    exchange.map((item, index) => 
      setTimeout(()=> {
          getCurrentExchange(item.name, item.page, item.target).then((data) => {
            setCurrentTickers((before) => [...before, data].flat())
          })
      },6500*index)
    )
    // setTimeout(() => {
    //   Promise.race(
    //     exchangeFutures
    //       .map(async (item) => {
    //         getCurrentExchangeFutures(item).then((data) => {
    //           setCurrentTickers((before) => [...before, data].flat());
    //         });
    //       })
    //       .flat()
    //   );
    // }, 5000);

    exchangeFutures.map((item, index) => 
      setTimeout(() => {
        getCurrentExchangeFutures(item).then((data) => {
          setCurrentTickers((before) => [...before, data].flat())
        })
      },4000*index)
    )
  };

  return (
    <div style={{ textAlign: "center" }}>
      {console.log("currentTickers", currentTickers)}
      <IndexPage
        currentTickers={currentTickers}
        exchanges={exchanges}
        current={current}
      />
    </div>
  );
};

export default App;
