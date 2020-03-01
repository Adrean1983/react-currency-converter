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
