import React, { useEffect, useState } from "react";
import useApiCalls from "../customHooks/apiCalls";
import socketIOClient, { io } from "socket.io-client";

const ENDPOINT = "wss://production-esocket.delta.exchange";

const Home = () => {
  const [page, setPage] = useState(1);
  const {
    data: { data, isLoading },
    fetchData,
  } = useApiCalls();

  useEffect(() => {
    fetchData();
    // const socket = socketIOClient("wss://production-esocket.delta.exchange");
    // socket.on("connect", () => {
    //   console.log(socket.id);
    // });
    // const socket = socketIOClient(ENDPOINT);
    // socket.emit("v2/ticker", data => {
    //     console.log(data,':data');
    //   });
    // return () => socket.disconnect();
  }, []);

  console.log(data, "::data");

  const handlePrev = () => {
    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  if (isLoading) {
    return (
      <div className="mt-5 d-flex justify-content-center">
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark">
      <table className="table table-dark table-striped text-center">
        <thead className="bg-dark text-white">
          <th>S.no.</th>
          <th>Symbol</th>
          <th>Description</th>
          <th>Underlying Asset</th>
          <th>Mark Price</th>
        </thead>
        <tbody>
          {data &&
            data.length &&
            data.map((val, index) => {
              if (index <= page * 15 && index > (page - 1) * 15)
                return (
                  <tr key={val.id}>
                    <td>{index + 1}</td>
                    <td>{val.symbol}</td>
                    <td>{val.description}</td>
                    <td>{val.underlying_asset.name}</td>
                    <td>{val.strike_price}</td>
                  </tr>
                );
            })}
        </tbody>
      </table>
      <div className="d-flex justify-content-evenly py-2">
        <button
          className="btn btn-primary btn-pill"
          onClick={handlePrev}
          disabled={page <= 1}
        >
          Prev
        </button>
        <p className="bg-primary text-white">{page}</p>
        <button
          className="btn btn-primary btn-pill"
          onClick={handleNext}
          disabled={page * 15 > data.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
