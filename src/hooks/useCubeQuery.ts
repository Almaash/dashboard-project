import { useEffect, useState } from 'react';
import cubejsApi from '../cubeClient';
interface CubeQueryHookResult {
  loading: boolean;
  data: any | null;
  error: Error | null;
}

const useCubeQuery = (query: string): CubeQueryHookResult => {
  // State for handling fetched data
  const [data, setData] = useState<any | null>(null);
  // State for loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State for error handling
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    /**
     * Fetches data from Cube.js API based on the provided query.
     */
    const fetchData = async () => {
      try {
        setLoading(true);
        // Parse the JSON string into an object
        const parsedQuery = JSON.parse(query);
        // Load data from Cube.js API
        const response = await cubejsApi.load(parsedQuery);
        setData(response);
      } catch (err) {
        // Handle any errors that occur during fetching
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]); // Re-run effect when the query changes

  return { loading, data, error };
};

export default useCubeQuery;