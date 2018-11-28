const formatters = {
  SEK: amount => `${amount}kr`,
  GBP: amount => `£${amount}`,
  EUR: amount => `${amount} €`,
  USD: amount => `$${amount}`,
  CAD: amount => `$${amount} CAD`,
  AUD: amount => `$${amount} AUD`,
};

export function formatCurrency({ amount, currency }) {
  const uppercase = currency.toUpperCase();
  const formattedAmount = format({ amount });

  return formatters[uppercase](formattedAmount);
}

function format({ numDecimals = 2, amount = 0 }) {
  return parseFloat(Math.abs(amount), 10).toFixed(numDecimals);
}
