window.onload = function() {
  const amountInput = document.querySelector('input');
  const ownedCurrency = document.getElementById('from');
  const arrow = document.getElementById('arrow');
  const newCurrency = document.getElementById('to');
  const buttonOut = document.getElementById('out');
  const result = document.querySelector('output');

  const alphabetically = Object.keys(obj).sort();

  const popular = alphabetically.sort(function(a, b) {
    if (a == 'NOK' || a == 'EUR' || a == 'USD' || a == 'GBP') {
      return -1;
    } else {
      return 0;
    }
  })

  const sorted = popular.reduce(function(acc, key) {
    acc[key] = obj[key];
    return acc;
  }, {});

  function createOptions() {
    let data = "";
    for (const key in sorted) {
      data += "<option value=" + key + ">" + sorted[key] + "</option>"
    }
    ownedCurrency.innerHTML = data;
    newCurrency.innerHTML = data;
  }
  createOptions();

  function rates() {
    fetch('https://api.nbp.pl/api/exchangerates/tables/a/?format=json')
      .then(resp => resp.json())
      .then(resp => {
        const rates = resp[0].rates;
        const ownedCurrencyValue = ownedCurrency[ownedCurrency.selectedIndex].value;
        const newCurrencyValue = newCurrency[newCurrency.selectedIndex].value;
        const codeOwnedCurrency = rates.find(o => o.code === ownedCurrencyValue);
        const codeNewCurrency = rates.find(o => o.code === newCurrencyValue);
        const inputValue = amountInput.value;
        result.innerHTML = inputValue + ' ' + ownedCurrencyValue + ' = ' + (inputValue * codeOwnedCurrency.mid / codeNewCurrency.mid).toFixed(2) + ' ' + newCurrencyValue;
      })
  }
  rates();

  function inverse() {
    const inverseOwnedCurrency = ownedCurrency[ownedCurrency.selectedIndex].value;
    const inverseNewCurrency = newCurrency[newCurrency.selectedIndex].value;
    const newArr = [];
    newArr.push(inverseOwnedCurrency, inverseNewCurrency);
    ownedCurrency.value = newArr[1];
    newCurrency.value = newArr[0];
  }

  buttonOut.addEventListener('click', rates);
  arrow.addEventListener('click', inverse);
}
