## Solution 1

<!-- App -->

import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";
const BASE_URL = "https://api.exchangeratesapi.io/latest";
function App() {
const [currencyOptions, setCurrencyOptions] = useState([]);
useEffect(() => {
fetch(BASE_URL)
.then(res => res.json())
.then(data => {
setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
});
}, []);
return (
<>

 <h1>Convert</h1>
 <CurrencyRow currencyOptions={currencyOptions} />
 <div className="equals">=</div>
 <CurrencyRow currencyOptions={currencyOptions} />
 </>
 );
 }
 export default App;
  <!-- CurrencyRow.js -->
 import React from "react";
 const CurrencyRow = props => {
 const { currencyOptions } = props;
 return (
 <div>
 <input type="number" className="input" />
 <select>
 {currencyOptions.map(option => {
 return (
 <option key={option} value={option}>
 {option}
 </option>
 );
 })}
 </select>
 </div>
 );
 };
 export default CurrencyRow;

## Step 2

<!-- app.js -->

import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";

const BASE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
const [currencyOptions, setCurrencyOptions] = useState([]);
const [fromCurrency, setFromCurrency] = useState();
const [toCurrency, setToCurrency] = useState();
useEffect(() => {
fetch(BASE_URL)
.then(res => res.json())
.then(data => {
const firstCurrency = Object.keys(data.rates)[0];
setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
setFromCurrency(data.base);
setToCurrency(firstCurrency);
});
}, []);
return (
<>

<h1>Convert</h1>
<CurrencyRow
currencyOptions={currencyOptions}
selectedCurrency={fromCurrency}
onChangeCurrency={e => setFromCurrency(e.target.value)}
/>
<div className="equals">=</div>
<CurrencyRow
currencyOptions={currencyOptions}
selectedCurrency={toCurrency}
onChangeCurrency={e => setToCurrency(e.target.value)}
/>
</>
);
}

export default App;

<!-- CurrencyRow.js -->

import React from "react";

const CurrencyRow = props => {
const { currencyOptions, selectedCurrency, onChangeCurrency } = props;

return (

<div>
<input type="number" className="input" />
<select value={selectedCurrency} onChange={onChangeCurrency}>
{currencyOptions.map(option => {
return (
<option key={option} value={option}>
{option}
</option>
);
})}
</select>
</div>
);
};

export default CurrencyRow;

## Step3

<!-- App.js -->

import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";

const BASE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
const [currencyOptions, setCurrencyOptions] = useState([]);
const [fromCurrency, setFromCurrency] = useState();
const [toCurrency, setToCurrency] = useState();
const [exchangeRate, setExchangeRate] = useState();
const [amount, setAmount] = useState(1);
const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

let toAmount, fromAmount;
if (amountInFromCurrency) {
fromAmount = amountInFromCurrency;
toAmount = amount \* exchangeRate;
} else {
toAmount = amount;
fromAmount = amount / exchangeRate;
}

useEffect(() => {
fetch(BASE_URL)
.then(res => res.json())
.then(data => {
const firstCurrency = Object.keys(data.rates)[0];
setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
setFromCurrency(data.base);
setToCurrency(firstCurrency);
setExchangeRate(data.rates[firstCurrency]);
});
}, []);
return (
<>

<h1>Convert</h1>
<CurrencyRow
currencyOptions={currencyOptions}
selectedCurrency={fromCurrency}
onChangeCurrency={e => setFromCurrency(e.target.value)}
amount={fromAmount}
/>
<div className="equals">=</div>
<CurrencyRow
currencyOptions={currencyOptions}
selectedCurrency={toCurrency}
onChangeCurrency={e => setToCurrency(e.target.value)}
amount={toAmount}
/>
</>
);
}

export default App;

<!-- CurrencyRow -->

import React from "react";

const CurrencyRow = props => {
const { currencyOptions, selectedCurrency, onChangeCurrency, amount } = props;

return (

<div>
<input type="number" className="input" value={amount} />
<select value={selectedCurrency} onChange={onChangeCurrency}>
{currencyOptions.map(option => {
return (
<option key={option} value={option}>
{option}
</option>
);
})}
</select>
</div>
);
};

export default CurrencyRow;

## Solution 4

<!-- CurrencyRow -->

import React from "react";

