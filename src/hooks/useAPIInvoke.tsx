import axios from 'axios';
import { useCallback, useState } from 'react';
import { IResponse } from '../interface/Response';

type Resource = {
  url?: string;
  method?: string;
};
type Response = {
  status: number;
  data: IResponse;
};

const useAPIInvoke = () => {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [response, setResponse] = useState<Response>({
    status: 0,
    data: {
      articles: [],
      status: '',
      totalResults: 0,
    },
  });

  const invokeService = useCallback(async ({ url, method }: Resource) => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: `${url}&apiKey=${apiKey}`,
        method,
      });
      setResponse(response);
    } catch (error) {
      setIsError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    isError,
    response,
    invokeService,
  };
};

export default useAPIInvoke;
