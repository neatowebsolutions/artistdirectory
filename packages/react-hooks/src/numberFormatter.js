import { useMemo, useCallback } from 'react';

const useNumberFormatter = ({ locale, countryCode, currency }) => {
  const numberFormatter = useMemo(() => {
    if (!locale || !countryCode) {
      return;
    }

    return new Intl.NumberFormat(`${locale}-${countryCode}`);
  }, [locale, countryCode]);

  const currencyFormatter = useMemo(() => {
    if (!locale || !countryCode || !currency) {
      return;
    }

    return new Intl.NumberFormat(`${locale}-${countryCode}`, {
      style: 'currency',
      currency
    });
  }, [locale, countryCode, currency]);

  const formatNumber = useCallback(
    (value, decimals = 2) => {
      if (numberFormatter?.format) {
        return (
          numberFormatter.format(
            Math.round(parseFloat(value) * 10 ** decimals) / 10 ** decimals
          ) || value
        );
      }

      return value;
    },
    [numberFormatter]
  );

  const formatCurrency = useCallback(
    (value) => {
      if (currencyFormatter?.format) {
        return currencyFormatter.format(value) || value;
      }

      return value;
    },
    [currencyFormatter]
  );

  const getCurrencySymbol = useCallback(() => {
    const parts = currencyFormatter?.formatToParts(currency);
    const currencyPart = parts?.find(({ type }) => type === 'currenct');
    const currencySymbol = currencyPart?.value;

    return currencySymbol || '$';
  }, [currency, currencyFormatter]);

  const formatPercentage = useCallback(
    (value, decimals = 2) => {
      if (numberFormatter?.format) {
        const formattedValue =
          Math.round(parseFloat(value) * 100 * 10 ** decimals) / 10 ** decimals;

        return typeof formattedValue === 'number'
          ? `${numberFormatter.format(formattedValue)}%`
          : value;
      }

      return value;
    },
    [numberFormatter]
  );

  return { formatNumber, formatCurrency, getCurrencySymbol, formatPercentage };
};

export default useNumberFormatter;
