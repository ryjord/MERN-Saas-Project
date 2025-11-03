// ApiTestComponent.jsx
import React, { useEffect } from 'react';
import { useGetProductsQuery } from './path-to-your-api-file';

const ApiTestComponent = () => {
  const { data, error, isLoading, isSuccess, isError } = useGetProductsQuery();

  useEffect(() => {
    console.log('API Test Component Mounted');
    console.log('Loading:', isLoading);
    console.log('Success:', isSuccess);
    console.log('Error:', error);
    console.log('Data:', data);
  }, [data, error, isLoading, isSuccess]);

  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Error: {error?.data?.message || 'Unknown error'}</div>;
  if (isSuccess) return <div>Products loaded successfully! Count: {data?.length}</div>;

  return <div>Initializing...</div>;
};

export default ApiTestComponent;