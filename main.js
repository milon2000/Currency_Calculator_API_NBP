const amountInput = document.querySelector('input');
const ownedCurrency = document.getElementById('from');
const arrow = document.getElementById('arrow');
const newCurrency = document.getElementById('to');
const buttonOut = document.getElementById('out');
const result = document.querySelector('output');

function createOptions() {
  let data = "";
  obj = {
    'USD': 'USD - US Dollar',
    'THB': 'THB - Baht',
    'AUD': 'AUD - Australian Dollar',
    'HKD': 'HKD - Hong Kong Dollar',
    'CAD': 'CAD - Canadian Dollar',
    'NZD': 'NZD - New Zealand Dollar',
    'SGD': 'SGD - Singapore Dollar',
    'EUR': 'EUR - Euro',
    'HUF': 'HUF - Forint',
    'CHF': 'HF - Swiss Franc',
    'GBP': 'GBP - British Pound',
    'UAH': 'UAH - Hryvnia',
    'JPY': 'JPY - Yen',
    'CZK': 'CZK - Czech Koruna',
    'DKK': 'DKK - Danish Krone',
    'ISK': 'ISK - Iceland Krona',
    'NOK': 'NOK - Norwegian Krone',
    'SEK': 'SEK - Swedish Krona',
    'HRK': 'HRK - Kuna',
    'RON': 'RON - Romanian Leu',
    'BGN': 'BGN - Bulgarian Lev',
    'TRY': 'TRY - Turkish Lira',
    'ILS': 'ILS - New Israeli Shekel',
    'CLP': 'CLP - Chilean Peso',
    'MXN': 'MXN - Mexican Peso',
    'PHP': 'PHP - Philippine Piso',
    'ZAR': 'ZAR - Rand',
    'BRL': 'BRL - Brazilian Real',
    'MYR': 'MYR - Malaysian Ringgit',
    'RUB': 'RUB - Russian Ruble',
    'IDR': 'IDR - Rupiah',
    'INR': 'INR - Indian Rupee',
    'KRW': 'KRW - Won',
    'CNY': 'CNY - Yuan Renminbi',
    'XDR': 'SDR Int\'l Monetary Fund (I.M.F.)'
  }
  for (const key in obj) {
    data += "<option value=" + key + ">" + obj[key] + "</option>"
  }
  ownedCurrency.innerHTML = data;
  newCurrency.innerHTML = data;
}
createOptions();

function getCurrency() {
  fetch('http://api.nbp.pl/api/exchangerates/tables/a/?format=json')
    .then(resp => resp.json())
    .then(resp => {
      let rates = resp[0].rates;
      let ownedCurrencyValue = ownedCurrency[ownedCurrency.selectedIndex].value;
      let newCurrencyValue = newCurrency[newCurrency.selectedIndex].value;
      let codeOwnedCurrency = rates.find(o => o.code === ownedCurrencyValue);
      let codeNewCurrency = rates.find(o => o.code === newCurrencyValue);
      let inputValue = amountInput.value;
      result.innerHTML = inputValue + ' ' + ownedCurrencyValue + ' = ' + (inputValue * codeOwnedCurrency.mid / codeNewCurrency.mid).toFixed(2) + ' ' + newCurrencyValue;
    })
}
getCurrency();

function inverse() {
  let inverseOwnedCurrency = ownedCurrency[ownedCurrency.selectedIndex].value;
  let inverseNewCurrency = newCurrency[newCurrency.selectedIndex].value;
  let newArr = [];
  newArr.push(inverseOwnedCurrency, inverseNewCurrency);
  ownedCurrency.value = newArr[1];
  newCurrency.value = newArr[0];
}

buttonOut.addEventListener('click', getCurrency);
arrow.addEventListener('click', inverse)
