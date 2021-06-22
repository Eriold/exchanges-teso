import React, { useEffect, useState } from "react";
import useFetchExhange from "./hooks/useFetch";
import { exchange } from "./constants/exchange";
import { IndexPage } from "pages/IndexPage";
import getExchange from "api/coingecko";

export const App = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    Promise.all(
      exchange.map(async (item) => {
        getExchange(item).then((data) => {
          setState((before) => [...before, data]);
        });
      })
    );
  }, []);

  return (
    <div>
      {<IndexPage newArray={state} />}
      none
    </div>
  );
};

export default App;
