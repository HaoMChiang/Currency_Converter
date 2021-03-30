import { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

const BASE_URL = 'https://api.exchangeratesapi.io/latest'

function App() {

  const [currencyOptions, setCurrencyOption] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [isFromAmount, setIsFromAmount] = useState(true);

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOption([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      })
  }, [])

  useEffect(() => {
    if(fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  let toAmount, fromAmount
  if(isFromAmount) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  function handleFromAmount(e) {
    setAmount(e.target.value);
    setIsFromAmount(true);
  }

  function handleToAmount(e) {
    setAmount(e.target.value);
    setIsFromAmount(false);
  }

  return (
    <div>
      <h1 className="header">Convert</h1>
      <CurrencyRow
        currencyOptions={ currencyOptions }
        selectCurrency={ fromCurrency }
        onChangeCurrency={ e => setFromCurrency(e.target.value) }
        onChangeAmount={ handleFromAmount }
        amount={ fromAmount }/>
      <div className="equalSign">=</div>
      <CurrencyRow
        currencyOptions={ currencyOptions }
        selectCurrency={ toCurrency }
        onChangeCurrency={ e => setToCurrency(e.target.value) }
        onChangeAmount={ handleToAmount }
        amount={ toAmount }/>
    </div>
  );
}

export default App;
