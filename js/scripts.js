const CARD_BUTTONS = document.querySelectorAll(".goods__button");
const CARDS = document.querySelectorAll(".goods");
const CLEAR_BUTTON = document.querySelector(".cart__clean");
const SAVE_BUTTON = document.querySelector(".cart__save");
const CART_SUM_VALUE = document.querySelector(".cart__sum-value");
const CART_AMOUNT_VALUE = document.querySelector(".cart__amount-value");

function removeCard(e) {
  let card = e.srcElement.parentNode;
  card.remove();
  cartSumm();
}

function removeCards() {
  CARDS.forEach(card => {
    card.remove();
    cartSumm();
  });
}

function cartRequest() {
  return promis = fetch("/goods.json").then(function (response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    }

    return Promise.reject(new Error(response.statusText));
  }).catch(err => Promise.reject(new Error(err)));
}

function saveCart() {
  cartRequest().then(response => {
    console.log(response);

    if (response.ok) {
      alert("Успех!");
    } else {
      alert("Неудача");
    }
  });
}

function cartSumm() {
  const CARDS_PRICE = document.querySelectorAll(".goods__prise");
  let priceArr = [];
  let sum = 0;
  let quantity = 0;
  CARDS_PRICE.forEach(price => {
    let priceNoRub = price.innerText.slice(0, price.innerText.indexOf("₽")).replace(" ", "");
    priceArr.push(priceNoRub);
  });
  priceArr.forEach(item => {
    sum = sum + parseInt(item);

    if (item !== "") {
      quantity++;
    }
  });
  CART_SUM_VALUE.innerHTML = sum.toLocaleString("ru") + " ₽";
  CART_AMOUNT_VALUE.innerHTML = quantity;
}

CARD_BUTTONS.forEach(button => {
  button.addEventListener("click", e => {
    removeCard(e);
  }, false);
});
CLEAR_BUTTON.addEventListener("click", () => {
  removeCards();
}, false);
SAVE_BUTTON.addEventListener("click", e => {
  saveCart();
}, false);
cartSumm();