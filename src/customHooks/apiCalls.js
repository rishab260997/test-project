import { useState } from "react";
import axios from "axios";

const useApiCalls = () => {
  const [data, setData] = useState({
    isLoading: false,
    data: [],
  });

  const fetchData = async () => {
    setData({ ...data, isLoading: true });
    try {
      let response = await axios.get("https://api.delta.exchange/v2/products");
      if (response && response.data && response.data.result) {
        setData({ ...data, data: response.data.result, isLoading: false });
      }
    } catch (error) {
      setData({ ...data, isLoading: false });
      throw error;
    }
  };

  return {
    data,
    fetchData,
  };
};

export default useApiCalls;