const CurrencyRow = props => {
const { currencyOptions, selectedCurrency, onChangeCurrency, amount, onChangeAmount } = props;

return (

<div>
<input type="number" className="input" value={amount} onChange={onChangeAmount} />
<select value={selectedCurrency} onChange={onChangeCurrency}>
{currencyOptions.map(option => {
return (
<option key={option} value={option}>
{option}
</option>
);
})}
</select>
</div>
);
};

export default CurrencyRow;

<!-- App -->

import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";

const BASE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
const [currencyOptions, setCurrencyOptions] = useState([]);
const [fromCurrency, setFromCurrency] = useState();
const [toCurrency, setToCurrency] = useState();
const [exchangeRate, setExchangeRate] = useState();
const [amount, setAmount] = useState(1);
const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

let toAmount, fromAmount;
if (amountInFromCurrency) {
fromAmount = amount;
toAmount = amount \* exchangeRate;
} else {
toAmount = amount;
fromAmount = amount / exchangeRate;
}

useEffect(() => {
fetch(BASE_URL)
.then(res => res.json())
.then(data => {
const firstCurrency = Object.keys(data.rates)[0];
setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
setFromCurrency(data.base);
setToCurrency(firstCurrency);
setExchangeRate(data.rates[firstCurrency]);
});
}, []);

function handleFromAmountChange(e) {
setAmount(e.target.value);
setAmountInFromCurrency(true);
}
function handleToAmountChange(e) {
setAmount(e.target.value);
setAmountInFromCurrency(false);
}

return (
<>

<h1>Convert</h1>
<CurrencyRow
currencyOptions={currencyOptions}
selectedCurrency={fromCurrency}
onChangeCurrency={e => setFromCurrency(e.target.value)}
onChangeAmount={handleFromAmountChange}
amount={fromAmount}
/>
<div className="equals">=</div>
<CurrencyRow
currencyOptions={currencyOptions}
selectedCurrency={toCurrency}
onChangeCurrency={e => setToCurrency(e.target.value)}
onChangeAmount={handleToAmountChange}
amount={toAmount}
/>
</>
);
}

export default App;

## Solution 5

<!-- App -->

import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";

const BASE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
const [currencyOptions, setCurrencyOptions] = useState([]);
const [fromCurrency, setFromCurrency] = useState();
const [toCurrency, setToCurrency] = useState();
const [exchangeRate, setExchangeRate] = useState();
const [amount, setAmount] = useState(1);
const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

let toAmount, fromAmount;
if (amountInFromCurrency) {
fromAmount = amount;
toAmount = amount \* exchangeRate;
} else {
toAmount = amount;
fromAmount = amount / exchangeRate;
}

useEffect(() => {
fetch(BASE_URL)
.then(res => res.json())
.then(data => {
const firstCurrency = Object.keys(data.rates)[0];
setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
setFromCurrency(data.base);
setToCurrency(firstCurrency);
setExchangeRate(data.rates[firstCurrency]);
});
}, []);

useEffect(() => {
if (fromCurrency != null && toCurrency != null) {
fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
.then(res => res.json())
.then(data => setExchangeRate(data.rates[toCurrency]));
}
}, [fromCurrency, toCurrency]);

function handleFromAmountChange(e) {
setAmount(e.target.value);
setAmountInFromCurrency(true);
}
function handleToAmountChange(e) {
setAmount(e.target.value);
setAmountInFromCurrency(false);
}

return (
<>
<h1>Convert</h1>
<CurrencyRow
currencyOptions={currencyOptions}
selectedCurrency={fromCurrency}
onChangeCurrency={e => setFromCurrency(e.target.value)}
onChangeAmount={handleFromAmountChange}
amount={fromAmount}
/>
<div className="equals">=</div>
<CurrencyRow
currencyOptions={currencyOptions}
selectedCurrency={toCurrency}
onChangeCurrency={e => setToCurrency(e.target.value)}
onChangeAmount={handleToAmountChange}
amount={toAmount}
/>
</>
);
}

export default App;

<!-- CurrencyRow -->

import React from "react";

const CurrencyRow = props => {
const { currencyOptions, selectedCurrency, onChangeCurrency, amount, onChangeAmount } = props;

return (
<div>
<input type="number" className="input" value={amount} onChange={onChangeAmount} />
<select value={selectedCurrency} onChange={onChangeCurrency}>
{currencyOptions.map(option => {
return (
<option key={option} value={option}>
{option}
</option>
);
})}
</select>
</div>
);
};

export default CurrencyRow;
