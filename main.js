let input = document.querySelector('input');
let select1 = document.getElementById('from');
let arrow = document.getElementById('arrow');
let select2 = document.getElementById('to');
let buttonOut = document.getElementById('out');
let result = document.querySelector('output');

function getCurrency() {
  fetch('http://api.nbp.pl/api/exchangerates/tables/a/?format=json')
    .then(resp => resp.json())
    .then(resp => {
      let k = resp[0].rates;
      let value1 = select1[select1.selectedIndex].value;
      let value2 = select2[select2.selectedIndex].value;
      let obj = k.find(o => o.code === value1);
      let obj2 = k.find(o => o.code === value2);
      let inputValue = input.value;
      result.innerHTML = inputValue + ' ' + value1 + ' = ' + (inputValue * obj.mid / obj2.mid).toFixed(2) + ' ' + value2;
    })

}
getCurrency();

function inverse() {
  let value3 = select1[select1.selectedIndex].value;
  let value4 = select2[select2.selectedIndex].value;
  console.log(value3, value4);
  let newArr = [];
  newArr.push(value3, value4);
  select1.value = newArr[1];
  select2.value = newArr[0];
}

buttonOut.addEventListener('click', getCurrency);
arrow.addEventListener('click', inverse)
