window.onload = function() {
  const amountInput = document.querySelector('input');
  const ownedCurrency = document.getElementById('from');
  const arrow = document.getElementById('arrow');
  const newCurrency = document.getElementById('to');
  const buttonOut = document.getElementById('out');
  const result = document.querySelector('output');

  function createOptions() {
    let data = "";
    for (const key in obj) {
      data += "<option value=" + key + ">" + obj[key] + "</option>"
    }
    ownedCurrency.innerHTML = data;
    newCurrency.innerHTML = data;
  }
  createOptions();

  function rates() {
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
  rates();

  function inverse() {
    let inverseOwnedCurrency = ownedCurrency[ownedCurrency.selectedIndex].value;
    let inverseNewCurrency = newCurrency[newCurrency.selectedIndex].value;
    let newArr = [];
    newArr.push(inverseOwnedCurrency, inverseNewCurrency);
    ownedCurrency.value = newArr[1];
    newCurrency.value = newArr[0];
  }

  buttonOut.addEventListener('click', rates);
  arrow.addEventListener('click', inverse)
}
