import useSWR from 'swr';
import { useHttpClient } from '@template/react-hooks';

const useProducts = () => {
  const { httpClient } = useHttpClient();

  const {
    data: products,
    error: productsError,
    mutate: fetchProducts
  } = useSWR(`/products`, httpClient.get.bind(httpClient), {
    revalidateOnFocus: false
  });
  const productsLoading = !products && !productsError;

  return {
    products,
    productsLoading,
    productsError,
    fetchProducts
  };
};

export default useProducts;
