import { menuArray } from './data.js';

const orderDetails = document.getElementById('order-details');
const modal = document.getElementById('modal');
const confirmationMessage = document.getElementById('order-confirmation');
const nameInput = document.getElementById('input-name');
const cardInput = document.getElementById('input-card');
const cvvInput = document.getElementById('input-cvv');

let orderedItems = [];

/* EVENTLISTENER FOR PAY BUTTON THAT TRIGGERS IF ALL THE INPUTS ARE FILLE OUT */
document.getElementById('pay-btn').addEventListener('click', (e) => {
  if (nameInput.value && cardInput.value && cvvInput.value) {
    e.preventDefault();
    orderConfirmation();
  }
});

/* EVENTLISTENER TO LISTEN FOR DIFFRENT KIND OF CLICKS ON THE APP */
document.addEventListener('click', (e) => {
  if (e.target.dataset.item) {
    orderedItems.push(menuArray[e.target.dataset.item]);
    orderDetails.style.display = 'flex';
    handleAddToCart();
  } else if (e.target.id === 'complete-order-btn') {
    completeOrder();
  } else if (e.target.dataset.remove) {
    deleteOrderItem(e.target.dataset.remove);
  }
});

/* FUNCTION TO HANDLE ADDING ITEMS TO THE CART AND RENDERING THE HTML-CODE FOR THE CART */
function handleAddToCart() {
  confirmationMessage.style.display = 'none';
  let totalPrice = 0;
  let totalOrders = '';
  let totalPriceHtml = '';
  let orderHtml = `<h3 class="order-heading">Your order</h3>`;
  let orderHtmlBtn = `
  <button class="pay-btn btn" id="complete-order-btn">
    Complete order
  </button>`;

  orderedItems.forEach((item, index) => {
    totalPrice += item.price;
    totalOrders += `
        <article class="order-items" id="order-items">
          <p class="order-name">${item.name}</p>
          <button class="order-remove-btn btn" id="order-remove-btn" data-remove="${index}">
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
    orderHtml + totalOrders + totalPriceHtml + orderHtmlBtn;
}

/* FUNCTION TO DELETE AN ITEM FROM THE CART */
function deleteOrderItem(id) {
  orderedItems.splice(id, 1);
  handleAddToCart();
  if (orderedItems.length < 1) {
    orderDetails.style.display = 'none';
  }
}

/* FUNCTION TO PLACE YOUR ORDER AND RENDER THE PAYMENT WINDOW */
function completeOrder() {
  modal.style.display = 'flex';
  orderDetails.style.display = 'none';
}

/* FUNCTION THAT RENDERS THE CONFIRMATION MESSAGE OF THE PLACED ORDER */
function orderConfirmation() {
  const username = document.getElementById('input-name');
  confirmationMessage.innerHTML = `
  <p class="confirmation-message">
    Thanks, ${username.value}! Your order is on its way!
  </p>`;
  modal.style.display = 'none';
  confirmationMessage.style.display = 'block';
  orderedItems = [];
}

/* FUNCTIONS TO RENDER THE MENU ITEMS */
function getMenuHtml() {
  let productHtml = ``;

  menuArray.forEach((item, index) => {
    productHtml += `
    <article class="menu-item" id="menu-item">
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
      <button class="add-to-cart-btn btn" id="add-to-cart-btn" data-item="${index}">+</button>
    </article>`;
  });
  return productHtml;
}

function render() {
  document.getElementById('menu-item-container').innerHTML = getMenuHtml();
}

render();
