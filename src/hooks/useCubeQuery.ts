import { useEffect, useState } from 'react';
import cubejsApi from '../cubeClient';

interface CubeQueryHookResult {
  loading: boolean;
  data: any | null;
  error: Error | null;
}

const useCubeQuery = (query: string): CubeQueryHookResult => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const parsedQuery = JSON.parse(query); // Convert stringified JSON to an object
        const response = await cubejsApi.load(parsedQuery);
        setData(response);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return { loading, data, error };
};

export default useCubeQuery;
