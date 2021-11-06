import useSWR, { mutate } from 'swr';
import { useHttpClient } from '@artistdirectory/react-hooks';

const useProduct = (id) => {
  const { httpClient } = useHttpClient();

  const { data: product, error: productError } = useSWR(
    id ? `/products/${id}` : null,
    httpClient.get.bind(httpClient),
    {
      revalidateOnFocus: false
    }
  );
  const productLoading = !product && !productError;

  const saveProduct = async (data) => {
    const isNew = !data._id;
    const url = isNew ? '/products' : `/products/${data._id}`;
    let updatedData = null;

    if (isNew) {
      // Use a different key than the URL here to avoid a cache conflict with GET /products.
      updatedData = await httpClient.post(url, data);
    } else {
      updatedData = await mutate(url, httpClient.put(url, data));
    }

    return updatedData;
  };

  return {
    product,
    productLoading,
    productError,
    saveProduct
  };
};

export default useProduct;
