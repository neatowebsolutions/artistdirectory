import useSWR from 'swr';
import fetcher from './fetcher';

const useCategories = () => {
  const { data: categories, error: categoriesError } = useSWR(
    `/categories`,
    fetcher,
    {
      revalidateOnFocus: false
    }
  );
  const categoriesLoading = !categories && !categoriesError;

  return {
    categories,
    categoriesLoading,
    categoriesError
  };
};

export default useCategories;
