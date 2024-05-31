import axios from 'axios';
import { useState, useEffect } from 'react';
import dummyData from './data';

export const useFetch = ( endpoint, query ) => {
  const [data, setData] = useState( [] );
  const [isLoading, setIsLoading] = useState( false );
  const [error, setError] = useState( null );

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f6304d4544msh77df1e0b3226df9p1f3a81jsn362fdc6098af',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading( true );
    try {
      if ( endpoint == 'search') {
        setData( dummyData );
      } else {
        const response = await axios.request( options );
        setData( response.data.data );
      }
    } catch ( err ) {
      setError( err );
      console.log( err );
      alert( 'there is an error', err );
    } finally {
      setIsLoading( false );
    }
  }
  useEffect( () => {
    fetchData();
  }, [] )

  const refetch = () => {
    setIsLoading( true );
    fetchData();
  }

  return { data, isLoading, error, refetch };
};
