import { useEffect, useState } from "react";

const useFetchingData = (): { data: Data[]; loading: boolean } => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    try {
      const response = await fetch("/data.json");
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  });
  return { data, loading };
};

export default useFetchingData;
