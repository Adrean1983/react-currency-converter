## Step 1

StartTime: 9.21
EndTIme: 14.15
Fetch data from the API and set the state currencyOptions. Only call this date the first time it loads. Include the base option default EUR and the keys of rates.
Pass this data to CurrencyRow
Use map function to map over options Currency Row

## Step 2

StartTime: 14.30
EndTIme: 18:15
Make a default currency selected for each input. Make state from fromCurrency and toCurrency
In the useEffect use the API call to set the state for both intially and pass down to CurrencyRow in the Select tag.
Make an onChange function to be able to change the selects, this should update the to and from currency states

## Step 3

StartTime: 18:15
EndTIme: 21:45
Create a state for amounts. Amount. Make default 1.
Make a state amountInFromCurrency and exchangeRate.
In the initial useEffect set the first currency.
let toAmount, fromAmount;
if (amountInFromCurrency) {
fromAmount = amountInFromCurrency;
toAmount = amount \* exchangeRate;
} else {
toAmount = amount;
fromAmount = amount / exchangeRate;
}
Pass these above values down as amount to CurrencyRow and set to the value to display

## Step 4

StartTime: 21:50
EndTIme:
