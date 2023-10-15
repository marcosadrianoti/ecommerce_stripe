// Cart Open or Close
const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const closeCart = document.querySelector('#close-cart');
// Open Cart
cartIcon.onclick = () => {
  cart.classList.add('cart-active')
}
// Close Cart
closeCart.onclick = () => {
  cart.classList.remove('cart-active')
}

// Add to Cart
// A função é chamada quando tudo estiver carregado.
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready();
}

function ready() {
  const removeCartButtons = document.getElementsByClassName('cart-remove');
  for (let index = 0; index < removeCartButtons.length; index++) {
    const button = removeCartButtons[index];
    button.addEventListener('click', removeCartItem);
  }
  // Quantity Change
  const quantityInputs = document.getElementsByClassName('cart-quantity');
  for (let index = 0; index < quantityInputs.length; index++) {
    const input = quantityInputs[index];
    input.addEventListener('change', quantityChanged);
  }
  // Add to cart
  const addCart = document.getElementsByClassName('add-cart');
  for (let index = 0; index < addCart.length; index++) {
    const button = addCart[index];
    button.addEventListener('click', addCartClicked);
    
  }
}

// Remove Cart Item
function removeCartItem(event) {
  const buttonClicked = event.target;
  // Remove o contêiner pai do botão, que representa a remoção do item correspondente.
  buttonClicked.parentElement.remove();
  updateTotal();
}

// Quantity Change
function quantityChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

// Add Cart function
function addCartClicked(event) {
  const button = event.target;
  const shopProducts = button.parentElement;
  const title = shopProducts.getElementsByClassName('product-title')[0].innerText;
  const price = shopProducts.getElementsByClassName('price')[0].innerText;
  const productImg = shopProducts.getElementsByClassName('product-img')[0].src;
  addProductToCart(title, price, productImg);
  updateTotal();
}

function addProductToCart(title, price, productImg) {
  const cartShopBox = document.createElement('div');
  cartShopBox.classList.add('cart-box');
  const cartItems = document.getElementsByClassName('cart-content')[0];
  const cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
  for (let index = 0; index < cartItemsNames.length; index++) {
    if (cartItemsNames[index].innerText == title) {
      alert('You have already added this item to cart');
      return;
    }
  }
  const cartBoxContent = `
  <img src=${productImg} alt="" class="cart-img">
  <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" name="" id="" value="1" class="cart-quantity">
  </div>
  <i class='bx bx-trash cart-remove'></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName('cart-remove')[0]
    .addEventListener('click', removeCartItem);
  cartShopBox
    .getElementsByClassName('cart-quantity')[0]
    .addEventListener('change', quantityChanged);
}

// Update Total
function updateTotal() {
  const cartContent = document.getElementsByClassName('cart-content')[0];
  const cartBoxes = cartContent.getElementsByClassName('cart-box');
  let total = 0;
  for (let index = 0; index < cartBoxes.length; index++) {
    const cartBox = cartBoxes[index];
    const priceElement = cartBox.getElementsByClassName('cart-price')[0];
    const quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    const price = parseFloat(priceElement.innerText.replace('$', ''));
    const quantity = quantityElement.value;
    total += price * quantity;
  }
  document.getElementsByClassName('total-price')[0].innerText = '$' + total.toFixed(2);
}