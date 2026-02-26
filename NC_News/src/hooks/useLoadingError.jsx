import { useEffect, useState } from "react";

function useLoadingError(getFunction, opitons={})
{
    const {dependencies = [], params = []} = opitons;
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)
    useEffect(() => {
    setIsLoading(true);
    setError(false);
    setData(null);
    getFunction(...params)
      .then((data) => {
        setData(data);
      })
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));
  }, [...dependencies]);
  return {data, isLoading, error};
}

export default useLoadingError;