import React from 'react';

const CurrencyRow = (props) => {
    const { currencyOptions, selectCurrency, onChangeCurrency, onChangeAmount, amount } = props; 
    return (
        <div>
            <input className="input" type="number" value={ amount } onChange={ onChangeAmount }/>
            <select className="sel" value={ selectCurrency } onChange={ onChangeCurrency }>
                {currencyOptions.map(option => (
                    <option key={ option } value={ option }>{ option }</option>
                ))}
            </select>
        </div>
    );
};

export default CurrencyRow;