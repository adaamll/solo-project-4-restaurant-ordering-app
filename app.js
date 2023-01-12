import { menuArray } from './data.js';

const itemContainer = document.getElementById('menu-item-container');
const orderDetails = document.getElementById('order-details');
const modal = document.getElementById('modal');
const confirmationMessage = document.getElementById('order-confirmation');
const username = document.getElementById('input-name');

let orderedItems = [];

document.addEventListener('click', (e) => {
  if (e.target.dataset.item) {
    orderedItems.push(menuArray[e.target.dataset.item]);
    orderDetails.style.display = 'flex';
    confirmationMessage.style.display = 'none';
    handleAddToCart();
  }

  if (e.target.id === 'complete-order-btn') {
    completeOrder();
  }

  if (e.target.id === 'pay-btn') {
    orderConfirmation();
  }
});

function completeOrder() {
  modal.style.display = 'flex';
  orderDetails.style.display = 'none';
}

function orderConfirmation() {
  confirmationMessage.innerHTML = `<p class="confirmation-message">Thanks, ${username.value}! Your order is on its way!</p>`;
  modal.style.display = 'none';
  confirmationMessage.style.display = 'block';
  orderedItems = [];
}

function handleAddToCart() {
  let totalPrice = 0;
  let allOrders = '';
  let totalPriceHtml = '';
  let orderHtml = `<h3 class="order-heading">Your order</h3>`;
  let orderHtmlBtn = `<button class="pay-btn btn" id="complete-order-btn">
  Complete order
</button>`;

  orderedItems.forEach((item) => {
    totalPrice += item.price;
    allOrders += `
        <article class="order-items" id="order-items">
          <p class="order-name">${item.name}</p>
          <button class="order-remove-btn btn" id="order-remove-btn">
            remove
          </button>
          <p class="order-price" id="order-price">$${item.price}</p>
        </article>
  `;
  });

  totalPriceHtml = `
        <article class="total" id="total">
          <h3 class="total-heading" id="total-heading">Total price:</h3>
          <p class="total-price" id="total-price">$${totalPrice}</p>
        </article>`;

  orderDetails.innerHTML =
    orderHtml + allOrders + totalPriceHtml + orderHtmlBtn;
}

function getMenuHtml() {
  let productHtml = ``;

  menuArray.forEach((item) => {
    productHtml += `<article class="menu-item" id="menu-item">
    <img
      src="img/${item.name}.png"
      alt="${item.name}"
      class="item-img"
      id="item-img"
    />
    
    <section class="item-details" id="item-details">
      <h3 class="item-name" id="item-name">${item.name}</h3>
      <p class="item-ingredients" id="item-ingredients">
        ${item.ingredients}
      </p>
      <p class="item-price" id="item-price">$${item.price}</p>
    </section>
    <button class="add-to-cart-btn btn" id="add-to-cart-btn" data-item="${item.id}">+</button>
  </article>`;
    console.log(item.id);
  });
  return productHtml;
}

function render() {
  itemContainer.innerHTML = getMenuHtml();
}

render();
